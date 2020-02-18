import { axios } from '@/utils/request'

const api = {
  SchoolApplication: '/schoolApplication'
}

export function schoolApplicationShow (id) {
  return axios({
    url: api.SchoolApplication + '/' + id,
    method: 'get'
  })
}
