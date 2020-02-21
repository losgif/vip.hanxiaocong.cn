<template>
  <a-card :bordered="false">
    <!-- <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div> -->

    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
    >
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '12px' }">
          <a-col :span="12" v-for="(role) in record.role" :key="role.id" :style="{ marginBottom: '12px' }">
            <a-col :lg="4" :md="24">
              <span>{{ role.name }}：</span>
            </a-col>
            <a-col :lg="20" :md="24" v-if="role.permission.length > 0">
              <a-tag color="cyan" v-for="(permission) in role.permission" :key="permission.id">{{ permission.name }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="handleDelete(record.id)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

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
          label="ID"
          hasFeedback
        >
          <a-input placeholder="ID" v-model="mdl.id" disabled="disabled" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户名"
          hasFeedback
        >
          <a-input placeholder="请设置用户名" v-model="mdl.name" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮箱"
          hasFeedback
        >
          <a-input placeholder="请设置邮箱" v-model="mdl.email" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号"
          hasFeedback
        >
          <a-input placeholder="请设置手机号码" v-model="mdl.phone" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态"
          hasFeedback
        >
          <a-select v-model="mdl.status">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getAdminUserList, updateAdminUserList, deleteAdminUserList } from '@/api/admin'
import { requestFailedHandle } from '@/utils/request'

const statusMap = {
  1: {
    status: 'success',
    text: '正常'
  },
  0: {
    status: 'error',
    text: '禁用'
  }
}

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      description: '后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
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
          title: '用户名',
          dataIndex: 'name'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '手机号码',
          dataIndex: 'phone'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          sorter: true
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
          sorter: true
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log(parameter)
        return getAdminUserList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 200) {
              return res.data
            }
          })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
    },
    handleOk () {
      updateAdminUserList(this.mdl).then(res => {
        this.$message.success(res.data)
        this.visible = false
        this.$refs.table.refresh()
      }).catch(e => {
        requestFailedHandle(e)
      })
    },
    handleDelete (id) {
      this.$confirm({
        title: '删除后不可恢复',
        content: '是否确认删除?',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteAdminUserList(id).then(res => {
            this.$message.success(res.data)
            this.$refs.table.refresh()
          }).catch(e => {
            requestFailedHandle(e)
          })
        }
      })
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
