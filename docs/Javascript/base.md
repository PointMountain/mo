# JS预习

## 变量提升

### 第一题

```javascript
console.log(a); //undefined
var a = 12;
var b = a;
b = 13;
console.log(a); // 12
console.log(b); // 13
```
#### 第一题解析
浏览器为了能够让代码自上而下执行，首先会开辟一块内存（栈内存）=> 作用域 或 执行上下文(context)
    1. 执行代码  => 全局作用域
        2. 存储变量以及基本数据类型的值

变量提升阶段:

`var a;  var b;`

| 变量存储 | 值存储 |
| -------- | ------ |
| a        |        |
| b        |        |

代码执行(步骤):  

1. 进栈执行

2. `console.log(a);` // undefined 因为在变量提升阶段，`a`被变量提升了，声明了。

3. `var a = 12;` // => 其实只是 `a = 12;` 并将变量`a` 指向值`12`   不用声明是因为在变量提升阶段已经把`a`声明了

   | 变量存储 | 值存储 |
   | -------- | ------ |
   | a  →     | 12     |
   | b        |        |

4. `var b = a;` // => 其实只是 `a = b;` 并将变量`b` 指向 变量`a`所指向的值`12`;

   | 变量存储 | 值存储 |
   | -------- | ------ |
   | a        | 12     |
   | b  ↗     |        |

5. `b = 13;` // =>  将变量`b` 取消 指向值`12` 改 指向 值`13`;

   | 变量存储 | 值存储 |
   | -------- | ------ |
   | a →      | 12     |
   | b  →     | 13     |

> 当浏览器开辟出供代码执行的栈内存后，代码并没有自上而下立即执行，而是继续做了一些事情：
**把当前作用域中所有带 var/function 关键字的进行提前的声明和定义  => 变量提升机制**

+ 带`var`的只是提前声明(declare) => 什么是声明呢？ `var a`； 如果只声明没有赋值，默认值是undefined
+ 带`function`的不仅声明，而且还定义了(defined)  `a = 13` 定义其实就是赋值，准确来说就是让变量和某个值进行关联

### 第二题

```javascript
console.log(sum(10,20)) // 30
function sum(n,m){
    return n + m;
}
```

#### 第二题解析

遇到引用类型值（对象和函数）

1. 开辟一个新的内存（堆内存 16进制的内存地址）
2. 把内存存储在堆内存中（对象存储的是键值对，函数存储的是函数体中的代码字符串）
3. 让变量和地址关联在一起

变量提升阶段:

`function sum(n,m){
    return n + m;
}`
开辟一个堆内存空间，存储函数的内容
16进制地址:`AAFFOO`
值: `return n + m;` 代码字符串

| 变量存储 | 值存储 |
| -------- | ------ |
| sum        |   AAFFOO     |
代码执行(步骤):  
1.进栈执行
2.`console.log(sum(10,20)) `// 此时函数已经存在了，可以执行
3.`function sum(n,m){
    return n + m;
} `         // 已经变量提升过了。已经声明与定义

### 第三题

```javascript
console.log(sum(10,20)) // 30
var sum = function (n,m){
    return n + m;
}
```
#### 第三题解析

遇到函数表达式,由于使用`VAR`来创建`sum`，变量提升阶段只会声明变量，不会赋值，所以此时函数在前面执行，函数是没有值，不能执行(真实项目中这种方式最常见，因为它操作严谨)


变量提升阶段:

`var sum`

| 变量存储 | 值存储 |
| -------- | ------ |
| sum        |        |
代码执行(步骤):  
1.进栈执行
2.`console.log(sum(10,20)) `// 此时`sum`值为undefined 会抛出错误 `sum is not function` 不会继续执行

### 第四题

```javascript
console.log(a);
// Uncaught ReferenceError: Cannot access 'a' before initialization(文件运行写在<script>) 或者 Uncaught ReferenceError: a is not defined(运行在v8引擎下)
let a = 12;
a = 13;
console.log(a);
```

#### 第四题解析

> 重要:运行文件时,代码写在文件，然后在浏览器运行。不在V8引擎下.

引擎在处理变量时，它们的生命周期由以下阶段组成:

| 阶段     | 作用                   |
| -------- | ---------------------- |
| 声明阶段(Declaration phase) | 在作用域中注册一个变量 |
| 初始化阶段(Initialization phase) | 分配内存并为作用域中的变量创建绑定，变量将使用undefined自动初始化 |
| 赋值阶段(Assignment phase) | 分配内存并为作用域中的变量创建绑定，变量将使用undefined自动初始化 |

此题，引擎遇到`let a`  时，会在声明阶段注册了变量`a`，但是没有进入初始化阶段。（暂时性死区）
代码执行(步骤)
1.进栈执行
2.`console.log(a);`// 在暂时性死区中找到a，a没有被初始化，抛出异常.`Uncaught ReferenceError: Cannot access 'a' before initialization` ，代码终止运行.

> 在V8引擎环境下  

ECMAScript标准规定的，浏览器也是按照标准来实现的，使用let定义的变量不会发生变量提升。并没有声明阶段的提升。

代码执行(步骤)

1. 进栈执行
2. `console.log(a);`// 变量`a`未定义 抛出异常 `Uncaught ReferenceError: a is not defined` 代码终止运行

### let/const和var的区别

1. `let`和`const`不存在变量提升机制(只存在声明阶段提升，没有初始化阶段)

   > 创建变量的六种方式中:`var`和`function`有变量提升，而`let`/`const`/`class`/`import`都不存在这个机制

2. var允许重复声明，而let不允许

   > + 在相同的作用域中（或执行上下文中），如果使用var/function关键词声明变量并且重复声明，是不会有影响的（声明第一次之后，之后再遇到就不在重复声明了）
   >
   > + 但是使用let/const就不行，浏览器会教研当前作用域中是否已经存在这个变量了，如果已经存在了，则再次基于let等重新声明就会报错



#### 带VAR和不带VAR的区别

```javascript
// => 在全局作用域下的区别
/*
不带var的 相当于给全局对象window设置了一个属性a
   window.a = 13;
*/
a = 13;
console.log(a); //=> window.a

/* 
栈内存变量存储空间
带var的，是在全局作用域下声明了一个变量b(全局变量)，但是在全局下声明的变量也同样相当于给window增加了一个对应的属性（只有全局作用域具备这个特点)
*/
var b = 14; // 创建变量b 并且 给window设置了属性b
console.log(b); // 14
console.log(window.b); // 14

```

## 重复声明

### 第一题

```javascript
var a = 12;
var a = 13;
console.log(a); // 13
```

##### 第一题解析

变量提升阶段:

| 变量存储 | 值存储 |
| -------- | ------ |
| a        |        |

引擎遇到声明相同变量，只声明第一次，后面不再声明。

代码执行（步骤）
1. 进栈执行
2. `var a = 12;`// 已经声明过了，`a=12`
| 变量存储 | 值存储 |
| -------- | ------ |
| a        | 12     |
3. `var a = 13;`// 已经声明过了,不再重复声明, `a=13`

| 变量存储 | 值存储 |
| -------- | ------ |
| a        | 13     |
4. `console.log(a);` // 13
### 第二题

```javascript
let a = 12;
let a = 13; // Identifier 'a' has already been declared
console.log(a); 
```

##### 第二题解析

词法解析阶段已经报错了.

### 第三题
```javascript
// 在浏览器开辟栈内存供代码自上而下执行之前，不仅有变量提升的操作，还有很多其它的操作=>“词法解析”或者“词法检测”；就是检测当前即将要执行的代码是否会出现语法错误，如果出现错误，代码将不会再执行（第一行都不会执行）
console.log(1);// 直接报错 这行不执行
let a = 12;
console.log(a);
let a = 13;// Uncaught SyntaxError: Identifier 'a' has already been declared
console.log(a);
```
##### 第三题解析

词法解析阶段已经报错了.

### 第四题

```javascript
fn();
function fn() {console.log(1)}
fn();
function fn() {console.log(2)}
fn();
var fn = function() {console.log(3)}
fn();
function fn() {console.log(4)}
fn();
function fn() {console.log(5)}
fn();
```

#### 第四题解析

变量提升阶段:

词法解析或者变量提升:

`function fn() {console.log(1)}`

创建一个堆内存 

堆内存地址:AFO

`"console.log(1)"`

| 变量存储 | 值存储 |
| -------- | ------ |
| fn       | AF0    |

`function fn() {console.log(2)}`


堆内存地址:AFO

`"console.log(1)"`

堆内存地址:AF1

`"console.log(2)"`


| 变量存储 | 值存储 |
| -------- | ------ |
| fn       | AF1    |

`var fn = function () {console.log(3)}`
只声明不赋值，但是变量fn已经声明了，所以不管。

`function fn() {console.log(4)}`

堆内存地址:AFO

`"console.log(1)"`

堆内存地址:AF1

`"console.log(2)"`

堆内存地址:AF2

`"console.log(4)"`

| 变量存储 | 值存储 |
| -------- | ------ |
| fn       | AF2    |

`function fn() {console.log(5)}`

堆内存地址:AFO

`"console.log(1)"`

堆内存地址:AF1

`"console.log(2)"`

堆内存地址:AF2

`"console.log(4)"`

堆内存地址:AF3

`"console.log(5)"`


| 变量存储 | 值存储 |
| -------- | ------ |
| fn       | AF3    |

代码执行：
`fn()` // 5
`function fn() {console.log(1)}` // 变量提升阶段完成了，跳过
`fn();` // 5
`function fn() {console.log(2)}`  // 变量提升阶段完成了，跳过
`fn();` // 5
`var fn = function() {console.log(3)}` // 赋值操作 fn = AF4

堆内存地址:AF4

`"console.log(3)"`

| 变量存储 | 值存储 |
| -------- | ------ |
| fn       | AF4    |

`fn();` // 3
`function fn() {console.log(4)} `// 变量提升阶段完成了，跳过
`fn();` // 3
`function fn() {console.log(5)} `// 变量提升阶段完成了，跳过
`fn();` // 3

## 关于条件判断的处理

```javascript
let obj = {
    name: 'tail',
    age:24,
    GF:null
}
console.log('name' in obj); // true
console.log('age' in obj); // true
console.log('GF' in obj); // true
```



```javascript
/*
	全局作用域
	1. 变量提升
		但是做函数的有特殊性，在老版本浏览器总，确实不论条件是否成立，函数也是提前声明或者定义的，但是新版本浏览器中，为了兼容es6严谨的语法规则，条件中的函数在变量提升阶段只能提前声明，不能提前定义
		function fn;
	2. 代码执行
*/
console.log(fn); // undefined
// fn(); // => Uncaught TypeError: fn is not a function
if('fn' in window){
   // 条件成立，进来后的第一件事是给FN赋值，然后在代码执行
   fn(); // hahh
	function fn() {
        console.log('hahh');
    }
}
fn(); // hahh
```

### 第一题

```javascript
f =function () {return true;}
g = function() {return false;}
~function(){
    if(g()&& []==![]){ // Uncaught TypeError: g is not a function
        f = function(){return false;}
        function g(){return true;}
    }
}();
console.log(f());
console.log(g());
```

#### 第一题解析

全局作用域

1. 变量提升
2. 代码执行

`~function(){
    if(g()&& []==![]){
        f = function(){return false;}
        function g(){return true;}
    }
}();`

自执行函数执行，形成一个私有作用域

   1. 变量提升 

      `function g;`

   2. 代码执行

      `g()` // => `Uncaught TypeError: g is not a function`

## 暂时性死区

```javascript
// 1.
console.log(a); //  a is not defined

// 2.
console.log(typeof a); // "undefined" 这是浏览器的bug，本应该是报错的，因为没有a（暂时性死区）

// 3.
console.log(typeof a); // V8 Uncaught ReferenceError: a is not defined   V8之前或在script标签 Uncaught SyntaxError: Identifier 'a' hasalready been declared
let a;
```

  let 能解决typeof检测时出现的暂时性死区问题

## 私有栈内存中的变量处理

### 第一题

```javascript
console.log(a,b); // undefined undefined
var a = 12,
    b = 12;
function fn(){
    console.log(a,b); // undefined 12
    var a = b = 13;
    console.log(a,b); // 13 13
}
fn();
console.log(a,b); // 12 13
```

#### 第一题解析

> 知识点:  var a = 12,b = 12; 等价于 var a = 12;var b = 12;
>
> var a = b = 13;   等价于 var a = 13; b = 13;

全局作用域下

变量提升:

`function fn(){...}`开辟堆内存

地址:AF0

代码字符串: 

`console.log(a,b);
    var a = b = 13;
    console.log(a,b);`



| 变量存储 | 值存储 |
| -------- | ------ |
| a        |        |
| b        |        |
| fn        | AF0 |

代码执行:

1. 进栈执行

2. `console.log(a,b);` // undefined undefined

3. `var a = 12,
       b = 12;`
       
| 变量存储 | 值存储 |
| -------- | ------ |
| a        |    12    |
| b        |    12    |
| fn        | AF0 |

4. `function fn(){
       console.log(a,b); 
       var a = b = 13;
       console.log(a,b); 
   }` // 变量提升阶段已经声明定义了，跳过

5. `fn();` // 函数开始执行 形成私有作用域、私有栈内存、私有执行上下文

   > 私有栈内存中代码执行的时候，如果遇到一个变量：
   >
   > 首先看当前作用域下是否有该变量，如果有则使用该变量，如果没有，则沿着作用域链向上级查找，直到找到全局作用域为止。找到就用，找不到就报错。=> 作用域链查找机制

  私有作用域下的变量提升

| 私有变量存储 | 值存储 |
| -------- | ------ |
| a        |        |

 私有作用域下的代码执行
 1. 进栈执行
  2. `console.log(a,b);` // undefined 12   => b在私有作用域下没有找到 向上级作用域查找。在全局作用域下找到b,输出b  12
  3. `var a = b = 13;` // 赋值私有作用域下的a = 13，把全局作用域下的b改为13;
| 私有变量存储 | 值存储 |
| -------- | ------ |
| a        |    13    |

全局作用域下
| 变量存储 | 值存储 |
| -------- | ------ |
| a        |    12    |
| b        |    13    |
| fn        | AF0 |

	4. `console.log(a,b);` // 13 13  // 私有作用域的a 和全局作用域下的b

6. `console.log(a,b);` //  12 13  // 全局作用域下的a 和 b

### 第二题

```javascript
console.log(a,b,c); // undefined*3
var a = 12,
    b = 13,
    c = 14;
function fn(a) {
    console.log(a,b,c); // 10 13 14 
    a = 100;
    c = 200;
    console.log(a,b,c); // 100 13 200
}
b = fn(10);
console.log(a,b,c); // 12 undefined 200
```

#### 第二题解析

全局作用域

变量提升

全局遇到function

开辟堆内存
地址 AF0
代码字符串:
`
 console.log(a,b,c); 
    a = 100;
    c = 200;
    console.log(a,b,c); 
`

| 全局变量存储 | 值存储 |
| -------- | ------ |
| a        |        |
| b        |        |
| c        |        |
| fn        |  AF0  |

代码执行
1. 进栈执行

2. `console.log(a,b,c);` // undefined*3

3. `var a = 12,
    b = 13,
    c = 14; `
    
| 全局变量存储 | 值存储 |
| -------- | ------ |
| a        |   12     |
| b        |   13     |
| c        |   14     |
| fn        |  AF0  |

4. `function fn(a) {
    console.log(a,b,c); // 10 13 14 
    a = 100;
    c = 200;
    console.log(a,b,c); // 100 13 200
}` // 不管
5. `b = fn(10);` // 先把fn函数执行传递实参10，把fn执行后的返回结果赋值给b
	函数执行 形成私有执行上下文
	私有作用域下的变量提升&形参赋值
| 私有变量存储 | 值存储 |
| -------- | ------ |
| a        |   10     |

`console.log(a,b,c); 
    a = 100;
    c = 200;
    console.log(a,b,c);`

> 知识点: 私有变量：在私有作用域中变量存储区存储的变量
> 1. 函数中带var/let/function/const...的变量
> 2. 形参变量也是私有变量

私有作用域下的代码执行
 1. 进栈执行
 2. `console.log(a,b,c);`10 13 14   // 私有作用域下的a  全局作用域下的b和c  
 3. `a = 100;` // 私有作用域下的a 赋值为 100
| 私有变量存储 | 值存储 |
| -------- | ------ |
| a        |   100     |
 4. `c = 200;` // 全局作用域下的c 赋值为200
     | 全局变量存储 | 值存储 |
| -------- | ------ |
| a        |   12     |
| b        |   13     |
| c        |   200     |
| fn        |  AF0  |
 5. `console.log(a,b,c);` //  100 13 200       私有作用域下的a，全局作用域下的b和c
6. `b = fn(10);` //   （函数的返回值只看return，有它，它后面是啥只返回值就是啥，没有默认返回的是undefined）fn(10)的返回结果为undefined  b赋值为undefined 
   
| 全局变量存储 | 值存储 |
| -------- | ------ |
| a        |   12     |
| b        |   undefined     |
| c        |   200     |
| fn        |  AF0  |
7. `console.log(a,b,c);` // 12 undefined 200
	
	
	
### 第三题
```javascript
var ary = [12,23];
function fn(ary) {
	console.log(ary); 
	ary[0] = 100; 
	ary = [100]; 
	ary[0] = 0;
	console.log(ary);
}
fn(ary);
console.log(ary);
```
#### 第三题解析
全局作用域
变量提升
开辟堆内存
地址:AF0
代码字符串:
`console.log(ary); 
	ary[0] = 100; 
	ary = [100]; 
	ary[0] = 0;
	console.log(ary);
`
| 全局变量存储 | 值存储 |
| -------- | ------ |
| ary        |        |
| fn        |    AF0    |

代码执行:
1. 进栈执行
2. `var ary = [12,23];`  //  数组是引用类型，开个堆内存
	开辟堆内存
    地址:AF1
    键值对:
    `0:12
    1:23
    length:2`
| 全局变量存储 | 值存储 |
| -------- | ------ |
| ary        |   AF1     |
| fn        |    AF0    |

3. `function fn(ary) {
	console.log(ary); 
	ary[0] = 100; 
	ary = [100]; 
	ary[0] = 0;
	console.log(ary);
}` // 不管

4. `fn(ary)` //  把fn执行  实参：具体的值（把全局变量ary存储的值当做实参传递进来）
         => fn(AF1)
	 创建一个全新的私有作用域
	
	 变量提升 && 实参赋值 
	| 私有变量存储 | 值存储 |
    | -------- | ------ |
    | ary        |   AF1  |
    代码执行
    1. 进栈执行
    
    2. `console.log(ary);` // 打印私有变量ary  [12,23]
    
    3. `ary[0]=100`  
             键值对:
            `0:100
            1:23
            length:2`
         
    4. `ary = [100]` 
    	创建一个堆内存
    	地址:BF0
    	键值对:
    	`0:100
    	length:1
    	`
    	
       | 私有变量存储 | 值存储 |
       | -------- | ------ |
       | ary        |   BF0  |
       
    5. `ary[0] = 0` 
    	
    	​	键值对:
    	​	`0:0
    	​	length:1`
    	
    6. `console.log(ary)` // => [0]
    
  5. `console.log(ary);` // => 全局变量ary [100,23]

### 第四题

```javascript
var n = 1;
function fn(){
    var n = 2;
    function f(){
        n--;
        console.log(n);
    }
    f();
    return f;
}
var x = fn();
x();
console.log(n);
```

#### 第四题解析

全局作用域

变量提升

开辟堆内存
地址:AF0
代码字符串
`var n = 2;
function f(){
    n--;
    console.log(n);
}
f();
return f;
`

| 全局变量存储 | 值存储 |
| -------- | ------ |
| n        |        |
| fn        |  AF0      |
| x        |        |

 代码执行:"

1. 进栈执行

2. `var n = 1;` 
	| 全局变量存储 | 值存储 |
   | -------- | ------ |
   | n        |    1    |
   | fn        |  AF0      |
   | x        |        |
   
3. `function fn(){
    var n = 2;
    function f(){
        n--;
        console.log(n);
    }
    f();
    return f;
}` // 不管
    
4. `var x = fn();` // x BF0
	
	| 全局变量存储 | 值存储 |
	| ------------ | ------ |
	| n            | 1      |
	| fn           | AF0    |
   | x            | BF0    |
   
   创建一个全新的私有作用域 
    私有作用域
    变量提升
   
	 开辟堆内存
	 地址:BF0
    代码字符串
        
   
   ```
    `n--;
    console.log(n);
    `
   ```
   
   | 私有变量存储 | 值存储 |
   | -------- | ------ |
   | n        |        |
   | f        |  BF0   |


    代码执行
    1. 进栈执行
    
    2. `var n = 2;`
        | 私有变量存储 | 值存储 |
       | -------- | ------ |
       | n        |    2    |
       | f        |  BF0   |
    
    3. `f();` 
    
        创建一个全新的私有作用域 
         私有作用域
         变量提升
    
         代码执行:
    
        1. 进栈执行
    
        2. `n--;` // 当前作用域没有n 向上级作用域查找  找到n (2)  减1
        | 私有变量存储 | 值存储 |
        | -------- | ------ |
        | n        |    1    |
        | f        |  BF0   |


        3. `console.log(n)` // 打印上级作用域 n  // 1
        4. 销毁当前私有作用域
    
    | 私有变量存储 | 值存储 |
    | -------- | ------ |
    | n        |    1    |
    | f        |  BF0   |
    4. `return f;` // BF0

   5. `x();`  // 执行BF0  => 0

      创建一个私有作用域

       变量提升

      代码执行

      1. 进栈执行

      2. `n--`; 向上级作用域查找   n减一
      
         | 上级的私有变量存储 | 值存储 |
         | ------------------ | ------ |
         | n                  | 0      |
      | f                  | BF0    |
      3. `console.log(n)` // 打印上级的私有变量 0 
   
   6.  `console.log(n)` // 打印全局作用域下的n  1

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | n            | 1      |
      | fn           | AF0    |
      | x            | BF0    |



### 第五题

```javascript
var i =0 ;
function A(){
    var i = 10;
    // 在函数x在A的私有作用域中创建
    function x(){
        console.log(i);
    }
    return x;
}
var y = A();  // => y = x 
y();  //  x() console.log(i);不看函数在哪里执行,只看在哪里创建 i是A()函数里面的 声明的i  => 10
function B() {
    var i = 20;
    y(); // 同上 // =>10
}
B();
```

## 闭包作用域

1. 创建函数

   1. 开辟一个堆内存

   2. 把函数体中的代码当做字符串存储进去

   3. 把堆内存的地址赋值给函数名

   4. **函数在哪里创建，那么它执行时候所需要查找的上级作用域就是谁**
   
2. 函数执行
	1. 形成一个全新的私有作用域、执行上下文、私有栈内存（执行一次形成一个，多个之间也不会产生影响）
	2. 形参赋值 & 变量提升
	3. 代码执行（把所属堆内存中的代码字符串拿出来一行行执行）
	4.  **遇到一个变量，首先看它是否为私有变量（形参和在私有作用域中声明的变量是私有变量),是私有的就操作自己的变量，不是私有的则向上上级作用域中查找。。一直找到全局作用域为止=> 作用域链查找机制**
	5.  私有变量和外界的变量没有必然关系，可以理解为被私有栈内存保护起来了，这种机制就是 **闭包的保护机制**

3. 关于堆栈内存释放问题

   > 函数执行就会形成栈内存 (从内存中分配的一块空间) 如果内存都不销毁释放，很容易就会导致内存溢出（内存爆满，电脑卡死了），堆栈内存的释放问题是学习JS的核心知识之一

      	堆内存释放问题
   
	```javascript
	// => 创建一个引用类型值，就会产生一个堆内存
	// 如果当前创建的堆内存不被其它东西所占用了（浏览器会在空闲的时候，查找				每一个内存的引用状况，不被占用的都会给回收释放掉），则会释放
	let obj = {
       name: 'zhufeng'
   }
   let oop = obj;
   // 此时obj和oop都占用着对象的堆内存,想要释放堆内存，需要手动解除变量和值的关联(null,空对象指针)
   obj = null;
   oop = null;
   ```
   
   ​       栈内存释放
   
   ```ja
   
   ```
   
    ### 第一题

```javascript
var i = 5;
function fn(i){
    return function(n){
        console.log(n+(++i));
    }
}
var f = fn(1);
f(2); 
fn(3)(4)
fn(5)(6)
f(7)
console.log(i)
```



#### 第一题解析

全局作用域下

变量提升

`function fn(){...}`开辟堆内存

地址:AF0

代码字符串: 

`return function(n){
        console.log(n+(++i));
    }`



| 全局变量存储 | 值存储 |
| ------------ | ------ |
| i            |        |
| fn           | AF0    |
| f            |        |

代码执行:

1. 进栈执行

2. `var i = 5` 

   | 全局变量存储 | 值存储 |
   | ------------ | ------ |
   | i            | 5      |
   | fn           | AF0    |
   | f            |        |

3. `function fn(i){
       return function(n){
           console.log(n+(++i));
       }
   }` // 不管

4. `var f = fn(1);`// 执行fn(1) BF0返回值给f  // 

   创建私有作用域FN-A（不销毁）

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   | i            | 5      |

   代码执行:

   1. 进栈执行

   2. `return function(n){     // => return BF0
          console.log(n+(++i));
      }` 

         	      `function fn(){...}`开辟堆内存

         	地址:BF0

         	代码字符串: 

       `console.log(n+(++i))`
| 全局变量存储 | 值存储 |
| ------------ | ------ |
| i            | 5      |
| fn           | AF0    |
| f            | BF0    |


5. `f(2)` // 执行BF0,传2

   创建私有作用域F-X  上级作用域 FN-A

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   | n            | 2      |

   代码执行:

   1. 进栈执行

   2. `n+(++i)`  // n是2, i是上一级作用域FN-A中的i (1) ,++i ，上级作用域FN-A中的i 变成2     2+2=4

      | 上一级FN-A私有变量存储 | 值存储 |
      | ---------------------- | ------ |
      | i                      | 2      |
   
   // => 4  销毁

   // => 4

6. `fn(3)(4)`// 先把fn执行（传3），执行的返回值是一个小函数，然后再执行（传4）
    fn(3)私有作用域FN-B
    
    变量提升&&形参赋值
    
    | 私有变量存储 | 值存储 |
    | ------------ | ------ |
    | i            | 3      |
    
    代码执行:
    
    1. 进栈执行
    
    2. `return function(n){     // => return BF1
           console.log(n+(++i));
       }` 
    
          	      `function fn(){...}`开辟堆内存
    
          	地址:BF1
    
          	代码字符串: 
    
        `console.log(n+(++i))`
    
      // FN-B 不立即销毁 等BF1(4)执行完销毁
    
      `BF1(4)`=>上级私有作用域FN-B
    
       变量提升&&形参赋值
    
    | 私有变量存储 | 值存储 |
    | ------------ | ------ |
    | n            | 4      |
    
    代码执行:
    
    1. 进栈执行
    
    2. `n+(++i)`  // n是4, i是上一级作用域FN-A中的i (3) ,++i ，上级作用域FN-A中的i 变成4     4+4=8
    
       | 上一级FN-A私有变量存储 | 值存储 |
       | ---------------------- | ------ |
       | i                      | 4      |
    
    ​	// => 8 当前栈内存销毁
    
7. `fn(5)(6)`// 先把fn执行（传5），执行的返回值是一个小函数，然后再执行（传6）
    fn(5)私有作用域FN-C

    变量提升&&形参赋值

    | 私有变量存储 | 值存储 |
    | ------------ | ------ |
    | i            | 5      |

    代码执行:

    1. 进栈执行

    2. `return function(n){     // => return BF2
           console.log(n+(++i));
       }` 

          	      `function fn(){...}`开辟堆内存

          	地址:BF2

          	代码字符串: 

        `console.log(n+(++i))`

      // FN-C 不立即销毁 等BF2(6)执行完销毁

      `BF2(6)`=>上级私有作用域FN-C

       变量提升&&形参赋值

    | 私有变量存储 | 值存储 |
    | ------------ | ------ |
    | n            | 6      |

    代码执行:

    1. 进栈执行

    2. `n+(++i)`  // n是6, i是上一级作用域FN-A中的i (5) ,++i ，上级作用域FN-C中的i 变成6     6+6=12

       | 上一级FN-A私有变量存储 | 值存储 |
       | ---------------------- | ------ |
       | i                      | 6      |

    ​	// => 12 当前栈内存销毁

8.  `f(7)` // 执行BF0,传7

    创建私有作用域F-Y  上级作用域 FN-A

    变量提升&&形参赋值

    | 私有变量存储 | 值存储 |
    | ------------ | ------ |
    | n            | 7      |

    代码执行:

    1. 进栈执行

    2. `n+(++i)`  // n是7, i是上一级作用域FN-A中的i (2) ,++i ，上级作用域FN-A中的i 变成3     7+3=10

       | 上一级FN-A私有变量存储 | 值存储 |
       | ---------------------- | ------ |
       | i                      | 3      |

    // => 10  销毁

9. `console.log(i)` // 查找全局作用域的i  => 5

    | 全局变量存储 | 值存储 |
    | ------------ | ------ |
    | i            | 5      |
    | fn           | AF0    |
    | f            | BF0    |

> 闭包的两大作用
>
> 1. 保护（私有变量和外界没有必然联系）
> 2. 保存（形成不销毁的栈内存，里面的私有变量等信息保存下来）

## 闭包练习题

### 第一题

```javascript
var i = 20;
function fn(){
    i-=2;
    return function (n){
        console.log((++i)-n);
    }
}
var f = fn();
f(1);
f(2);
fn()(3);
fn()(4);
f(5);
console.log(i);
```

#### 第一题解析

全局作用域下

变量提升

`function fn(){...}`开辟堆内存

地址:AF0

代码字符串: 

`i-=2;
    return function (n){
        console.log((++i)-n);
    }`



| 全局变量存储 | 值存储 |
| ------------ | ------ |
| i            |        |
| fn           | AF0    |
| f            |        |

代码执行:

1. 进栈执行

2. `var i = 20` 

   | 全局变量存储 | 值存储 |
   | ------------ | ------ |
   | i            | 20     |
   | fn           | AF0    |
   | f            |        |

3. `function fn(){
       i-=2;
       return function (n){
           console.log((++i)-n);
       }
   }` // 不管

4. `var f = fn();`// 执行fn() BF0返回值给f  

   创建私有作用域FN-A（不销毁）

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   |              |        |

   代码执行:

   1. 进栈执行

   2. `i-=2` // 20-2 => 18

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | i            | 18     |
      | fn           | AF0    |
      | f            |        |

   3. `return function (n){
        console.log((++i)-n);
    }` 

         	      `function fn(n){...}`开辟堆内存

         	地址:BF0

         	代码字符串: 

       `console.log((++i)-n);`

| 全局变量存储 | 值存储 |
| ------------ | ------ |
| i            | 5      |
| fn           | AF0    |
| f            | BF0    |


5. `f(1)` // 执行BF0,传1

   创建私有作用域F-X  上级作用域 FN-A

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   | n            | 2      |

   代码执行:

   1. 进栈执行

   2. `(++i)-n`  // n是1, i是上一级作用域FN-A中的i (18) ,++i ，全局作用域中的i 变成19     19-1=18

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | i            | 19     |

   // => 18  销毁

   // => 18

6. `f(2);`// 执行BF0,传2
   

创建私有作用域F-X  上级作用域 FN-A

变量提升&&形参赋值

| 私有变量存储 | 值存储 |
| ------------ | ------ |
| n            | 2      |

代码执行:

1. 进栈执行
   
   2. `(++i)-n`  // n是2, i是上一级作用域FN-A中的i (19) ,++i ，全局作用域中的i 变成20     20-2=18
   
   | 全局变量存储 | 值存储 |
   | ------------ | ------ |
   | i            | 20     |
   

// => 18  销毁

// => 18

7. `fn()(3);`// 先把fn执行，执行的返回值是一个小函数，然后再执行（传3）
   fn()私有作用域FN-B

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   |              |        |

   代码执行:

   1. 进栈执行

   2. `i-=2;`  // 20-2 = 18 => 18

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | i            | 18     |

   3. `return function (n){
        console.log((++i)-n);
      }` 

         	      `function fn(n){...}`开辟堆内存

         	地址:BF1

         	代码字符串: 

       `console.log((++i)-n);`

     // FN-B 不立即销毁 等BF1(3)执行完销毁

     `BF1(3)`=>上级私有作用域FN-B

      变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   | n            | 4      |

   代码执行:

   1. 进栈执行

   2. `(++i)-n`  // n是3, i是上一级作用域FN-A中的i (18) ,++i ，上级作用域FN-A中的i 变成19     19-3=16

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | i            | 19     |

   	// => 16 当前栈内存销毁

8. `fn()(4);`// 先把fn执行，执行的返回值是一个小函数，然后再执行（传4）
   fn()私有作用域FN-C

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   |              |        |

   代码执行:

   1. 进栈执行

   2. `i-=2;`  // 19-2 = 17=> 17
   
      | 全局变量存储 | 值存储 |
   | ------------ | ------ |
      | i            | 17     |

   3. `return function (n){
   console.log((++i)-n);
      }` 

         	      `function fn(n){...}`开辟堆内存

         	地址:BF2

         	代码字符串: 

       `console.log((++i)-n);`

     // FN-C 不立即销毁 等BF2(4)执行完销毁
   
     `BF1(4)`=>上级私有作用域FN-C

      变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
| ------------ | ------ |
   | n            | 4      |

   代码执行:
   
   1. 进栈执行

   2. `(++i)-n`  // n是4, i是上一级作用域FN-A中的i (17) ,++i ，上级作用域FN-A中的i 变成18     18-4=14

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | i            | 18     |
   
   	// => 14 当前栈内存销毁
   
9. `f(5)` // 执行BF0,传5

   创建私有作用域F-Y  上级作用域 FN-A

   变量提升&&形参赋值

   | 私有变量存储 | 值存储 |
   | ------------ | ------ |
   | n            | 7      |

   代码执行:

   1. 进栈执行

   2. `n+(++i)`  // n是5, i是上一级作用域FN-A中的i (18) ,++i ，上级作用域FN-A中的i 变成19     19-5=14

      | 全局变量存储 | 值存储 |
      | ------------ | ------ |
      | i            | 19     |

   // => 14  销毁

10. `console.log(i)` // 查找全局作用域的i  => 19

| 全局变量存储 | 值存储 |
| ------------ | ------ |
| i            | 19     |
| fn           | AF0    |
| f            | BF0    |



## 闭包的两个作用

###  保护

1. jQuery(JQ) 前端非常经典的类库：提供了大量的方法供开发人员使用

   => 为了防止全局变量污染（导入JQ后，它里面有大量方法，如果这些方法不保护起来，用户编写的方法很容易和JQ方法名字相同产生冲突，产生冲突可以理解为全局变量污染）JQ中的方法和变量需要用闭包保护起来。

   ```javascript
   (function(global,factory){
       // ...
       // typeof window!=="undefined"?window:this 验证当前所处环境的全局对象是window还是global等
       // factory=> function(window,noGlobal){}
       factory(global); //=>zhufeng(window)
   })(typeof window!=="undefined"?window:this,function zhufeng(window,noGlobal){
       // ...
       var jQuery = function(selector, context){
           // ...
       }
       // => 通过给全局对象增加属性：jQuery和$，把私有的jQuery方法暴露到全局作用域下，供外面使用（等价于return jQuery）（外界需要使用函数中的私有内容，我们可以基于window.xx和return xxx两种方式实现这个需求）
       window.jQuery = window.$ = jQuery;
   });
   //=> 开始使用JQ
   jQuery(); // => window.jQuery();
   $();
   
   ```

   在真实项目中，我们一般都要把自己写的内容放到一个闭包中，这样可以有效防止自己的代码和别人代码产生冲突（全局变量污染 真实项目中要尽可能减少对全局变量的使用） 如果需要把自己的东西给别人用，基于return和window.xxx等方式暴露给别人即可。

   ```javascript
   // => 原生js
   var xxx = (function(){
       return xxx;
   })()
   ```

### 保存
