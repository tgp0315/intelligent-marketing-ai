import http from '@/api/http'

export const test = (): Promise<any> => {
  return http.post('/menu/list/1')
}
