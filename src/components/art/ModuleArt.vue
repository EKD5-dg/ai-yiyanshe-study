<!-- 模块入口插画：lessons=书卷 fengshui=罗盘 divination=铜钱 quiz=令旗 -->
<script setup>
const props = defineProps({ kind: { type: String, default: '' } })
const known = ['lessons', 'fengshui', 'divination', 'quiz']
</script>

<template>
  <svg v-if="known.includes(props.kind)" viewBox="0 0 64 64" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>模块图标</title>

    <!-- 书卷 -->
    <g v-if="props.kind === 'lessons'">
      <path d="M32 14 Q20 8 10 12 L10 48 Q20 44 32 50 Q44 44 54 48 L54 12 Q44 8 32 14 Z" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="2" />
      <line x1="32" y1="14" x2="32" y2="50" stroke="var(--ink-2)" stroke-width="2" />
      <g stroke="var(--muted)" stroke-width="1.6" stroke-linecap="round">
        <line x1="16" y1="20" x2="27" y2="18" /><line x1="16" y1="27" x2="27" y2="25" /><line x1="16" y1="34" x2="27" y2="32" />
        <line x1="37" y1="18" x2="48" y2="20" /><line x1="37" y1="25" x2="48" y2="27" />
      </g>
      <path d="M44 12 L44 24 L47 21 L50 24 L50 13" fill="var(--cinnabar)" opacity="0.85" />
    </g>

    <!-- 罗盘 -->
    <g v-else-if="props.kind === 'fengshui'">
      <circle cx="32" cy="32" r="24" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="2" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <g fill="var(--ink-2)" font-size="8" text-anchor="middle">
        <text x="32" y="16">☰</text><text x="32" y="55">☷</text>
        <text x="13" y="35">☵</text><text x="51" y="35">☲</text>
      </g>
      <path d="M32 20 L37 32 L32 44 L27 32 Z" fill="var(--cinnabar)" />
      <circle cx="32" cy="32" r="3" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.5" />
    </g>

    <!-- 铜钱两枚 -->
    <g v-else-if="props.kind === 'divination'">
      <circle cx="26" cy="28" r="17" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="2" />
      <rect x="20.5" y="22.5" width="11" height="11" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.8" />
      <circle cx="42" cy="42" r="13" fill="var(--paper)" stroke="var(--muted)" stroke-width="2" />
      <rect x="38" y="38" width="8" height="8" fill="var(--paper-2)" stroke="var(--muted)" stroke-width="1.5" />
      <path d="M14 52 Q26 46 38 54" stroke="var(--cinnabar)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 交叉令旗 -->
    <g v-else-if="props.kind === 'quiz'">
      <line x1="20" y1="12" x2="44" y2="52" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <line x1="44" y1="12" x2="20" y2="52" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M20 12 L38 16 L24 24 Z" fill="var(--cinnabar)" />
      <path d="M44 12 L26 16 L40 24 Z" fill="var(--cinnabar)" opacity="0.75" />
      <text x="32" y="46" text-anchor="middle" font-size="10" fill="var(--cinnabar)">战</text>
    </g>
  </svg>
</template>
