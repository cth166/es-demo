import Router from '@koa/router';


const router = new Router

async function* gptStream() {
  let count = 0;
  while (count < 10) {
    yield { message: `Data chunk ${count}` };
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟异步操作
    count++;
  }
}

router.get('/', async (ctx) => {
  const { prompt } = ctx.query
  ctx.set('Content-Type', 'text/event-stream')
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Connection', 'keep-alive')

  const res = ctx.res
  res.writeHead(200, { 'Content-Type': 'text/event-stream' })

  try {
    for await (const chunk of gptStream()) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
  } catch (err: any) {
    console.error('Error while streaming data: ', err);
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
  } finally {
    res.end();
  }

  // 当客户端断开连接时处理
  ctx.req.on('close', () => {
    console.log('Client disconnected');
    res.end();
  });

  ctx.body = 'zhanjing chat with me'
})

export const chat = router.routes()
