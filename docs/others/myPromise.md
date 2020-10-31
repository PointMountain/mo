```javascript
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
	const _this = this
	_this.status = PENDING
	_this.value = null
	_this.resolvedCb = []
	_this.rejectedCb = []

	try {
		fn(resolve, reject)
	} catch (e) {
		reject(e)
	}

	function resolve(value){
		if(value instanceof MyPromise){
			return value.then(resolve, reject)
		}
		setTimeout(() => {
			if(_this.status === PENDING){
				_this.status = RESOLVED
				_this.value = value
				_this.resolvedCb.map(cb => cb(_this.value))
			}	
		})
	}

	function reject(value){
		setTimeout(() => {
			if(_this.status === PENDING){
				_this.status = REJECTED
				_this.value = value
				_this.rejectedCb.map(cb => cb(_this.value))
			}	
		});
	}
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
	const _this = this
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
	onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
	if(_this.status === PENDING){
		_this.resolvedCb.push(onFulfilled)
		_this.rejectedCb.push(onRejected)
	}
	if(_this.status === RESOLVED){
		onFulfilled(_this.value)
	}
	if(_this.status === REJECTED){
		onRejected(_this.value)
	}
}

```

```javascript
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
//因为所有的promise都遵循这个规范，规定这个写法要兼容所有的promise
const resolvePromise = (promise2, x, resolve, reject) => {
	if (promise2 === x) {
		return reject(new TypeError('无法循环引用'))
	}
	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		let called
		try {
			let then = x.then
			if (typeof then === 'function') { //如果x是函数，就认为x是一个promise
				then.call(x, y => { //y可能还是promise 递归 直到解析出一个普通值
					if (called) {
						return
					}
					called = true
					resolvePromise(promise2, y, resolve, reject)
				}, r => {
					if (called) {
						return
					}
					called = true
					reject(r)
				}) //保证不用再次取then的值，x.then的话会进行第二次取值
			} else {
				resolve(x) //说明x是一个普通对象
			}
		} catch (error) {
			if (called) {
				return
			}
			called = true
			reject(error)
		}
	} else {
		resolve(x)
	}
}

const isPromise = (value) => {
	if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
		if (typeof value.then === 'function') {
			return true
		}
	}
	return false
}

class Promise {
	constructor(executor) {
		this.status = PENDING //默认是pending状态
		this.value = undefined //成功的值
		this.reason = undefined //失败的值
		this.onResolvedCallbacks = []
		this.onRejectedCallbacks = []

		let resolve = (value) => {
			if (this.status === PENDING) {
				this.value = value
				this.status = RESOLVED
				this.onResolvedCallbacks.forEach(fn => fn())
			}
		}

		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason
				this.status = REJECTED
				this.onRejectedCallbacks.forEach(fn => fn())
			}
		}

		try {
			executor(resolve, reject) //默认执行器会立刻执行
		} catch (error) {
			reject(error) //如果执行时发生错误，等价于调用失败方法
		}
	}
	then(onFulfilled, onRejected) {
		//onFulfilled onRejected是可选参数
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
		onRejected = typeof onRejected === 'function' ? onRejected : err => {
			throw err
		}

		let promise2 = new Promise((resolve, reject) => {
			//同步
			if (this.status === RESOLVED) {
				setTimeout(() => { //宏任务 为了保证promise2已经new完了
					try {
						let x = onFulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
			//异步
			if (this.status === PENDING) {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
			}
		})
		return promise2
	}

	static resolve(value) {
		return new Promise((resolve, reject) => {
			resolve(value)
		})
	}
	static reject(error) {
		return new Promise((resolve, reject) => {
			reject(error)
		})
	}

	finally(cb) {
		return this.then(data => {
			return Promise.resolve(cb()).then(() => data)
		}, error => {
			return Promise.resolve(cb()).then(() => {
				throw error
			})
		})
	}
}

Promise.defer = Promise.deferred = function () {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

Promise.all = function (values) {
	return new Promise((resolve, reject) => {
		let arr = []
		let index = 0

		function processData(i, data) {
			arr[i] = data
			index++
			if (index === values.length) {
				resolve(arr)
			}
		}
		for (let i = 0; i < values.length; i++) {
			if (isPromise(values[i])) {
				values[i].then(data => {
					processData(i, data)
				}, reject)
			} else {
				processData(i, values[i])
			}
		}
	})
}

Promise.race = function (values) {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < values.length; i++) {
			Promise.resolve(values[i]).then(resolve, reject)
		}
	})
}

module.exports = Promise
```