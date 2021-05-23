## 手写代码
```js
// 防抖
// 简易版 总是在一连串（间隔小于wait）的函数触发之后调用
const debounce = (func, wait = 50) => {
  let timer = 0
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(this, args)
    }, wait)
  }
}
// 带有立即执行的防抖 总是第一次调用，且下一次调用必须与前一次调用时间间隔大于wait才触发
const debounce = (func, wait = 50, immediate = true) => {
  let context, args, timer
  // 延迟执行函数
  let later = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)
  return function(...params) {
    if (!timer) {
      timer = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        args = params
        context = this
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

// 节流
function now() {
  return +new Date()
}
/**
* options   如果想忽略开始函数的的调用，传入{leading: false}
*           如果想忽略结尾函数的调用，传入{trailing: false}
*/
const throttle = (func, wait = 50, options = {}) => {
  let timer
  let previous = 0
  return function(...args) {
    if (!previous && options.leading === false) previous = now()
    let rest = wait - (now() - previous)

    if (rest < 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now()
      func.apply(this, args)
    } else if (!timer && options.trailing !== false){
      timer = setTimeout(() => {
        previous = now()
        func.apply(this, args)
        timer = null
      }, rest)
    }
  }
}

// Event Bus
class Event {
  constructor() {
    this.events = new Map()
  }
  addEvent(key, fn, isOnce, ...args) {
    const value = this.events.get(key) ? this.events.get(key) : this.events.set(key, new Map()).get(key)
    value.set(fn, (...args1) => {
      fn(...args, ...args1)
      isOnce && this.off(key, fn)
    })
  }
  on(key, fn, ...args) {
    if (!fn) {
      console.error(`没有传入回调函数`)
      return
    }
    this.addEvent(key, fn, false, ...args)
  }
  once(key, fn, ...args) {
    if (!fn) {
      console.error(`没有传入回调函数`)
      return
    }
    this.addEvent(key, fn, true, ...args)
  }
  fire(key, ...args) {
    if (!this.events.get(key)) {
      console.error(`没有${key}事件`)
      return
    }
    for(const [, cb] of this.events.get(key).entries()) {
      cb(...args)
    }
  }
  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn)
    }
  }
}

// instanceof
const instanceof = (left, right) => {
  const prototype = right.prototype
	let left = left.__proto__
	while (true) {
		if (left === null || left === undefined){
			return false
		}
		if (left === prototype){
			return true
		}
		left = left.__proto__
	}
}

// call
Function.prototype.myCall = function(context, ...args) {
  context = context || window
  const target = Symbol('target') // Symbol具有唯一性，需要注意的是Symbol不是构造函数不能使用new
  context[target] = this
  const result = context[target](...args)
  delete context[target]
  return result
}
// apply
Function.prototype.myApply = function(context) {
  context = context || window
  const target = Symbol('target')
  context[target] = this
  let result
  if (arguments[1]) {
    result = context[target](...arguments[1])
  } else {
    result = context[target]()
  }
  delete context[target]
  return result
}
// bind
Function.prototype.myBinde = function(context) {
  let _this = this
  let args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new _this(args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

//组合继承
function Parent(value){
	this.value = value
}

Parent.prototype.getValue = function(){
	return this.value
}

function Child(value){
	Parent.call(this, value)
}

Child.prototype = new Parent()

//寄生式继承
function Parent(value){
	this.value = value
}

Parent.prototype.getValue = function(){
	return this.value
}

function Child(value){
	Parent.call(this, value)
}

Child.prototype = Object.create(Parent.prototype,{
	constructor:{
		value: Child,
    enumerable: false,
    writable: true,
    configurable: true
	}
})

//new操作符
function CreateObj(target, ...args){
	const obj = {}
	obj.__proto__ = target.prototype
	const result = target.call(obj, ...args)
	return result instanceof Object?result:obj
}

function createN(target){
	function F(){}
	F.prototype = target
	return new F()
}

function maopao(arr){
	const length = arr.length
	for(let i = 0; i< length; i++){
		for(let j = 0; j < length - i; j++){
			if(arr[j] > arr[j+1]){
				[arr[j], arr[j+1]] = [arr[j+1], arr[j]]
			}
		}
	}
	return arr
}

function charu(arr){
	const length = arr.length
	for(let i = 1; i< length; i++){
		for(let j =  i - 1; j >=0 &&arr[j]>arr[j+1];j--){
			[arr[j], arr[j+1]] = [arr[j+1], arr[j]]
		}
	}
	return arr
}

function xuanze(arr){
	const length = arr.length
	for(let i = 0; i < length -1; i++){
		let minIndex = i
		for(let j = i + 1; j < length; j++){
			if(arr[j] < arr[minIndex]){
				minIndex = j
			}
		}
		if(i!==minIndex){
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
		}
	}
	return arr
}

function kuaisu(arr){
	if(arr.length <= 1) return arr
	let left = []
	let right = []
	let current = arr.splice(0,1)
	for(let i = 0; i< arr.length; i++){
		if(arr[i] < current){
			left.push(arr[i])
		}
		if(arr[i] > current){
			right.push(arr[i])
		}
	}
	return kuaisu(left).contact(current, kuaisu(right))
}
```