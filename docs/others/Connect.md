1. ajax轮询 让浏览器隔一段时间就发送一次请求，询问服务器是否有新信息
2. 长连接 类似轮询，区别是客户端发起连接后，如果没有信息，就一直不返回response给客户端，直到服务端有消息才返回，返回完之后，客户端再建立连接，周而复始
3. Server-Sent Events是通过服务端向客户端声明，接下来发送的信息是留信息，做到服务端主动推送信息，不过只能单向的由服务端传到客户端</br>
客户端通过EventSource对象进行使用
```
 let source = new EventSource(url, { withCredentials: true }) //可跨域，如果跨域的话可以设置第二个参数withCredentials是否传输cookie
 //EventSource实例中有只读属性readyState 0表示还未建立或正在重连 1表示连接已经建立可以接收数据，2表示连接已断，且不会重连
 source.addEventListener('open',(event)=>{

 })
 source.addEventListener('message',(event)=>{

 })
 source.addEventListener('error',()=>{

 })
 //EventSource还支持自定义事件
 source.close() //关闭连接
```
服务端方面：
必须设置`Content-type: text/event-stream`<br>
返回的信息格式是：`data|event|id|retry: value`<br>
如果一次信息由多个message组成每个message直接用\n\n分隔<br>
data字段表示数据内容，event字段表示事件类型默认是message也可以自定义事件，id字段表示数据编号可以用lastEventId读取 如果断线的话就会发送一个带有Last-Event-ID请求头的信息，进行断线重连，retry字段指定浏览器重新发送连接的时间间隔
```
let http = require('http')
http.createServer((res, req)=>{
  let fileName = '.'+req.url
  if(fileName === './stream'){
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function () {
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8080, '127.0.0.1')
```
4. WebSocket使用了websocket协议，全双工通信，实时性更强。更好的二进制支持。
服务端
```
let WebSocketServer = require('ws').Server
let wsServer = new WebSocketServer({port: 8888})
wsServer.on('connection',socket =>{
  console.log('连接成功');
  socket.on('message', message =>{
    console.log('接收到客户端消息:' + message);
    socket.send('服务器回应:' + message)
  })
})
```
客户端
```
 let ws = new WebSocket('ws: xxxx')
 //WebSocket实例中有属性readyState 0表示正在连接 1表示连接已经建立可以进行通信，2表示连接正在关闭 3表示连接已经关闭或者打开连接失败
 ws.addEventListener('open',(event)=>{
    ws.send('Hello Server!');
 })
 ws.addEventListener('message',(event)=>{

 })
 ws.addEventListener('error',()=>{

 })
 ws.close() //关闭连接
```
WebSocket只支持GET方法 且状态码为101表示协议切换
请求时请求头有`Sec-WebSocket-Version`、`Sec-WebSocket-Key`
响应头有`Sec-WebSocket-Accept`