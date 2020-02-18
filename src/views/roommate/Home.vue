<template>
  <div class="main">
    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step />
        <a-step />
        <a-step />
      </a-steps>
      <div class="content">
        <step1 :form-data="form" v-if="currentTab === 0" @nextStep="nextStep"/>
        <step2 v-if="currentTab === 1" @prevStep="prevStep" @finish="finish"/>
      </div>
    </a-card>
  </div>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import { uploadInfo } from '@/api/upload'
import { requestfailedHandle } from '@/utils/request'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2
  },
  data () {
    return {
      currentTab: 0,
      scrollTop: 0,
      // form
      form: {}
    }
  },
  mounted () {
    this.$store.dispatch('GetSite', this.$route.params.id)
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // handler
    nextStep (currentTab, values) {
      this.form = Object.assign(this.form, values)
      this.$message.info(`正在上传信息`)

      if (currentTab === 1) {
        this.form.school_application_id = this.$route.params.id

        uploadInfo(this.form)
          .then(res => {
            this.currentTab = currentTab
          })
          .catch(e => {
            requestfailedHandle(e)
          })
      } else {
        this.backTop()

        this.currentTab = currentTab
      }
    },
    prevStep (currentTab, values) {
      this.backTop()

      this.form = Object.assign(this.form, values)
      this.currentTab = currentTab
    },
    finish () {
      this.currentTab = 0
    },
    backTop () {
      const timer = setInterval(() => {
        const ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    scrollToTop () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
    display: none;
  }
</style>
