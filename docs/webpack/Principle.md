# 工作原理剖析
1. Webpack CLI启动打包流程
2. 载入Webpack核心模块，创建Compiler对象
3. 使用Compiler对象开始编译整个项目
4. 从入口文件开始，解析模块依赖，形成依赖关系树
5. 递归依赖树，将每个模块交给对应的Loader处理
6. 合并Loader处理完的结果，将打包结果输出到dist目录