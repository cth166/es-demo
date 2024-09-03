import type { Middleware } from 'koa'
import { resolve } from 'node:path'
import router from './router/index.ts'
import serve from 'koa-static'

const __dirname = import.meta.dirname


export default [
  serve(resolve(__dirname, '../static')),
  ...router
] as Middleware[]

