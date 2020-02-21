<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper" v-show="isDisplaySearch">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button v-if="$route.meta.hiddenHeaderContent">
        <router-link target="_blank" :to="'/roommate/' + $route.params.id">跳转到浏览器打开此页面</router-link>
      </a-button>
      <a-button type="primary">
        <router-link target="_blank" :to="'/roommate/home/' + $route.params.id">打开信息提交页面</router-link>
      </a-button>
      <!-- <a-button type="dashed">
        <router-link :to="'/roommate/setting/' + $route.params.id">应用配置</router-link>
      </a-button> -->
      <a-button @click="handleGenerate" v-if="selectedRowKeys.length > 0">生成样式</a-button>
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="handleDelete"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
      :scroll="{ x: 2000 }"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="ta_contact_account" slot-scope="text">
        <ellipsis :length="11" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="specialty" slot-scope="text">
        <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="expectation" slot-scope="text">
        <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="your_contact_account" slot-scope="text">
        <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="sex" slot-scope="text">
        <a-badge :status="text | sexTypeFilter" :text="text | sexFilter" />
      </span>
      <span slot="person_image" slot-scope="text">
        <a-avatar shape="square" :size="64" :src="text"/>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
        </template>
      </span>
    </s-table>
    <a-modal
      title="生成样式"
      v-model="visible"
      width="80%"
      :bodyStyle="{height: '60vh'}"
      :maskClosable="false"
      :footer="footer">
      <template slot="footer">
        <a-button type="primary" id="copyButton" data-clipboard-target="#copyTarget">复制</a-button>
      </template>
      <iframe
        id="copyTarget"
        :src="'/api/information/preview?id=' + schoolApplication.id + '&type=' + schoolApplication.type + '&array=[' + this.showId + ']'"
        height="100%"
        width="100%"
        frameborder="0">
      </iframe>
    </a-modal>
    <step-by-step-modal :form-data="this.formData" ref="editModal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'
import {
  informationIndexByApplicationId,
  informationBatchDelete
} from '@/api/information'
import Clipboard from 'clipboard'
import StepByStepModal from './modules/StepByStepModal'
import { schoolApplicationShow } from '@/api/schoolApplication'
import { requestFailedHandle } from '@/utils/request'

const statusMap = {
  0: {
    status: 'success',
    text: '未生成'
  },
  1: {
    status: 'error',
    text: '已生成'
  }
}

const sexMap = {
  'male': {
    status: 'default',
    text: '男'
  },
  'female': {
    status: 'success',
    text: '女'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    StepByStepModal
  },
  data () {
    return {
      visible: false,
      showId: 0,
      schoolApplication: {},
      formData: {},
      isDisplaySearch: false,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '姓名',
          dataIndex: 'extra.ta_name'
        },
        {
          title: '状态',
          dataIndex: 'is_active',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '性别',
          dataIndex: 'extra.sex',
          scopedSlots: { customRender: 'sex' }
        },
        {
          title: '联系方式',
          dataIndex: 'extra.ta_contact_account',
          scopedSlots: { customRender: 'ta_contact_account' }
        },
        {
          title: '个人照片',
          dataIndex: 'extra.person_image',
          scopedSlots: { customRender: 'person_image' }
        },
        {
          title: '学校',
          dataIndex: 'extra.university'
        },
        {
          title: '座右铭',
          dataIndex: 'extra.your_contact_account',
          scopedSlots: { customRender: 'your_contact_account' }
        },
        {
          title: '身高',
          dataIndex: 'extra.height',
          customRender: (text) => text + 'CM'
        },
        {
          title: '产地',
          dataIndex: 'extra.origin'
        },
        {
          title: '特长',
          dataIndex: 'extra.specialty',
          scopedSlots: { customRender: 'specialty' }
        },
        {
          title: '期望',
          dataIndex: 'extra.expectation',
          scopedSlots: { customRender: 'expectation' }
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '60px',
          scopedSlots: { customRender: 'action' },
          fixed: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const id = this.$route.params.id

        return informationIndexByApplicationId(Object.assign(parameter, this.queryParam, { id: id }))
          .then(res => {
            if (res.code === 200) {
              return res.data
            }
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    sexFilter (type) {
      return sexMap[type].text
    },
    sexTypeFilter (type) {
      return sexMap[type].status
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  mounted () {
    this.$store.dispatch('GetSite', this.$route.params.id)

    schoolApplicationShow(this.$route.params.id).then(res => {
      this.schoolApplication = res.data
    }).catch(e => {
      requestFailedHandle(e)
    })

    this.initClipboard()
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },

    initClipboard () {
      const clipboard = new Clipboard('#copyButton')

      clipboard.on('success', e => {
        this.$message.warning(`开发中，请手动复制`)

        console.log('success:', e)
      })

      clipboard.on('error', e => {
        console.log('error:', e)
      })
    },

    handleDelete () {
      if (this.selectedRowKeys !== []) {
        const vm = this

        this.$confirm({
          title: '是否删除?',
          content: '删除后不可恢复，确认删除吗',
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            informationBatchDelete({ keys: vm.selectedRowKeys }).then(res => {
              vm.$message.info('删除成功')

              vm.$refs.table.refresh()
            }).catch(e => {
              vm.requestFailed(e)
            })
          }
        })
      } else {
        this.$message.error('请选择数据后再继续删除操作')
      }
    },

    requestFailed (err) {
      if (((err.response || {}).data || {}).message instanceof Object) {
        var message = ((err.response || {}).data || {}).message
        for (const key in message) {
          setTimeout(() => {
            this.$notification['error']({
              message: '错误',
              description: message[key] || '请求出现错误，请稍后再试',
              duration: 3
            })
          }, 0)
        }
      } else {
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 3
        })
      }
    },

    handleEdit (record) {
      this.$message.warning(`开发中`)
      // this.formData = record
      // this.$refs.editModal.edit(record)
    },
    handleGenerate (record) {
      if (this.selectedRowKeys !== []) {
        this.visible = true
        this.showId = this.selectedRowKeys
      } else {
        this.$message.error('请选择数据后再继续操作')
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
