## day4文件说明

### 1.0.crud
完成服务器端的增删改查的功能。

- 安装的依赖

  - bootstrap

  - express

  - art-template

  - express-art-template


### 1.0.1.路由设计

| 请求方法 | 请求路径      | get参数 | post参数 | 备注             |
| -------- | ------------- | ------- | -------- | ---------------- |
| GET      | /students     |         |          | 获取学生数据     |
| GET      | /students/new |         |          | 添加学生数据     |
| POST     |               |         |          | 处理添加学生数据 |
| GET      |               |         |          | 处理学生数据     |
| POST     |               |         |          | 处理编辑请求     |
| GET      |               |         |          | 处理删除请求     |