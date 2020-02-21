import { axios } from '@/utils/request'

const api = {
  School: '/school'
}

export function schoolCreate (parameters) {
  return axios({
    url: api.School,
    method: 'post',
    data: parameters
  })
}

export function schoolIndex () {
  return axios({
    url: api.School,
    method: 'get'
  })
}

export function schoolUpdate (parameters) {
  return axios({
    url: api.School + '/' + parameters.id,
    method: 'put',
    data: parameters
  })
}
