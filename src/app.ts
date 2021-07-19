import path from 'path'
import Koa from 'koa'
import cors from '@koa/cors'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
// routes
import authRoutes from './routes/auth'
import accessRoutes from './routes/access'
import roleRoutes from './routes/roles'
import roleAccessRoutes from './routes/roleAccess'
import userRoutes from './routes/user'

// secret
import { jwtSecret } from './config/auth'

// koa应用实例
const app = new Koa()

// middlewares
app.use(cors()) // 支持跨域
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}))
app.use(bodyparser({ // 解析请求体
  enableTypes: ['json', 'form', 'text']
}))
// 静态文件
app.use(koaStatic(path.join(__dirname, '/public')))
app.use(logger()) // 开发日志中间件

// 自定义401错误
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        error: '未登录 token失效'
      }
    } else {
      ctx.throw(err)
    }
  })
})
// token验证 header未携带token 直接返回401 Authentication Error
app.use(jwt(({
  secret: jwtSecret,
  cookie: 'auth-token' // 增加支持cookie中token验证（cookie key为auth-token）
})).unless({
  // 白名单
  path: ['/api/auth/login', '/api/auth/register']
}))

// routes
// 用户验证路由（登录 注册）
app.use(authRoutes.routes()).use(authRoutes.allowedMethods())
app.use(accessRoutes.routes()).use(accessRoutes.allowedMethods())
app.use(roleRoutes.routes()).use(roleRoutes.allowedMethods())
app.use(roleAccessRoutes.routes()).use(roleAccessRoutes.allowedMethods())
app.use(userRoutes.routes()).use(userRoutes.allowedMethods())

// listen
const port = process.env.PORT || '3003'
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})

app.on('error', (err) =>
  console.error('server error', err)
)
