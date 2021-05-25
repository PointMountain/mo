(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{336:function(v,_,t){v.exports=t.p+"assets/img/threetimes.9aba9a8e.png"},365:function(v,_,t){"use strict";t.r(_);var a=t(33),s=Object(a.a)({},(function(){var v=this,_=v.$createElement,a=v._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[a("h1",{attrs:{id:"从输入url到返回数据过程中的知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从输入url到返回数据过程中的知识"}},[v._v("#")]),v._v(" 从输入URL到返回数据过程中的知识")]),v._v(" "),a("h2",{attrs:{id:"dns"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dns"}},[v._v("#")]),v._v(" DNS")]),v._v(" "),a("p",[v._v("当输入URL时，浏览去会先去寻找域名所对应的IP地址。"),a("strong",[v._v("DNS")]),v._v("的作用就是通过域名查询到具体的IP。\n当在浏览器中想要访问"),a("code",[v._v("www.google.com")]),v._v("时，会通过进行以下操作：")]),v._v(" "),a("ol",[a("li",[v._v("本地客户端向服务器发起请求查询IP地址")]),v._v(" "),a("li",[v._v("查看浏览器有没有该域名的IP缓存")]),v._v(" "),a("li",[v._v("查看操作系统有没有该域名的IP缓存")]),v._v(" "),a("li",[v._v("查看HOST文件有没有该域名的解析配置")]),v._v(" "),a("li",[v._v("如果都没有的话，会通过直接去DNS根服务器查询，首先查询"),a("code",[v._v("com")]),v._v("这个一级域名的服务器")]),v._v(" "),a("li",[v._v("然后去该服务器查询"),a("code",[v._v("google.com")]),v._v("这个二级域名")]),v._v(" "),a("li",[v._v("接下来查询"),a("code",[v._v("www.google.com")]),v._v("这个三级域名的地址")]),v._v(" "),a("li",[v._v("返回给DNS客户端并缓存起来")])]),v._v(" "),a("p",[v._v("以上过程是"),a("strong",[v._v("DNS递归查询")]),v._v("，它是由系统配置的DNS服务器做请求，得到结果后将数据返回给客户端；还有一种"),a("strong",[v._v("DNS迭代查询")]),v._v("，它是由客户端去做请求。\nDNS解析过程中向服务器发送的请求会根据情况使用TCP或者UDP协议")]),v._v(" "),a("ul",[a("li",[v._v("通过"),a("strong",[v._v("UDP")]),v._v("去进行一些数据量少的请求，此时用到UDP性能快的优势")]),v._v(" "),a("li",[v._v("通过"),a("strong",[v._v("TCP")]),v._v("去进行数据量大且需要数据保证完整有序的请求，保证数据的正确及完整性")])]),v._v(" "),a("p",[v._v("当浏览器获取域名IP地址后，就会通过TCP协议与服务器建立连接。")]),v._v(" "),a("h2",{attrs:{id:"tcp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp"}},[v._v("#")]),v._v(" TCP")]),v._v(" "),a("p",[v._v("TCP建立连接需要进行三次握手\n最开始两端都为CLOSED状态。通信开始前，双方都会创建TCB（一个包含了协议需要的很多内容的数据结构）。服务器创建完TCB后就进入LISTEN状态，此时开始等待客户端发送数据。")]),v._v(" "),a("h3",{attrs:{id:"第一次握手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一次握手"}},[v._v("#")]),v._v(" 第一次握手")]),v._v(" "),a("p",[v._v("客户端向服务端发送连接请求报文段（SYN）。请求发送后，客户端进入SYN-SENT状态。")]),v._v(" "),a("h3",{attrs:{id:"第二次握手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第二次握手"}},[v._v("#")]),v._v(" 第二次握手")]),v._v(" "),a("p",[v._v("服务端收到客户端连接请求报文段后，如果同意连接，就会发送一个应答（ACK + SYN），该应答中也会包含自身的数据通讯初始序号，发送完之后便进入SYN-RECEIVRD状态。")]),v._v(" "),a("h3",{attrs:{id:"第三次握手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第三次握手"}},[v._v("#")]),v._v(" 第三次握手")]),v._v(" "),a("p",[v._v("客户端收到连接同意的应答后，还要向服务端发送一个确认报文（ACK）。客户端发完这个报文段后便进入ESTABLISHED状态，服务端收到这个应答后也进入ESTABLISHED状态，此时连接建立成功。")]),v._v(" "),a("blockquote",[a("p",[v._v("第三次握手可以包含数据，通过TCP快速打开（TFO）技术。客户端和服务端存储相同cookie，下次握手时发出cookie达到减少RTT（一次请求来回的时间）的目的。\n连接需要第三次握手的原因是防止失效的连接请求报文被服务端接收，从而产生错误。")])]),v._v(" "),a("p",[a("img",{attrs:{src:t(336),alt:""}})])])}),[],!1,null,null,null);_.default=s.exports}}]);