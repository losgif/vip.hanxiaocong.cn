import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: '禁止访问',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: '登录失败',
        description: '登录账户失败，请联系管理员'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

const requestFailedHandle = (err) => {
  if (((err.response || {}).data || {}).message instanceof Object) {
    var message = ((err.response || {}).data || {}).message
    for (const key in message) {
      setTimeout(() => {
        notification['error']({
          message: '错误',
          description: message[key] || '请求出现错误，请稍后再试',
          duration: 3
        })
      }, 0)
    }
  } else {
    notification['error']({
      message: '错误',
      description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
      duration: 3
    })
  }
}

export {
  installer as VueAxios,
  service as axios,
  requestFailedHandle
}
