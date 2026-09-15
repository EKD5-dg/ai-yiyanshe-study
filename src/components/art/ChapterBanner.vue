<!-- 学堂章节横幅：每章一幅氛围小画 -->
<script setup>
import { useId } from 'vue'

const props = defineProps({ chapter: { type: Number, default: 1 } })
const known = [1, 2, 3, 4, 5, 6]
const uid = useId().replace(/[^a-zA-Z0-9]/g, '') || 'c'
const arrowId = `cb-a-${uid}`
</script>

<template>
  <svg v-if="known.includes(props.chapter)" viewBox="0 0 400 56" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="56" fill="var(--paper-2)" fill-opacity="0.55" />

    <!-- 一章 · 阴阳五行：太极点 -->
    <g v-if="props.chapter === 1">
      <circle cx="48" cy="28" r="14" fill="var(--ink)" />
      <path d="M48 14 A14 14 0 0 1 48 42 A7 7 0 0 0 48 28 A7 7 0 0 1 48 14 Z" fill="var(--paper)" />
      <circle cx="48" cy="21" r="2.5" fill="var(--paper)" />
      <circle cx="48" cy="35" r="2.5" fill="var(--ink)" />
      <path d="M90 36 Q120 20 160 32 Q200 18 240 30 Q280 20 320 34" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
      <circle cx="360" cy="22" r="8" fill="var(--cinnabar)" opacity="0.7" />
    </g>

    <!-- 二章 · 认识八卦：八方小点 -->
    <g v-else-if="props.chapter === 2">
      <circle cx="60" cy="28" r="18" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <circle cx="60" cy="28" r="3" fill="var(--cinnabar)" />
      <g fill="var(--ink-2)">
        <circle cx="60" cy="12" r="2.5" /><circle cx="60" cy="44" r="2.5" />
        <circle cx="44" cy="28" r="2.5" /><circle cx="76" cy="28" r="2.5" />
        <circle cx="49" cy="17" r="2" /><circle cx="71" cy="17" r="2" />
        <circle cx="49" cy="39" r="2" /><circle cx="71" cy="39" r="2" />
      </g>
      <path d="M110 36 Q150 24 190 34 Q230 22 270 34 Q310 26 360 34" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M330 18 q6 -7 12 0 q6 -7 12 0" stroke="var(--ink)" stroke-width="1.6" fill="none" opacity="0.5" />
    </g>

    <!-- 三章 · 六十四卦：叠线 -->
    <g v-else-if="props.chapter === 3">
      <g fill="var(--ink)" opacity="0.7">
        <rect x="36" y="14" width="36" height="4" rx="1" /><rect x="36" y="22" width="36" height="4" rx="1" />
        <rect x="36" y="30" width="15" height="4" rx="1" /><rect x="57" y="30" width="15" height="4" rx="1" />
        <rect x="36" y="38" width="36" height="4" rx="1" />
      </g>
      <text x="88" y="34" font-size="14" fill="var(--cinnabar)">+</text>
      <g fill="var(--ink)" opacity="0.7">
        <rect x="110" y="14" width="36" height="4" rx="1" /><rect x="110" y="22" width="15" height="4" rx="1" /><rect x="131" y="22" width="15" height="4" rx="1" />
        <rect x="110" y="30" width="36" height="4" rx="1" /><rect x="110" y="38" width="36" height="4" rx="1" />
      </g>
      <path d="M170 30 L210 30" stroke="var(--cinnabar)" stroke-width="1.6" :marker-end="`url(#${arrowId})`" />
      <defs><marker :id="arrowId" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="var(--cinnabar)" /></marker></defs>
      <path d="M240 36 Q280 24 320 34 Q350 28 370 36" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 四章 · 爻辞：六级台阶 -->
    <g v-else-if="props.chapter === 4">
      <g fill="var(--ink-2)" opacity="0.65">
        <rect x="40" y="40" width="28" height="8" rx="2" />
        <rect x="72" y="34" width="28" height="14" rx="2" />
        <rect x="104" y="28" width="28" height="20" rx="2" />
        <rect x="136" y="22" width="28" height="26" rx="2" />
        <rect x="168" y="16" width="28" height="32" rx="2" fill="var(--cinnabar)" opacity="0.85" />
        <rect x="200" y="10" width="28" height="38" rx="2" opacity="0.4" />
      </g>
      <path d="M250 36 Q290 24 330 34 Q360 28 380 36" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 五章 · 卦际关系：镜像 -->
    <g v-else-if="props.chapter === 5">
      <g fill="var(--ink)">
        <rect x="40" y="16" width="32" height="4" rx="1" /><rect x="40" y="24" width="32" height="4" rx="1" />
        <rect x="40" y="32" width="32" height="4" rx="1" /><rect x="40" y="40" width="13" height="4" rx="1" />
        <rect x="59" y="40" width="13" height="4" rx="1" />
      </g>
      <line x1="90" y1="12" x2="90" y2="48" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 2" />
      <g fill="var(--ink)">
        <rect x="108" y="16" width="13" height="4" rx="1" /><rect x="127" y="16" width="13" height="4" rx="1" />
        <rect x="108" y="24" width="32" height="4" rx="1" /><rect x="108" y="32" width="32" height="4" rx="1" />
        <rect x="108" y="40" width="32" height="4" rx="1" />
      </g>
      <path d="M170 30 Q220 18 270 32 Q320 20 370 32" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 六章 · 易学思维：卷轴 -->
    <g v-else-if="props.chapter === 6">
      <rect x="40" y="16" width="70" height="28" rx="4" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.5" />
      <line x1="48" y1="24" x2="100" y2="24" stroke="var(--line)" stroke-width="1.5" />
      <line x1="48" y1="32" x2="92" y2="32" stroke="var(--line)" stroke-width="1.5" />
      <circle cx="40" cy="30" r="5" fill="var(--ink-2)" />
      <circle cx="110" cy="30" r="5" fill="var(--ink-2)" />
      <path d="M150 36 Q190 22 230 34 Q270 20 310 32 Q340 26 370 34" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
      <circle cx="350" cy="20" r="6" fill="var(--cinnabar)" opacity="0.6" />
    </g>
  </svg>
</template>
