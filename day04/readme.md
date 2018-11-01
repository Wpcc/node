## day4文件说明

### 1.0.crud
完成服务器端的增删改查的功能。

- 安装的依赖

  - bootstrap

  - express

  - art-template

  - express-art-template


### 1.0.1.路由设计

| 页面     | 请求方法 | 请求路径             | get参数 | post参数   |
| -------- | -------- | -------------------- | ------- | ---------- |
| 主页面   | GET      | /students            |         |            |
| 增--展示 | GET      | /students/addshow    |         |            |
| 增--处理 | POST     | /students/addControl |         | 一整行参数 |
| 改--展示 | GET      | /students/modShow    |         |            |
| 改--处理 | POST     | /students/modControl |         | 一整行参数 |
| 删--处理 | GET      | /students/del        |         |            |

### 1.0.2.目的

- 提取路由模块
- 封装增删改查