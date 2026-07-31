<!-- 铜钱：side='字' 显示文字面，side='背' 显示花纹面 -->
<script setup>
const props = defineProps({ side: { type: String, default: '' } })
</script>

<template>
  <svg v-if="props.side === '字' || props.side === '背'" viewBox="0 0 40 40" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>铜钱·{{ props.side }}</title>
    <circle cx="20" cy="20" r="17" :fill="props.side === '字' ? 'var(--paper)' : 'var(--paper-2)'" stroke="var(--ink-2)" stroke-width="2" />
    <rect x="14.5" y="14.5" width="11" height="11" fill="none" stroke="var(--ink-2)" stroke-width="1.8" />
    <!-- 字面：方孔四周四点（简化的钱文） -->
    <g v-if="props.side === '字'" fill="var(--ink-2)">
      <circle cx="20" cy="9.5" r="1.6" />
      <circle cx="20" cy="30.5" r="1.6" />
      <circle cx="9.5" cy="20" r="1.6" />
      <circle cx="30.5" cy="20" r="1.6" />
    </g>
    <!-- 背面：左右弧纹 -->
    <g v-else stroke="var(--muted)" stroke-width="1.6" fill="none" stroke-linecap="round">
      <path d="M9 13 Q6.5 20 9 27" />
      <path d="M31 13 Q33.5 20 31 27" />
    </g>
  </svg>
</template>
