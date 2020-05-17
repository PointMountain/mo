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