import { axios } from '@/utils/request'

const api = {
  Information: '/information'
}

export function informationIndexByApplicationId (paramter) {
  return axios({
    url: `${api.Information}/indexByApplicationId`,
    method: 'post',
    data: paramter
  })
}

export function informationSearch (paramter) {
  return axios({
    url: `${api.Information}/search`,
    method: 'post',
    data: paramter
  })
}

export function informationBatchDelete (data) {
  return axios({
    url: `${api.Information}/batchDelete`,
    method: 'delete',
    data
  })
}
