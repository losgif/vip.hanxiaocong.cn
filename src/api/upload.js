import { axios } from '@/utils/request'

const api = {
  Upload: '/upload'
}

export function uploadInfo (data) {
  return axios({
    url: api.Upload + '/info',
    method: 'post',
    data: data
  })
}

export function uploadImage (data) {
  return axios({
    url: api.Upload + '/image',
    method: 'post',
    data: data
  })
}

export function uploadFetchToken (data) {
  return axios({
    url: api.Upload + '/fetchToken',
    method: 'post',
    data: data
  })
}
