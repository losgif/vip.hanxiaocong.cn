import { axios } from '@/utils/request'

const api = {
  User: '/user'
}

export function userUpdate (parameters) {
  return axios({
    url: api.User + '/' + parameters.id,
    method: 'put',
    data: parameters
  })
}
