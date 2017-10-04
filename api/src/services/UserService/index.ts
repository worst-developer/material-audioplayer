import * as Router from 'koa-router'
import * as Koa from 'koa'
import { Request } from 'koa'
import Logger from '../../utils/logger'
import audioTracks from './audio'
const router = new Router()


router
.get('/audio', async (ctx: Koa.Context, next: Function) => {
  try {
    🙃🙃🙃🙃🙃🙃
    ctx.body = { data: audioTracks }
    return ctx.status = 200
  } catch (error) {
    Logger.loggerError(error)
    ctx.status = 400
    ctx.body = { error: error.message }
    return
  }
})

export default router