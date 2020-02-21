<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            label="用户名"
          >
            <a-input v-model="info.name" placeholder="给自己起个名字" />
          </a-form-item>

          <a-form-item
            label="电子邮件"
            :required="false"
          >
            <a-input v-model="info.email" placeholder="exp@admin.com"/>
          </a-form-item>

          <a-form-item
            label="手机号码"
            :required="false"
          >
            <a-input v-model="info.phone" placeholder="请输入手机号码"/>
          </a-form-item>

          <a-form-item
            label="登录密码"
            :required="false"
          >
            <a-input v-model="password" placeholder="留空不修改"/>
          </a-form-item>

          <a-form-item>
            <a-button @click="handleUserInfoUpdate">保存</a-button>
          </a-form-item>
        </a-form>

      </a-col>
    </a-row>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { mapState } from 'vuex'
import { userUpdate } from '@/api/user'
import { requestFailedHandle } from '@/utils/request'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      password: '',
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.user.info
    })
  },
  methods: {
    handleUserInfoUpdate () {
      userUpdate({
        id: this.info.id,
        name: this.info.name,
        email: this.info.email,
        phone: this.info.phone,
        password: this.password
      }).then(res => {
        this.$message.success(res.data)
      }).catch(e => {
        requestFailedHandle(e)
      })
    },
    setavatar (url) {
      this.option.img = url
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
