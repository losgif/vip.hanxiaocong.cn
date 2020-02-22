<template>
  <div>
    <router-view />
    <global-footer />
  </div>
</template>

<script>
import GlobalFooter from '@/components/GlobalFooter'

export default {
  name: 'InformationLayout',
  components: { GlobalFooter }
}
</script>

<style scoped>

</style>
