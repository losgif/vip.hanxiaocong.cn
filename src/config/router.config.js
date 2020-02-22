// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, SubmitLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import { InformationLayout } from '@/layouts/index'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页', roles: [ 'vistor', 'normal-user', 'super-admin' ] },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, roles: [ 'vistor', 'normal-user', 'super-admin' ] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            hidden: true,
            meta: { title: '分析页', keepAlive: false, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            hidden: true,
            meta: { title: '测试功能', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
          }
        ]
      },
      // school
      {
        path: '/school',
        redirect: '/school/my',
        component: PageView,
        meta: { title: '接入公众号', icon: 'setting', roles: [ 'vistor', 'normal-user', 'super-admin' ] },
        children: [
          {
            path: '/school/my',
            name: 'SchoolMy',
            component: () => import('@/views/school/My'),
            meta: { title: '配置公众号', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
          }
        ]
      },

      // application
      {
        path: '/application',
        redirect: '/application/my',
        component: PageView,
        meta: { title: '公众号列表', icon: 'form', roles: ['normal-user', 'super-admin'] },
        children: [
          {
            path: '/application/my',
            name: 'ApplicationMy',
            component: () => import('@/views/application/My'),
            meta: { title: '我的公众号', keepAlive: true, roles: ['normal-user', 'super-admin'] }
          }
        ]
      },

      // goddess
      {
        path: '/goddess',
        redirect: '/goddess/:id',
        component: PageView,
        hidden: true,
        meta: { title: '男神女神', icon: 'form', roles: ['normal-user', 'super-admin'] },
        children: [
          {
            path: '/goddess/:id',
            name: 'GoddessDetail',
            hidden: true,
            component: () => import('@/views/goddess/Detail'),
            meta: { title: '公众号详情', keepAlive: true, roles: ['normal-user', 'super-admin'] }
          }
        ]
      },

      // rommate
      {
        path: '/roommate',
        redirect: '/roommate/:id',
        component: PageView,
        hidden: true,
        meta: { title: '卖舍友', icon: 'form', roles: ['normal-user', 'super-admin'] },
        children: [
          {
            path: '/roommate/:id',
            name: 'RoommateDetail',
            hidden: true,
            component: () => import('@/views/roommate/Detail'),
            meta: { title: '公众号详情', keepAlive: true, roles: ['normal-user', 'super-admin'] }
          }
        ]
      },
      // single
      {
        path: '/single',
        redirect: '/single/:id',
        component: PageView,
        hidden: true,
        meta: { title: '单身专场', icon: 'form', roles: ['normal-user', 'super-admin'] },
        children: [
          {
            path: '/single/:id',
            name: 'SingleDetail',
            hidden: true,
            component: () => import('@/views/single/Detail'),
            meta: { title: '公众号详情', keepAlive: true, roles: ['normal-user', 'super-admin'] }
          }
        ]
      },
      {
        path: '/admin',
        redirect: '/admin/dashboard',
        component: PageView,
        meta: { title: '管理后台', icon: 'dashboard', roles: [ 'super-admin' ] },
        children: [
          {
            path: '/admin/dashboard',
            name: 'AdminDashboard',
            component: () => import('@/views/admin/Dashboard'),
            meta: { title: '工作台', keepAlive: true, roles: [ 'super-admin' ] }
          },
          {
            path: '/admin/user-list',
            name: 'UserList',
            component: () => import('@/views/admin/UserList'),
            meta: { title: '用户列表', keepAlive: true, roles: [ 'super-admin' ] }
          },
          {
            path: '/admin/school-application-list',
            name: 'SchoolApplicationList',
            component: () => import('@/views/admin/SchoolApplicationList'),
            meta: { title: '公众号列表', keepAlive: true, roles: [ 'super-admin' ] }
          }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        hidden: true,
        meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        hidden: true,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（公众号）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        hidden: true,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        hidden: true,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        hidden: true,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        hidden: true,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', roles: [ 'vistor', 'normal-user', 'super-admin' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: false, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, roles: [ 'vistor', 'normal-user', 'super-admin' ] }
              }
            ]
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        hidden: true,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/weixiao',
    name: 'weixiao',
    component: SubmitLayout,
    meta: { title: '腾讯微笑', roles: [ 'normal-user', 'super-admin' ] },
    children: [
      {
        path: '/weixiao/goddess',
        component: PageView,
        hidden: true,
        meta: { title: '男神女神', icon: 'form', roles: [ 'normal-user', 'super-admin' ] },
        children: [
          {
            path: '/weixiao/goddess/:id',
            name: 'WeixiaoGoddessDetail',
            hidden: true,
            component: () => import('@/views/goddess/Detail'),
            meta: { title: '公众号详情', keepAlive: true, roles: [ 'normal-user', 'super-admin' ], hiddenHeaderContent: true }
          }
        ]
      },
      {
        path: '/weixiao/roommate',
        component: PageView,
        hidden: true,
        meta: { title: '卖舍友', icon: 'form', roles: [ 'normal-user', 'super-admin' ] },
        children: [
          {
            path: '/weixiao/roommate/:id',
            name: 'WeixiaoRoommateDetail',
            hidden: true,
            component: () => import('@/views/roommate/Detail'),
            meta: { title: '公众号详情', keepAlive: true, roles: [ 'normal-user', 'super-admin' ], hiddenHeaderContent: true }
          }
        ]
      },
      {
        path: '/weixiao/single',
        component: PageView,
        hidden: true,
        meta: { title: '单身专场', icon: 'form', roles: [ 'normal-user', 'super-admin' ] },
        children: [
          {
            path: '/weixiao/single/:id',
            name: 'WeixiaoSingleDetail',
            hidden: true,
            component: () => import('@/views/single/Detail'),
            meta: { title: '公众号详情', keepAlive: true, roles: [ 'normal-user', 'super-admin' ], hiddenHeaderContent: true }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', meta: { roles: [ 'vistor', 'normal-user', 'super-admin' ] }, hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
        meta: { title: '登录' }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register'),
        meta: { title: '注册' }
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
        meta: { title: '注册结果' }
      }
    ]
  },

  {
    path: '/information',
    hidden: true,
    component: InformationLayout,
    children: [
      {
        path: '/information/:id/:token/:type',
        name: 'information',
        component: () => import('@/views/information/Detail'),
        meta: { title: '联系方式' }
      }
    ]
  },

  {
    path: '/roommate',
    hidden: true,
    component: SubmitLayout,
    children: [
      {
        path: '/roommate/home/:id',
        name: 'roommate',
        component: () => import('@/views/roommate/Home'),
        meta: { title: '卖舍友 - 报名入口' }
      }
    ]
  },

  {
    path: '/goddess',
    hidden: true,
    component: SubmitLayout,
    children: [
      {
        path: '/goddess/home/:id',
        name: 'goddess',
        component: () => import('@/views/goddess/Home'),
        meta: { title: '男神女神 - 报名入口' }
      }
    ]
  },

  {
    path: '/single',
    hidden: true,
    component: SubmitLayout,
    children: [
      {
        path: '/single/home/:id',
        name: 'single',
        component: () => import('@/views/single/Home'),
        meta: { title: '单身专场 - 报名入口' }
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
    meta: { title: '页面不存在' }
  },

  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
    meta: { title: '页面未授权' }
  },

  {
    path: '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
    meta: { title: '页面错误' }
  }

]
