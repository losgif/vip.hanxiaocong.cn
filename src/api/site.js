import { axios } from '@/utils/request'

const api = {
  Site: '/site'
}

export function getSite (id) {
  return axios({
    url: api.Site + '/' + id,
    method: 'post'
  })
}
