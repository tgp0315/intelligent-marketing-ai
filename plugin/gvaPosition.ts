import type { Plugin } from 'vite'
export default function GvaPosition(): Plugin {
  return {
    name: 'vite-gva-position-plugin',
    apply: 'serve',
    transform(code, id) {
      const index = id.lastIndexOf('.')
      const ext = id.substring(index + 1)
      if (ext.toLowerCase() === 'vue') {
        // console.log(code, 'code')
        return codeLineTrack(code, id)
      }
      return code
    }
  }
}

const codeLineTrack = (code, id) => {
  const lineList = code.split('\n')
  const newList: Array<string> = []
  lineList.forEach((item, index) => {
    newList.push(addLineAttr(item, index + 1, id)) // 添加位置属性，index+1为具体的代码行号
  })
  return newList.join('\n')
}

const addLineAttr = (lineStr, line, id) => {
  if (!/^\s+</.test(lineStr)) {
    return lineStr
  }

  // eslint-disable-next-line no-useless-escape
  const reg = /((((^(\s)+\<))|(^\<))[\w-]+)|(<\/template)/g
  let leftTagList = lineStr.match(reg)
  if (leftTagList) {
    leftTagList = Array.from(new Set(leftTagList))
    leftTagList.forEach((item) => {
      const skip = ['KeepAlive', 'template', 'keep-alive', 'transition', 'el-', 'El', 'router-view']
      if (item && !skip.some((i) => item.indexOf(i) > -1)) {
        const reg = new RegExp(`${item}`)
        const location = `${item} code-location="${id}:${line}"`
        lineStr = lineStr.replace(reg, location)
      }
    })
  }
  return lineStr
}
