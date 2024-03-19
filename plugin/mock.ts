import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'

export declare interface Options {
  entry?: string
}

const viteMockPlugin = (options: Options = {}): Plugin => {
  options.entry = options?.entry || './mock'

  return {
    name: 'vite-mock-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const method = req.headers.method
        if (method) {
          let route: string = path.resolve(process.cwd(), options.entry as string, `${method}.ts`)
          const cacheRoute = route.replace(/\\/g, '\\')
          route = route.replace(/\\/g, '/')
          try {
            const isExist = await isFileExisted(route)
            if (isExist) {
              delete require.cache[cacheRoute]
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const content = require(route)
              if (content) {
                const chunk = send(content)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(chunk)
              } else {
                next()
              }
            }
          } catch (e) {
            console.log(e, 'e')
            next()
          }
        } else {
          next()
        }
      })
    }
  }
}

function isFileExisted(path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        reject(false) // "不存在"
      } else {
        resolve(true) // "存在"
      }
    })
  })
}

// 实现一个send方法
function send(body) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chunk: any = JSON.stringify(body)
  if (chunk) {
    chunk = Buffer.from(chunk, 'utf-8')
  }
  return chunk
}

export default viteMockPlugin
