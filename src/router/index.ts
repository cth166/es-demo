import Router from '@koa/router'
import * as routes from './routes.ts'


const api = new Router({ prefix: '/api' })

api.get('/', (ctx) => {
  ctx.body = 'hello zj'
})

for (const [url, route] of Object.entries(routes))
  api.use(`/${url}`, route)



export { api }
export default [api.routes(), api.allowedMethods()]
