## 文件目录说明
### example
- `__filename`和`__dirname`

### example01
- art-template模板的继承
  + 页面之间的引用
  + 定义一个模板，通过模板生成页面

### example02
- cookie案例

### 其余文件说明
- models
  + 数据的分类，用来存放不同数据表的规划模型
- public
  + 公用资源，包括img/js/css，一般开放给客户端
- views
  + 视图：客户端访问的页面，一般开放给客户端
  + partials
    + 视图的公用部分
  + layouts
    + 视图的模型（骨架）部分
- routes
  + 路由：在项目庞大的情况下，对不同业务的路由处理进行模块划分，让结构更加清楚
  + 此处由于项目并不庞大：故并不对路由进行模块划分
  + router.js
- app.js
  + 入口文件

### 接口设计
| 页面类型               | 请求方式 | get参数 | post参数                |
| ---------------------- | -------- | ------- | ----------------------- |
| 登录页展示（login）    | get      |         |                         |
| 登录页处理(login)      | post     |         | email/nickname          |
| 注册页展示（register） | get      |         |                         |
| 注册页处理（register） | post     |         | email/nickname/password |
