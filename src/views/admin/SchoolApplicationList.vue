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
      <span slot="logo" slot-scope="text">
        <a-avatar shape="square" :size="64" :src="text"/>
      </span>
      <span slot="action" slot-scope="text, record">
        <router-link :to="'/' + record.type + '/' + record.id">管理</router-link>
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
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getAdminSchoolApplicationList, deleteAdminSchoolApplicationList } from '@/api/admin'
import { requestFailedHandle } from '@/utils/request'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      description: '后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

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
          title: '公众号备注',
          dataIndex: 'name'
        },
        {
          title: 'LOGO',
          dataIndex: 'logo',
          scopedSlots: { customRender: 'logo' }
        },
        {
          title: '公众号名称',
          dataIndex: 'school.name'
        },
        {
          title: '用户名',
          dataIndex: 'school.user.name'
        },
        {
          title: '手机号码',
          dataIndex: 'school.user.phone'
        },
        {
          title: '提交信息数',
          dataIndex: 'information_count'
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
        return getAdminSchoolApplicationList(Object.assign(parameter, this.queryParam))
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
  methods: {
    handleDelete (id) {
      this.$confirm({
        title: '删除后不可恢复',
        content: '是否确认删除?',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteAdminSchoolApplicationList(id).then(res => {
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
