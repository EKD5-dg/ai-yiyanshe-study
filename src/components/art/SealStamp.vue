<!-- 朱砂印章装饰：每日一卦 / 通关结算用 -->
<script setup>
const props = defineProps({
  text: { type: String, default: '易' },
  size: { type: [Number, String], default: 56 }
})
</script>

<template>
  <svg :width="props.size" :height="props.size" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <!-- 印章外框略不规则 -->
    <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="var(--cinnabar)" stroke-width="3.5" opacity="0.9" />
    <rect x="10" y="10" width="44" height="44" rx="3" fill="var(--cinnabar)" opacity="0.08" />
    <text x="32" y="38" text-anchor="middle" font-size="26" font-weight="bold" fill="var(--cinnabar)" opacity="0.92" font-family="'PingFang SC','Microsoft YaHei',serif">{{ props.text }}</text>
    <!-- 印泥噪点感 -->
    <circle cx="12" cy="14" r="1.2" fill="var(--cinnabar)" opacity="0.35" />
    <circle cx="52" cy="50" r="1" fill="var(--cinnabar)" opacity="0.3" />
    <circle cx="48" cy="16" r="0.8" fill="var(--cinnabar)" opacity="0.25" />
  </svg>
</template>
