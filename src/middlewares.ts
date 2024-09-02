import type { Middleware } from 'koa'
import router from './router/index.ts'

export default [
  ...router
] as Middleware[]

