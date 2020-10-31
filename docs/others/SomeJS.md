```javascript
Object.prototype.toString.call()

function bubble(arr) {
	this.arr = arr
}
bubble.prototype.up = function () {
	return this.arr.sort((a, b) => a - b)
}
bubble.prototype.down = function () {
	return this.arr.sort((a, b) => b - a)
}

function bubble(arr, type) {
	if (!Array.isArray(arr)) {
		return new Error('typeError')
	}
	if (type === 'up') {
		let length = arr.length
		for (let i = 0; i < length; i++) {
			for (let j = i + 1; j < length; j++) {
				if (arr[i] > arr[j]) {
					[arr[i], arr[j]] = [arr[j], arr[i]]
				}
			}
		}
	} else {
		let length = arr.length
		for (let i = 0; i < length; i++) {
			for (let j = i + 1; j < length; j++) {
				if (arr[i] < arr[j]) {
					[arr[i], arr[j]] = [arr[j], arr[i]]
				}
			}
		}
	}
	return arr
}

function debounce(cb, time) {
	let timer = null
	return (...args) => {
		time !== null && clearTimeout(timer)
		timer = setTimeout(() => {
			cb.apply(this, args)
		}, time);
	}
}

function throttle(cb, time) {
	let lastTime = Date.now()
	return (...args) => {
		let newTime = Date.now()
		if (newTime - lastTime < time) return
		cb.apply(...args)
		lastTime = newTime
	}
}

function throttle2(cb, time) {
	let timer
	return (...args) => {
		if (!timer) {
			timer = setTimeout(() => {
				cb.apply(this, ...args)
				timer = null
			}, time);
		}
	}
}

function throttle3(cb, time) {
	let prev = Date.now()
	let timer = null
	return (...args) => {
		let now = Date.now()
		let reset = time - (now - prev)
		clearTimeout(timer)
		if (reset <= 0) {
			cb.apply(this, ...args)
			prev = now
		} else {
			timer = setTimeout(() => {
				cb.apply(this, ...args)
			}, reset);
		}
	}
}

localStorage.setItem('name', '123')
localStorage.getItem('name')

sessionStorage.setItem('name', '666')
sessionStorage.getItem('name')

javascript: (function () {
	let info = document.body.querySelector('.info');
	info.remove();
	let mask = document.body.querySelector('.mask');
	mask.remove();
})();

javascript: (function () {
	var elements = document.body.getElementsByTagName('*');
	var items = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML.indexOf('html * { outline: 1px solid red }') != -1) {
			items.push(elements[i]);
		}
	}
	if (items.length > 0) {
		for (var i = 0; i < items.length; i++) {
			items[i].innerHTML = '';
		}
	} else {
		document.body.innerHTML += '<style>html * { outline: 1px solid red }</style>';
	}
})();


Function.prototype.myApply = function(target, arr){
	if(typeof this !== 'function'){
		throw new TypeError('error')
	}
	let context = target || window
	let fn = Symbol('fn')
	context[fn] = this
	let result
	if(arr){
		if(!Array.isArray(arr)) throw new TypeError('error')
		result = context[fn](...arr)
	}else{
		result = context[fn]()
	}
	delete context[fn]
	return result
}

Function.prototype.myCall = function(target, ...args){
	if(typeof this !== 'function'){
		throw new TypeError('error')
	}
	let context = target || window
	let fn = Symbol('fn')
	context[fn] = this
	let result = context[fn](...args)
	delete context[fn]
	return result
}

Function.prototype.myBind = function(target, ...args){
	if(typeof this !== 'function'){
		throw new TypeError('error')
	}
	let _this = this
	return function F(){
		if(this instanceof F){
			return new _this(...args, ...arguments)
		}
		return _this.apply(target, args.concat(...arguments))
	}
}

Function.prototype.myBind = function(target, ...args){
	if(typeof this !== 'function'){
		throw new TypeError('error')
	}
	let _this = this
	return function(){
		return _this.apply(target, args.concat(...arguments))
	}
}

function create(Con, ...args){
	const obj = {}
	Object.setPrototypeOf(obj, Con.prototype)
	const result = Con.apply(obj, args)
	return result instanceof Object ? result : obj
}

const arr = [
	x=>x*1,
	x=>x*2,
	x=>x*3,
	x=>x*4
]

arr.reduce((agg, el)=>agg+el(agg),0)

const s = { 2: 'e', 5: 'o', 1:'h', 4: 'l', 3: 'l'}

const t = {
	1:1,
	2:2,
	3:3
}
const func = str =>{
	if(str.length>1){
		return func(str.slice(1))
	}
	return str
}

function deepClone(obj){
	function isObject(o) {
		return (typeof o === 'function' || typeof o === 'object') && o !== null
	}

	if(!isObject(obj)){
		throw new TypeError('argument is not object')
	}

	let newObj = Array.isArray(obj) ? [...obj] : {...obj}
	Reflect.ownKeys(newObj).forEach(i => {
		newObj[i] = isObject(newObj[i])? deepClone(newObj[i]) : newObj[i]
	})
	return newObj
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

//proxy
let people = { name: '张三', age: 18, money: 200, id: '1008611' }
let peopleProxy = new Proxy(people, {
	set(people, prototype, value, receiver){
		if(prototype !== 'id') return Reflect.set(people, prototype, value, receiver)
		return 'id无法被更改'
	},
	get(people, prototype, receiver){
		if(prototype !== 'id') return Reflect.get(people, prototype, receiver)
		return 'id无法被获取'
	}
})

//Generator next传入参数等于上一次yield的返回值

Function.prototype.myApply = function(target, ...args){
	if(typeof this !== 'function'){
		throw new TypeError('typeError')
	}
	const fn = Symbol('fn')
	target = target || window
	target[fn] = this
	const result = target[fn](...args)
	delete target[fn]
	return result
}

Function.prototype.myBind = function(target, ...args){
	if(typeof this !== 'function'){
		throw new TypeError('typeError')
	}
	const _this = this
	return function(){
		return _this.apply(target, args.concat(...arguments))
	}
}

function myInstanceof(left, right){
	const prototype = right.prototype
	let left = left.__proto__
	while(true){
		if(left === null || left === undefined){
			return false
		}
		if(left === prototype){
			return true
		}
		left = left.__proto__
	}
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