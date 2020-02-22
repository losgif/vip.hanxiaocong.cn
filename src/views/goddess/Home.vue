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
        <step2 :form-data="form" v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
        <step3 v-if="currentTab === 2" @prevStep="prevStep"/>
      </div>
    </a-card>
  </div>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { uploadInfo } from '@/api/upload'
import { requestFailedHandle } from '@/utils/request'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3
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

      if (currentTab === 2) {
        this.form.person_image = this.form.person_image[0].url
        this.form.question_image_1 = this.form.question_image_1[0].url
        this.form.question_image_2 = this.form.question_image_2[0].url
        this.form.question_image_3 = this.form.question_image_3[0].url
        this.form.question_image_4 = this.form.question_image_4[0].url
        this.form.question_image_5 = this.form.question_image_5[0].url
        this.form.question_image_6 = this.form.question_image_6[0].url
        this.form.question_image_7 = this.form.question_image_7[0].url
        this.form.question_image_8 = this.form.question_image_8[0].url
        this.form.question_image_9 = this.form.question_image_9[0].url
        this.form.school_application_id = this.$route.params.id
        this.$message.info(`正在上传信息`)

        uploadInfo(this.form)
          .then(res => {
            this.currentTab = currentTab
          })
          .catch(e => {
            requestFailedHandle(e)
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
