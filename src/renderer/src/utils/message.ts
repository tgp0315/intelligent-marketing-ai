import { ElMessage } from 'element-plus'
import type {} from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
export declare type content = string
export declare type type = string
export const message = (content, type, options = {}): any => {
  ElMessage({
    message: content,
    type,
    ...options
  })
}
