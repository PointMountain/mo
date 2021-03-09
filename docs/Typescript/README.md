# Typescript基础
```bash
# 安装ts
npm install -g typescript
```
之后就可以在项目中创建ts文件，使用`tsc xxx.ts`可以将文件编译为js文件
```bash
# 安装ts-node
npm install -g ts-node
```
使用ts-node库可以直接运行ts文件`ts-node xxx.ts`

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

## 类Class
Typescript中类的修饰符
- `private` 私有变量，只有当前类才可以使用它
- `protected` 受保护变量，只有当前类以及类的子孙可以使用
- `public`公共变量，都可以获取使用
- `readonly`只读变量，只能获取不能去修改
```ts
class Animal {
  private id: number
  readonly name: string
  constructor(name: string){
    this.id = Math.random()
    this.name = name
  }
  static categories: string[] = ['mamal', 'bird']
  static isAnimal(a) {
    return a instanceof Animal
  }
  protected bark() {
    return `${this.name} is barking`
  }
  run() {
    return `${this.name} is running`
  }
}
```

## Interface接口
- 对对象的形状（shape）进行描述
- 对类（class）进行抽象
- Duck Typing（鸭子类型）
```ts
// 对对象shape进行描述
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

// 对类进行抽象
interface Radio {
  switchRadio(): void
}
interface Battery{
  checkBatteryStatus(): void
}
// 接口直接可以继承
interface RadioWidthBattery extends Radio{
  checkBatteryStatus(): void
}
// 接口用implements进行实现，且一次可以实现多个，实现接口时class内部必须将接口定义的内容实现，否则会报错
class Car implements Radio, Battery{
  switchRadio(): void {}
  checkBatteryStatus(): void {}
}
class Cellphone implements RadioWidthBattery{
  switchRadio(): void {}
  checkBatteryStatus(): void {}
}
```

## 枚举Enum
```ts
// 数字枚举，默认顺序从0开始，也可以赋值初始开始数值，但是如果不是从第一个重新赋值，那么在重新赋值之上还是按照从0开始的规则
enum Direction1 {
  Up,
  Down,
  Left = 10,
  Right
}
console.log(Direction1.Up)
console.log(Direction1[11])
// 字符串枚举，一个设置了字符串，其他的都要设置字符串
enum Direction2 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
console.log(Direction2.Up === 'Up')
// 常量枚举，解析为js后不会被编译成额外函数，而是直接显示对应参数
const enum Direction3 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
console.log(Direction3.Up === 'Up')

/* 编译为js代码 */
// 数字枚举
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 0] = "Up";
    Direction1[Direction1["Down"] = 1] = "Down";
    Direction1[Direction1["Left"] = 10] = "Left";
    Direction1[Direction1["Right"] = 11] = "Right";
})(Direction1 || (Direction1 = {}));
console.log(Direction1.Up);
console.log(Direction1[11]);
// 字符串枚举，一个设置了字符串，其他的都要设置字符串
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "Up";
    Direction2["Down"] = "Down";
    Direction2["Left"] = "Left";
    Direction2["Right"] = "Right";
})(Direction2 || (Direction2 = {}));
console.log(Direction2.Up === 'Up');
console.log("Up" /* Up */ === 'Up');  // 可以看出常量枚举没有编译成自执行函数，而是直接返回了所需的变量
```
## 泛型Generics
在定义函数，接口或类的时候不预先指定特定类型，而是在使用的时候动态指定类型
```ts
function echo<T>(arg: T) : T {
  return arg
}
const str: string = '111'
const result = echo(str)
function swap<T, U>(tumple: [T, U]): [U, T]{
  return [tumple[1], tumple[0]]
}
const result2 = swap([1, 'str'])

// 约束泛型 通过给泛型extends接口限定类型
interface IWithLength {
  length: number
}
// 指定只有具有length的类型才可以使用
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str = echoWithLength('str')
const obj = echoWithLength({ length: 10, width: 20})
const arr = echoWithLength([1, 2, 3])

// 类泛型
class Queue<T> {
  private data: T[] = []
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T | undefined {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)
queue.pop()?.toFixed()
// 接口泛型
interface KeyPair<T, U> {
  key: T
  value: U
}
let kp1: KeyPair<string, number> = { key: '11', value: 11 }
let arr: Array<number> = [1, 2, 3]
interface IPlus<T> {
  (a: T, b: T):T
}
const plus: IPlus<number> = (x, y) => {
  return x + y
}
plus(2, 3)
```

## 类型别名type aliases
```ts
type PlusType = (x: number, y: number) => number
const sum2: PlusType = (x, y) => {
  return x + y
}
// 可以用来写联合类型
type funType = () => string
type strOrFun = string | funType
function demo(n: strOrFun): string {
  if(typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```
## 类型断言type assertion
在联合类型中可以使用断言优先设置类型，这样可以使编译器提示该类型的属性与方法
```ts
function getLength1(input: string | number):number {
  const str = input as string
  if (str.length) {
    return str.length
  } else {
    const number = input as number
    return number.toString().length
  }
}
function getLength2(input: string | number):number {
  // 只能断言联合类型中的一种 不能使用其他类型进行断言
  if ((<string>input).length) {
    return (<string>input).length
  } else {
    return input.toString().length
  }
}
```
## 类型声明
虽然 TypeScript 已经逐渐进入主流，但是市面上大部分库还是以 JavaScript 编写的，这个时候由于库没有像 TS 一样定义类型，因此需要一个声明文件来帮助库的使用者来获取库的类型提示，声明文件一般是放在`x.d.ts`中，之后就可以全局使用类型进行提示，绝大部分主流的第三方库都有声明文件，因此可以直接安装，例如JQuery `npm install @types/jquery -save`。
自己编写的话需要使用`declare`关键字
- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namespace` 声明（含有子属性的）全局对象
- `interface` 和 `type` 声明全局类型
