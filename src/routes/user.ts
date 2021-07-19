import Router from '@koa/router'
import { File } from 'formidable'
import {
  getAllUserController,
  updateUserController,
  allocUserRoleController,
  removeUserController,
  uploadAvatarController
} from '../controller/user'

const router = new Router({
  prefix: '/api/user'
})

/**
 * 获取用户列表
 * get /api/user
 */
router.get('/', async ctx => {
  const { pageNum = 0, pageSize = 10, ...query } = ctx.request.query
  ctx.body = await getAllUserController({
    offset: Number(pageNum),
    limit: Number(pageSize),
    query
  })
})

/**
 * 编辑用户
 * post /api/user/:id
 */
router.put('/:id', async ctx => {
  const { id } = ctx.params
  // @ts-ignore
  ctx.body = await updateUserController(Number(id), ctx.request.body)
})

/**
 * 给用户分配角色
 * post /api/user/role/:id
 */
router.post('/role/:id', async ctx => {
  const { id } = ctx.params
  // @ts-ignore
  const { roles } = ctx.request.body
  ctx.body = await allocUserRoleController(Number(id), roles)
})

/**
 * 删除用户
 * delete /api/user/:id
 */
router.delete('/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await removeUserController(Number(id))
})

/**
* 用户头像上传
* post /api/user/upload
*/
router.post('/upload', async ctx => {
  const file = ctx.request.files?.file
  const tokenStr = ctx.request.headers.authorization as string
  ctx.body = await uploadAvatarController(ctx.origin, file as File, tokenStr)
})

export default router
