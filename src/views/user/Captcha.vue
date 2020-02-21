<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Captcha',
  props: {
    parm: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 腾讯验证码
      if (typeof window.TencentCaptcha !== 'function') {
        const URL = 'https://ssl.captcha.qq.com/TCaptcha.js'
        const scriptHeat = document.createElement('script')
        scriptHeat.type = 'text/javascript'
        scriptHeat.src = URL
        document.body.appendChild(scriptHeat)
        scriptHeat.onload = () => {
          this.TencentCaptchaInit()
        }
      } else {
        this.TencentCaptchaInit()
      }
    },
    TencentCaptchaInit () {
      const t = this
      // eslint-disable-next-line no-undef
      const tencentCaptcha = new TencentCaptcha(
        document.getElementById(t.id),
        t.parm.appid,
        function (res) {
          t.$emit('callback', res)
        }
      )

      return tencentCaptcha
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
