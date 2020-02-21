import { axios } from '@/utils/request'

const api = {
  Application: '/application'
}

export function applicationIndex () {
  return axios({
    url: api.Application,
    method: 'get'
  })
}
