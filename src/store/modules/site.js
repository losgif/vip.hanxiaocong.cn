import { getSite } from '@/api/site'

const site = {
  state: {
    name: 'Ant Design',
    url: '~@/assets/logo.svg'
  },

  mutations: {
    SET_SITE_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    GetSite ({ commit }, id) {
      return new Promise((resolve, reject) => {
        getSite(id).then(response => {
          console.log(response)
          const result = response.data
          commit('SET_SITE_NAME', result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default site
