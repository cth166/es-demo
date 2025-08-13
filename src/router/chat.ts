import Router from '@koa/router';
import * as readline from 'node:readline/promises';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

const __dirname = import.meta.dirname;
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

  const rl = readline.createInterface({
    input: createReadStream(resolve(__dirname, './public/table.md'))
  });

  try {
    for await (const line of rl) {
      if (/^\s*$/.test(line)) {
        res.write(`data: ${JSON.stringify('\n\n')}\n\n`);
        continue;
      }

      for (const char of line) {
        res.write(`data: ${JSON.stringify(char)}\n\n`);
        await new Promise(resolve => setTimeout(resolve, 50)); // 模拟延时
      }
      res.write(`data: ${JSON.stringify('\n')}\n\n`);
    }
    res.write(`data: ${JSON.stringify('[DONE]')}\n\n`);
  } catch (err: any) {
    console.error('Error while streaming data: ', err);
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
  }

  // 当客户端断开连接时处理
  ctx.req.on('close', () => {
    console.log('Client disconnected');
    res.end();
  });
})

export const chat = router.routes()
