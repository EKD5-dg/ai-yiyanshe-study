<script setup>
import SideRail from './SideRail.vue'

// rail：桌面双栏，左栏是常驻个人状态；wide：长文页的窄阅读列，不挂左栏
const props = defineProps({
  layout: { type: String, default: 'rail' },
  // 移动端只在首页保留左栏内容，避免答题等任务型页面被状态卡顶开
  mobileRail: { type: Boolean, default: false }
})
</script>

<template>
  <div class="shell" :class="props.layout === 'rail' ? 'shell-rail' : 'shell-wide'">
    <SideRail v-if="props.layout === 'rail'" :class="{ 'hide-mobile': !props.mobileRail }" />
    <main class="main"><slot /></main>
  </div>
</template>

<style scoped>
.shell { max-width: 1180px; margin: 0 auto; padding: 20px 16px 90px; display: grid; gap: 20px; align-items: start; }
.shell-rail { grid-template-columns: 244px minmax(0, 1fr); }
.shell-wide { max-width: 792px; grid-template-columns: minmax(0, 1fr); }
@media (max-width: 1023px) {
  .shell-rail { grid-template-columns: minmax(0, 1fr); }
  .hide-mobile { display: none; }
}
</style>
