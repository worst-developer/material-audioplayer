require('dotenv').config()
import * as Koa from 'koa'
import * as Router from 'koa-router'
import Logger from './utils/logger'
import * as bodyParser from 'koa-bodyparser'
import * as helmet from 'koa-helmet'
import * as cors from 'kcors'
import * as APILogger from 'koa-logger'

// import * as runtime from './middleware/runtime'

import UserService from './services/UserService/index'

const app = new Koa()
const router = new Router()

const port = process.env.PORT || 5555

app
   .use(bodyParser())
   .use(router.allowedMethods())
   .use(helmet())
   .use(cors())
   .use(APILogger())
   .use(UserService.routes())

app.listen(port, async () => Logger.loggerInfo(`Listening on port ${port}`))

export default app