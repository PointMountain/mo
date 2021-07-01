# webpack

## 概念
- module
  各个源码文件，webpack中一切皆模块 
- chunk
  多模块合并成的，如entry、import()、splitChunk生成的
- bundle
  最终的输出文件

## 基本配置
 - 拆分配置和merge `webpack-merge`  `--config`
 - 启动本地服务 `webpack-dev-server`
 - 处理ES6 `babel-loader`
 - 处理样式 loader执行顺序是 从后往前，所以`loader: ['style-loader', 'css-loader', 'postcss-loader']`，先通过`postcss-loader`将css内容兼容不同浏览器，再通过`css-loader`将内容解析为css，最后通过`style-loader`将内容插入页面style中
 - 处理图片`url-loader` `file-loader`
 - 模块化

## 高级配置
 - 多入口</br>
    ```javascript
      entry:{
        index: path.join(basePath, 'index.js'),
        other: path.join(basePath, 'other.js')
      }
      output:{
        filename: '[name].[hash].js' //因为多模块所以第一    部分用入口内部的name命名区分
      }
    ```
- 抽离CSS文件
  `MiniCssExtractPlugin`
- 抽离公共代码 `chunk`
  ```javascript
    optimization:{
      splitChunks:{
        chunks: 'all',
        /* 
        initial 入口 chunk，对于异步导入的文件不处理
        async 异步 chunk，只对异步导入的文件处理
        all 全部 chunk
        */
        //缓存分组
        cacheGroups:{
          //第三方模块
          vendor: {
            name: 'vendor', // chunk 名称
            priority: 1, // 权限更高，优先重要！！！
            test: /node_modules/,
            minSize: 0,  // 大小限制
            minChunks: 1  // 最少复用过几次
          },
          // 公共的模块
          common: {
            name: 'common', // chunk 名称
            priority: 0, // 优先级
            minSize: 0,  // 公共模块的大小限制
            minChunks: 2  // 公共模块最少几次
          }
        }
      }
    }
  ```
- 懒加载
  `import().then()` 会定义一个chunk
- 处理JSX
- 处理Vue
  `vue-loader`

## 优化打包效率——开发体验和效率
- 优化babel-loader
  - 开启缓存
    `use: ['babel-loader?cacheDirectory']`
  - 明确范围
    使用`include`或者`exclude`
- IgnorePlugin 设置不引入的文件，直接不引入命中的文件，代码中也不存在（可用于生产环境）
- noParse 避免重复打包 比如`vue.min.js`属于已经打过包的，就不会再二次打包 但是还是会引入（可用于生产环境）
- happyPack多进程打包（可用于生产环境）
  - JS单线程，开启多进程打包
  - 提高构建速度（特别是多核CPU）
- ParallelUglifyPlugin多进程压缩JS（一般用于生产环境）
- 自动刷新 刷新页面（不可用于生产环境）
  `watch: true`
- 热更新（不可用于生产环境）</br>
  自动刷新：整个网页全部刷新，速度较慢，状态会丢失</br>
  热更新：网页不刷新，状态不丢失
- DllPlugin动态链接库插件（不可用于生产环境）
  - webpack已内置DllPlugin支持
  - DllPlugin——打包出dll文件
  - DllReferencePlugin——使用dll文件

## 优化产出代码——产品性能
- 小图片base64编码`url-loader`
- bundle加hash 如果内容变了hash会变导致重新请求，如果没变则会命中缓存
- 懒加载 `import().then()`
- 提取公共代码`splitChunks`
- IgnorePlugin
- 使用CDN加速`publicPath: 'http://cdn.xxx.com'`
- 使用Production`mode: production`
  - 自动开启代码压缩
  - Vue React等会自动删掉调试代码（如开发环境的warning）
  - 自动启用Tree-Shaking（必须用ES6 Module才可以实现，~~Commonjs不行~~，Webpack5支持了，但是效果不好）
    - ES6 Module静态引入，编译时引入
    - Commonjs动态引入，执行时引入
    - 只有ES6 Module才能静态分析，实现Tree-Shaking
- Scope Hosting
  - 代码体积更小
  - 创建函数作用域更少
  - 代码可读性更好

## 构建流程概述

## babel
- 环境搭建&基本配置
  - 环境配置
  - .babelrc配置
  - presets和plugins
    preset相当于多个plugin的集合
- babel-polyfill
  - polyfill类似于补丁
  - core-js和regenerator
    core-js集成了所有es6之后的polyfill（不支持generator）
    regenerator支持了generator
  - babel-polyfill是core-js和regenerator的集合 Babel7.4后已弃用
  - 文件较大，需要按需引入

    ```javascript
    //.babelrc
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "usage",
            "corejs": 3
          }
        ]
      ]
    }
    ```

- babel-runtime
  - babel-polyfill会污染全局环境，如果是做一个独立的web系统，则没什么问题，但是做一个第三方lib，就会有问题
  - 通过babel-runtime就可以避免副作用
    ```javascript
    //.babelrc
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "absoluteRuntime": false,
          "corejs": 3,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ]
    ]
    ```
