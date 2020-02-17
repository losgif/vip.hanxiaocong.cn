<template>
  <div>
    <a-form style="margin: 40px auto 0;">
      <result title="提交成功" :is-success="true" description="请耐心等待审核" style="max-width: 560px;">
        <div slot="action" class="center">
          <a-button type="primary" @click="finish">再次提交</a-button>
        </div>
      </result>
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'Step3',
  components: {
    Result
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    finish () {
      this.$emit('finish')
    }
  }
}
</script>
<style>
  .center {
    text-align: center;
  }
</style>
