<!-- 风水进阶专题图标：八宅/飞星/罗盘 -->
<script setup>
const props = defineProps({ kind: { type: String, default: '' } })
const known = ['minggua', 'feixing', 'luopan']
</script>

<template>
  <svg v-if="known.includes(props.kind)" viewBox="0 0 56 56" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>专题图标</title>

    <!-- 八宅命卦：九宫 + 人 -->
    <g v-if="props.kind === 'minggua'">
      <rect x="6" y="6" width="44" height="44" rx="8" fill="var(--paper-2)" stroke="var(--line)" />
      <g stroke="var(--line)" stroke-width="1.2" fill="none">
        <rect x="12" y="12" width="10" height="10" /><rect x="23" y="12" width="10" height="10" /><rect x="34" y="12" width="10" height="10" />
        <rect x="12" y="23" width="10" height="10" /><rect x="23" y="23" width="10" height="10" fill="#f0f8f4" /><rect x="34" y="23" width="10" height="10" />
        <rect x="12" y="34" width="10" height="10" /><rect x="23" y="34" width="10" height="10" /><rect x="34" y="34" width="10" height="10" />
      </g>
      <circle cx="28" cy="28" r="3" fill="var(--cinnabar)" />
      <path d="M22 17 L28 22 L34 17" stroke="var(--good)" stroke-width="1.5" fill="none" stroke-linecap="round" />
    </g>

    <!-- 九宫飞星：星点轨迹 -->
    <g v-else-if="props.kind === 'feixing'">
      <rect x="6" y="6" width="44" height="44" rx="8" fill="var(--paper-2)" stroke="var(--line)" />
      <path d="M28 14 L38 18 L40 28 L34 38 L22 38 L16 28 L18 18 Z" stroke="var(--muted)" stroke-width="1.2" fill="none" stroke-dasharray="3 2" />
      <circle cx="28" cy="28" r="4" fill="var(--cinnabar)" />
      <circle cx="28" cy="14" r="2.5" fill="var(--ink-2)" />
      <circle cx="40" cy="28" r="2.5" fill="var(--ink-2)" />
      <circle cx="28" cy="38" r="2.5" fill="var(--ink-2)" />
      <circle cx="16" cy="28" r="2.5" fill="var(--ink-2)" />
      <circle cx="36" cy="18" r="2" fill="var(--good)" />
      <circle cx="20" cy="36" r="2" fill="var(--good)" />
    </g>

    <!-- 罗盘 -->
    <g v-else-if="props.kind === 'luopan'">
      <circle cx="28" cy="28" r="22" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="1.8" />
      <circle cx="28" cy="28" r="15" fill="none" stroke="var(--line)" stroke-width="1.2" />
      <circle cx="28" cy="28" r="8" fill="none" stroke="var(--line)" stroke-width="1.2" />
      <path d="M28 14 L31 28 L28 42 L25 28 Z" fill="var(--cinnabar)" />
      <circle cx="28" cy="28" r="3" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.2" />
      <g fill="var(--ink-2)" font-size="6" text-anchor="middle">
        <text x="28" y="10">南</text><text x="28" y="50">北</text>
      </g>
    </g>
  </svg>
</template>
