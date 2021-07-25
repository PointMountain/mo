## 手写loader
loader 只是一个导出为函数的 JavaScript 模块。loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。
```js
// 导出的函数不能为箭头函数，因为loader编写过程中会经常使用到this访问选项和其他方法
/**
callback方法内部传参
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
)
*/
module.exports = function(content, sourceMap, meta) {
  // 1. 同步loader直接return返回
  return someSyncOperation(content)
  // 2. 同步loader通过this.callback返回
  this.callback(null, someSyncOperation(content), sourceMap, meta)
  return // 当调用 callback() 时总是返回 undefined
  // 3. 异步loader通过使用this.async()获取callback函数
  let callback = this.async()
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err)
    callback(null, result, sourceMap, meta)
  })
}
```
## 手写plugin
Webpack 工作流程中最核心的两个模块：Compiler 和 Compilation 都扩展自 Tapable 类，用于实现工作流程中的生命周期划分，以便在不同的生命周期节点上注册和调用插件。其中所暴露出来的生命周期节点称为Hook（俗称钩子）。
Compiler 和 Compilation 是Plugin 和 Webpack 之间的桥梁
- Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
plugin有两种 一种是返回一个执行函数 一种是返回一个带有apply方法的对象
```js
// 返回一个执行函数
module.exports = function() {
  return () => {
    // some operation
  }
}
// 返回一个包含 apply 方法的 JavaScript 对象
module.exports = class TestPlugin {
  apply(compiler) {
    // 通过在compiler实例上的hooks找到make钩子，然后通过tap方法注册同步事件
    compiler.hooks.make.tap('TestPlugin', () => {
      console.log('tap make')
    })
    // 通过在compiler实例上的hooks找到make钩子，然后通过tapAsync方法注册异步事件
    // 需要通过使用回调中的callback告知Webpack异步逻辑执行完毕
    compiler.hooks.make.tapAsync('TestPlugin', (data, callback) => {
      setTimeout(() => {
        console.log('tapAsync make')
        callback()
      })
    })
    // 通过在compiler实例上的hooks找到make钩子，然后通过tapPromise方法注册异步事件
    // 结果需要返回promise
    compiler.hooks.make.tapPromise('TestPlugin', () => {
      return new Promise((resolve, reject) => {
        console.log('tapPromise make')
      })
    })
    // 回调也可以用async/await
    compiler.hooks.make.tapPromise('TestPlugin', async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('tapPromise make')
    })
    compiler.hooks.compilation.tap('TestPlugin', compilation => {
      // compilation实例上也有钩子可以注册事件
      compilation.hooks.buildModule.tap('CalculateTimePlugin', (module) => {
        console.log('Compilation Hook buildModule')
      })
    })
  }
}
```
## 工作原理剖析
1. Webpack CLI启动打包流程
2. 载入Webpack核心模块，创建Compiler对象
3. 使用Compiler对象开始编译整个项目
4. 从入口文件开始，解析模块依赖，形成依赖关系树
5. 递归依赖树，将每个模块交给对应的Loader处理
6. 合并Loader处理完的结果，将打包结果输出到dist目录

## Webpack自动编译
使用`npm i webpack-dev-server -D`或者`yarn add webpack-dev-server --dev`安装`webpack-dev-server`模块，之后可以直接在控制台
输入`node_modules/.bin/webpack-dev-server`直接启动项目，其内部会启动一个 HTTP Server，为打包的结果提供静态文件服务，并且自动使用 Webpack 打包我们的应用，然后监听源代码的变化，一旦文件发生变化，为了提高工作速率，它并没有将打包结果写入到磁盘中，而是暂时存放在内存中，内部的 HTTP Server 也是从内存中读取这些文件的。这样一来，就会减少很多不必要的磁盘读写操作，大大提高了整体的构建效率。**使用webpack-dev-server时一定要注意是否和webpack，webpack-cli版本是否匹配，不匹配会报错**

安装之后可以在`webpack.config.js`中进行配置
```js
const path = require('path')

module.exports = {
  // ...
  devServer: {
    // 指定的额外静态资源访问
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    open: true, // 在服务器启动后打开浏览器
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的/api
        },
        changeOrigin: true // 确保请求Github的主机名就是https://api.github.com
      }
    },
    // 开启HMR特性，如果资源不支持HMR会fallback到live reloading
    hot: true
    // 只使用HMR，不会fallback到live reloading
    // hotOnly: true
    // ...
    // 详细配置文档：https://webpack.js.org/configuration/dev-server/
  },
}
```
### HMR（Hot Module Replacement）模块热替换
`webpack-dev-server`会自动刷新导致页面原有状态丢失，因此需要模块热替换在运行过程中的直接替换。
需要配置
1. devServer配置中使用`hot: true`
2. plugins中使用webpack自带的热替换模块`new webpack.HotModuleReplacementPlugin()`
配置好之后 对引用样式的修改会直接触发热替换，但是对JavaScript的修改还是会触发页面刷新，因为代码比较复杂，不能直接替换，
因此对JavaScript的代码需要额外配置
```js
if (module.hot) {
  // module.hot是HotModuleReplacementPlugin插件对module注入的对象
  module.hot.accept('文件地址', () => {
    // 需要的热更新的操作
    console.log('file has updated')
  })
}
```

## 配置Webpack SourceMap
> devtool should match pattern "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$"
### Eval模式
eval其实指的是JavaScript中的一个函数，可以用来运行字符串中的JavaScript代码
```js
const code = 'console.log(123)'
eval(code)
```
evel模式下每个模块都被包裹在一个evel函数中，函数末尾都会添加一个`//# sourceURL=xxxxx`的内容声明模块对应的源文件路径，实际并没有生成sourcemap文件，因此只能定位到错误的源文件，不能定位到实际行列

- 开发环境中
  选择`eval-cheap-module-dource-map`
  1. 框架经过Loader转换后差别很大，`module`调试的是Loader转换前的源代码
  2. `cheap`只展示错误的行不展示列，省略列信息可以提升构建速度
  3. 虽然启动打包会比较慢，但是如果使用了`webpack-dev-server`，其是在监视模式下重新打包，它重新打包的速度非常快
- 生产环境中
  一般使用`none`模式，防止暴露源代码到生产环境，如果实在想定位，可以使用`nosources-source-map`，这样出现错误可以定位到源代码位置，也不至于暴露源代码

Webpack内部会对SourceMap内容判断来选择使用什么插件
```js
webpack/lib/WebpackOptionsApply.js:232

if (options.devtool.includes("source-map")) {
  const hidden = options.devtool.includes("hidden");
  const inline = options.devtool.includes("inline");
  const evalWrapped = options.devtool.includes("eval");
  const cheap = options.devtool.includes("cheap");
  const moduleMaps = options.devtool.includes("module");
  const noSources = options.devtool.includes("nosources");

  const Plugin = evalWrapped
    ? require("./EvalSourceMapDevToolPlugin")
    : require("./SourceMapDevToolPlugin");
  new Plugin({
    filename: inline ? null : options.output.sourceMapFilename,
    moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate,
    fallbackModuleFilenameTemplate:
    options.output.devtoolFallbackModuleFilenameTemplate,
    append: hidden ? false : undefined,
    module: moduleMaps ? true : cheap ? false : true,
    columns: cheap ? false : true,
    noSources: noSources,
    namespace: options.output.devtoolNamespace
  }).apply(compiler);
} else if (options.devtool.includes("eval")) {
  const EvalDevToolModulePlugin = require("./EvalDevToolModulePlugin");
  new EvalDevToolModulePlugin({
    moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate,
    namespace: options.output.devtoolNamespace
  }).apply(compiler);
}
```
因此我们其实可以主动使用这些插件配置设置sourcemap
```js
devtool: false,
plugins: [
  new webpack.EvalSourceMapDevToolPlugin({
    exclude: /node_modules/,
    module: true,
    columns: false
  })
]
```

## Webpack高级特性
### Code Spliting
Code Spliting通过把项目中的资源模块按照我们设计的规则打包，**降低应用的启动成本，提高响应速度**
Webpack实现分包的方式主要有两种：
- 根据业务不同配置多个打包入口，输出多个打包结果
  - 一般是传统的多页面应用程序，一个页面对应一个打包入口
    ```js
    entry:{
      index: path.join(basePath, 'index.js'),
      other: path.join(basePath, 'other.js')
    }
    output:{
      filename: '[name].bundle.js' //因为多模块所以第一部分用入口内部的name命名区分
    }
    // ...
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Multi Entry',
        template: './src/index.html',
        scriptLoading: 'blocking',
        filename: 'index.html',
        chunks: ['index'] // 指定使用index.bundle.js
      }),
      new HtmlWebpackPlugin({
        title: 'Multi Entry',
        template: './src/other.html',
        scriptLoading: 'blocking',
        filename: 'other.html',
        chunks: ['other'] // 指定使用other.bundle.js
      })
    ]
    ```
  - 对于不同页面间公共的部分，提取到公共的结果中
    ```js
    // ...一些配置
    optimization: {
      splitChunks: {
        // 自动提取所有公共模块到单独bundle
        chunks: 'all'
      }
    }
    ```
- 结合ESM的动态导入特性，按需加载模块
  按需加载指的是在应用运行过程中，需要某个资源模块时，才去加载这个模块，极大地降低应用启动时需要加载的资源体积，提高了应用的响应速度，同时也节省了带宽和流量
  ```js
  import(xxx).then(() => {
    // 继续处理
  })
  // 还可以通过webpack魔法注释给bundle起名字 webpackChunkName: <chunk-name> 如果name相同的话，文件会被打包到一个bundle中
  import(/* webpackChunkName: 'index'*/ './index').then(() => {
    // 继续处理
  })
  ```
### Tree Shaking
Tree-shaking并不是指Webpack中的某一个配置选项，而是一组功能搭配使用过后实现的效果，这组功能在生产环境下都会自动启用（Webpack4+），所以使用生产模式打包就会有Tree-shaking的效果
在其他模式下启用Tree-shaking功能:
```js
module.exports = {
  // ...其他配置项
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 压缩输出结果
    minimize: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true
  }
}
```
### sideEffects
模块的副作用指的就是模块执行的时候除了导出成员，是否还做了其他的事情
```js
// button.js
console.log('this is button module') // 副作用代码
export const button = () => {
  document.createElement('button')
}
// 如果此时对button模块使用Tree-shaking模式 导出的内容会被移除，但是副作用代码还存在
module.exports = {
  // ...其他配置项
  optimization: {
    // ...
    // 清除被Tree-shaking后模块留下的副作用代码
    sideEffects: true
  }
}

// package.json
{
  // ...一些配置
  "sideEffects": false // false就是告诉webpack没有副作用代码。webpack 在编译就会去读取这个 sideEffects 字段，如果有的话，它就会将所有引用这个包的副作用代码或者自身具有副作用的业务代码给去除掉。
}

// or
{
  // ...一些配置
  // sideEffects数组表示除了写明的模块需要保留副作用 其它的模块没有副作用
  "sideEffects": [
    "./src/extend.js",
    "*.css"
  ]
}
```
## 优化Webpack的构建速度和打包结果
1. 配置不同环境的文件，通过`webpack-merge`库，合并不同的配置文件
2. 生产模式下的优化插件
    1. `webpack.DefinePlugin`
    2. `mini-css-extract-plugin`抽离css文件之后通过link引入，在loader和plugin中都需要处理下
        ```js
          module: {
            rules: [
              {
                test: /\.css$/,
                use: [
                  // 'style-loader', // 将样式通过 style 标签注入
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
              }
            ]
          },
          plugins: [
            new MiniCssExtractPlugin()
          ]
        ```
      3. `optimize-css-assets-webpack-plugin`是webpack5以下的CSS压缩插件，webpack5及以上版本用`css-minimizer-webpack-plugin`，作为插件可以直接放到plugin中使用，但是这样会让压缩插件在任何时间都会使用，因此webpack建议在minimizer中使用，通过minimize特效统一管理。
          ```js
          optimization: {
            minimize: true, // 配置是否开启压缩特效的 生产环境默认是true 开发环境默认是false
            minimizer: [
              new CssMinimizerPlugin()
            ]
          }
          ```
      不过在minimizer中只配置一个CSS压缩插件，会覆盖掉webpack的默认压缩，导致JS代码不会压缩，需要再引入一个JS压缩插件`terser-webpack-plugin`，同样在minimizer中引入。
      ```js
      // webpack4以上可以使用'...'展开默认的压缩配置，无需再担心覆盖问题
      minimizer: [
        new CssMinimizerPlugin(),
        '...'
      ]
      ```