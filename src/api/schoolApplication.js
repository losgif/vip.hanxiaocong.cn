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

export function schoolApplicationCreate (parameters) {
  return axios({
    url: api.SchoolApplication,
    method: 'post',
    data: parameters
  })
}

export function schoolApplicationUpdate (parameters) {
  return axios({
    url: api.SchoolApplication + '/' + parameters.id,
    method: 'put',
    data: parameters
  })
}
