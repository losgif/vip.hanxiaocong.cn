<template>
  <div class="card-list" ref="content">
    <a-list
      rowKey="id"
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="applications"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.id === undefined">
          <a-button class="new-btn" type="dashed" @click="handleCreate">
            <a-icon type="plus"/>
            添加应用
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta>
              <router-link slot="title" :to="'/' + item.type + '/' + item.id">{{ item.name }}</router-link>
              <a-avatar class="card-avatar" slot="avatar" :src="item.logo" size="large"/>
              <div class="meta-content" slot="description">{{ item.description }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <router-link :to="'/' + item.type + '/' + item.id">管理</router-link>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>

    <a-modal
      title="操作"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应用类型"
          hasFeedback
        >
          <a-select v-model="mdl.application_id" style="width: 100%" placeholder="请选择应用类型">
            <a-select-option
              v-for="app in applicationList"
              :key="app.id">
              {{ app.name }} -- {{ app.description }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公众号回复关键词"
          hasFeedback
        >
          <a-select mode="tags" v-model="mdl.keyword" style="width: 100%" @change="handleKeywordChange" placeholder="请输入回复关键词">
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { applicationIndex } from '@/api/application'
import { schoolApplicationCreate } from '@/api/schoolApplication'
import { requestFailedHandle } from '@/utils/request'

export default {
  name: 'CardList',
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      mdl: {},
      form: this.$form.createForm(this),
      description: '用最小的工作量，无缝接入公众号生态， 提供跨越设计与开发的体验解决方案。',
      linkList: [
        {
          icon: 'rocket',
          href: '#',
          title: '快速开始',
          // 回调，可不写
          callback: () => {
            this.showDeveloping()
          }
        },
        {
          icon: 'info-circle-o',
          href: '#',
          title: '产品简介',
          // 回调，可不写
          callback: () => {
            this.showDeveloping()
          }
        },
        {
          icon: 'file-text',
          href: '#',
          title: '使用教程',
          // 回调，可不写
          callback: () => {
            this.showDeveloping()
          }
        }
      ],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      applications: [{}],
      applicationList: []
    }
  },
  mounted () {
    this.getProjects()
    this.getApplications()
  },
  methods: {
    getApplications () {
      applicationIndex().then(res => {
        this.applicationList = res.data
      }).catch(e => {
        requestFailedHandle(e)
      })
    },
    getProjects () {
      this.$http.get('/workplace/applications')
        .then(res => {
          res.data.forEach(e => {
            this.applications.push(e)
          })
        })
        .catch(e => {
          requestFailedHandle(e)
        })
    },
    handleCreate () {
      this.visible = true
    },
    handleOk () {
      schoolApplicationCreate(this.mdl).then(res => {
        this.$message.success(res.data)
        this.visible = false
        this.getProjects()
      }).catch(e => {
        requestFailedHandle(e)
      })
    },
    handleKeywordChange (value) {
      console.log(value)
    },
    showDeveloping () {
      this.$message.warning('施主莫急，程序猿小哥正在努力开发中。')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/components/index.less";

  .card-list {
    /deep/ .ant-card-body:hover {
      .ant-card-meta-title>a {
        color: @primary-color;
      }
    }

    /deep/ .ant-card-meta-title {
      margin-bottom: 12px;

      &>a {
        display: inline-block;
        max-width: 100%;
        color: rgba(0,0,0,.85);
      }
    }

    /deep/ .meta-content {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 64px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      margin-bottom: 1em;
    }
  }

  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

</style>
