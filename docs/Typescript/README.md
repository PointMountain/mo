# Typescript基础
```bash
# 安装ts
npm install -g typescript
```
之后就可以在项目中创建ts文件，使用`tsc xxx.ts`可以将文件编译为js文件

## 基础类型
```ts
let flag: boolean = false
let age: number = 20
let firstName: string = 'ming'
let u: undefined = undefined
let n: null = null
let s: symbol = Symbol('a')
let bi: bigint = BigInt(10)

// undefined 和 null是所有类型的子集，其他类型初始值都可以设为undefined或null
let num1: number = undefined
let num2: number = null
```

## 任意类型any，联合类型(Union Types)
```ts
// any类型可以赋值为任何参数，但是要尽量减少any类型使用，因为使用了any之后编译器不会在进行方法提示
let notSure: any = 4
notSure = 'string'
notSure = false
notSure.name
notSure.getName() // 编译器不会在any类型使用错误方法时报错

// 联合类型
let numberOrString: number | string = 234
numberOrString = 'abc'
```
## Array类型和Tuple类型
```ts
// 定义一个元素为number类型的数组
let arrayOfNumbers: number[] = [1,2,3]
arrayOfNumbers.push(5)
// ts对类数组的数组内置了定义
function demo() {
  let args:IArguments = arguments // 函数arguments的类型就是IArguments
  console.log(args)
}

// Tuple元组 将不同类型的元素组成一个数组
let user: [string, number] = ['ming', 20]
```

## Interface接口
- 对对象的形状（shape）进行描述
- 对类（class）进行抽象
- Duck Typing（鸭子类型）
```ts
interface Person{
  readonly id: number // 只读属性 不能重新赋值
  name: string
  age: number
  gender?: string // 可选属性，可以不写
}
// 接口定义的属性除了可选属性外必须全部定义，且不能额外定义其他内容
let ming:Person = {
  id: 10086,
  name: 'mingming',
  age: 20
}
```

## 函数类型
```ts
// 函数声明
function add1(x: number, y: number, z: number = 10): number { // z: number = 10 设置初始值，即可选字段
  return x + y + z
}
add1(1, 2)
// 函数表达式
const add2: (x: number, y: number, z?: number) => number = (x, y, z) => { // z?: number另一种可选字段的方式
  if (typeof z === 'number') {
    return x + y + z
  }else {
    return x + y
  }
}
add2(1, 2, 3)
```
