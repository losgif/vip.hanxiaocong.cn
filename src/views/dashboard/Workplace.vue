<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span></div>
      <div>新媒体工作者</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="应用" :content="applications.length" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="信息数" :content="informationCount" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="我的应用"
            :body-style="{ padding: 0 }">
            <a slot="extra" @click="showDeveloping">添加应用</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in applications">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.logo"/>
                      <a>{{ item.name }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <router-link :to="'/' + item.type + '/' + item.id">管理</router-link>
                    <span class="datetime">{{ item.updated_at }}</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="activityLoading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.extra.person_image" />
                  <div slot="title">
                    <span v-if="item.application.type === 'roommate'">{{ item.extra.ta_name }}</span>&nbsp;
                    <span v-if="item.application.type === 'gooddess'">{{ item.extra.name }}</span>&nbsp;
                    在&nbsp;<router-link :to="'/' + item.application.type + '/' + item.application.id">{{ item.application.name }}</router-link>&nbsp;
                    <span>应用中提交了信息，请尽快处理。</span>&nbsp;
                    <router-link :to="'/' + item.application.type + '/' + item.application.id">立即处理</router-link>
                  </div>
                  <div slot="description">{{ item.updated_at }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <router-link to="/application">我的应用</router-link>
              <a-button @click="showDeveloping" size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>
          <a-card :loading="loading" title="开发团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'

import { getRoleList, getServiceList } from '@/api/manage'
import { requestFailedHandle } from '../../utils/request'

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      applications: [],
      loading: true,
      activityLoading: true,
      activities: [],
      teams: [{
        id: 1,
        name: 'losgif',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      },
      {
        id: 2,
        name: '小葱',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
      },
      {
        id: 3,
        name: '卷卷酱',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
      }],
      informationCount: 0
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted () {
    this.getProjects()
    this.getActivity()
    this.getData()
  },
  methods: {
    showDeveloping () {
      this.$message.warning('施主莫急，程序猿小哥正在努力开发中。')
    },
    getProjects () {
      this.$http.get('/workplace/applications')
        .then(res => {
          this.applications = res.data
          this.loading = false
        })
    },
    getActivity () {
      this.$http.get('/workplace/activity')
        .then(res => {
          this.activities = res.data
          this.activityLoading = false
        })
        .catch(e => {
          this.activityLoading = false
          requestFailedHandle(e)
        })
    },
    getData () {
      this.$http.get('/workplace/data')
        .then(res => {
          this.informationCount = res.data
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
