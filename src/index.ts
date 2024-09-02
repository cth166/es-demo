import Koa from "koa"
import middlewares from './middlewares.ts'



void async function start() {
  const app = new Koa
  for (const middleware of middlewares) {
    app.use(middleware)
  }



  app.listen(8686, () => {
    console.log('running at 8686');
  })
}()




