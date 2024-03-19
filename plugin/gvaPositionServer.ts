import type { Plugin } from 'vite'
import child_process from 'child_process'
import os from 'os'

interface definitionInterface {
  (): void
}

export default function gvaPositionServer(): Plugin {
  return {
    name: 'vite-gva-position-server-plugin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req: any, _res: any, next: definitionInterface) => {
        if (req._parsedUrl.pathname === '/gvaPositionCode') {
          const path = req._parsedUrl.query && req._parsedUrl.query.split('=')[1]
          if (path && path !== 'null') {
            if (process.env.VITE_EDITOR === 'webstorm') {
              const linePath = path.split(':')[1]
              const filePath = path.split(':')[0]
              const platform = getPlatform()
              if (platform === 'Windows') {
                child_process.exec(`webstorm64.exe  --line ${linePath} ${filePath}`)
              } else {
                child_process.exec(`webstorm64  --line ${linePath} ${filePath}`)
              }
            } else {
              child_process.exec('code -r -g ' + path)
            }
          }
        }
        next()
      })
    }
  }
}

function getPlatform() {
  'use strict'
  const platform = os.platform()
  switch (platform) {
    case 'darwin':
      return 'MacOSX'
    case 'linux':
      return 'Linux'
    case 'win32':
      return 'Windows'
    default:
      return '无法确定操作系统!'
  }
}
