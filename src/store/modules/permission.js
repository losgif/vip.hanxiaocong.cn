/* eslint-disable no-unused-vars */
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i].name)
      if (flag) {
        return true
      }
    }
    return false
  }
  return false
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
function hasRole (roles, route) {
  if (route.meta && route.meta.roles) {
    let flag = false
    for (let i = 0, len = roles.length; i < len; i++) {
      flag = route.meta.roles.includes(roles[i].name)
      if (flag) {
        return true
      }
    }
    return false
  }
  return false
}

function hasPermissionOrRole (roles, route) {
  const permissionResult = hasPermission(roles.permissionList, route)
  const roleResult = hasRole(roles, route)

  return permissionResult || roleResult
}

function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, roles)
    }

    if (hasPermissionOrRole(roles, route)) {
      return true
    }

    return false
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
