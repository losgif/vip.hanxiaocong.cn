import { axios } from '@/utils/request'

const api = {
  Admin: '/admin'
}

export function getAdminUserList (parameters) {
  return axios({
    url: api.Admin + '/user/indexAll',
    method: 'post',
    data: parameters
  })
}

export function updateAdminUserList (parameters) {
  return axios({
    url: api.Admin + '/user/' + parameters.id,
    method: 'put',
    data: parameters
  })
}

export function deleteAdminUserList (id) {
  return axios({
    url: api.Admin + '/user/' + id,
    method: 'delete'
  })
}

export function getAdminSchoolApplicationList (parameters) {
  return axios({
    url: api.Admin + '/schoolApplication/indexAll',
    method: 'post',
    data: parameters
  })
}
