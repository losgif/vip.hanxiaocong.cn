<template>
  <div>
    <a-form style="margin: 40px auto 0;">
      <result title="提交成功" :is-success="true" description="请耐心等待审核" style="max-width: 560px;">
      </result>
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'Step2',
  components: {
    Result
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
<style>
  .center {
    text-align: center;
  }
</style>
