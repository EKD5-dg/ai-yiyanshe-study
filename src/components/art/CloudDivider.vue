<!-- 云纹分隔线：替代纯直线的区块分隔装饰 -->
<template>
  <svg class="cloud-divider" viewBox="0 0 400 16" preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="8" x2="160" y2="8" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" />
    <g stroke="var(--muted)" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8">
      <path d="M170 10 Q178 2 188 7 Q196 1 204 7 Q212 2 220 10" />
      <path d="M182 13 Q192 8 202 12 Q210 8 218 13" opacity="0.6" />
    </g>
    <line x1="230" y1="8" x2="380" y2="8" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
.cloud-divider { width: 100%; display: block; height: 16px; }
</style>
