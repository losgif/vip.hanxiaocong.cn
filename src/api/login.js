import { axios } from '@/utils/request'

const api = {
  Login: '/oauth/login',
  Logout: '/oauth/logout',
  Register: '/oauth/register',
  ForgePassword: '/auth/forge-password',
  twoStepCode: '/auth/2step-code',
  SendSms: '/oauth/sendVerificationCode',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/getInfo'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: api.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    }
  })
}

export function logout () {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function register (parameter) {
  return axios({
    url: api.Register,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
