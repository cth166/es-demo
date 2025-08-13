import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [typescript(),
    copy({
      targets: [
        { src: 'src/public', dest: 'dist' },
      ]
    })
  ],
  external: ['koa', '@koa/router', 'koa-static']
})