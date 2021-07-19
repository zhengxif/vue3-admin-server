import { Sequelize } from 'sequelize'
// new Sequelize('数据库名称', '用户名', '密码', 配置项)
const sequelize = new Sequelize('vue3-admin', 'root', '12345678', {
    host: 'localhost', // 主机名称
    dialect: 'mysql', // 连什么类型数据库
    timezone: '+08:00', // 东八时区
    pool: { // 连接池
        max: 5, // 最大连接数量
        min: 0,
        idle: 10000 // 一个连接池10s之内 没有被使用 则释放
    }
})

export default sequelize