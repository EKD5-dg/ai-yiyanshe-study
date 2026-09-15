<!-- 八卦自然意象大图：左爻象右自然景，供学堂八卦关卡配图 -->
<script setup>
const props = defineProps({ trigram: { type: String, default: '' } })
const known = ['qian', 'kun', 'zhen', 'xun', 'kan', 'li', 'gen', 'dui']
const meta = {
  qian: { symbol: '☰', name: '乾', nature: '天', trait: '刚健 · 进取' },
  kun:  { symbol: '☷', name: '坤', nature: '地', trait: '包容 · 承载' },
  zhen: { symbol: '☳', name: '震', nature: '雷', trait: '行动 · 激发' },
  xun:  { symbol: '☴', name: '巽', nature: '风', trait: '渗透 · 灵活' },
  kan:  { symbol: '☵', name: '坎', nature: '水', trait: '智慧 · 险中行' },
  li:   { symbol: '☲', name: '离', nature: '火', trait: '光明 · 依附' },
  gen:  { symbol: '☶', name: '艮', nature: '山', trait: '静止 · 稳重' },
  dui:  { symbol: '☱', name: '兑', nature: '泽', trait: '喜悦 · 交流' }
}
// 三爻，自下而上：1=阳 0=阴
const lineSets = {
  qian: [1, 1, 1], kun: [0, 0, 0], zhen: [1, 0, 0], xun: [0, 1, 1],
  kan: [0, 1, 0], li: [1, 0, 1], gen: [0, 0, 1], dui: [1, 1, 0]
}
const m = meta[props.trigram]
const lines = lineSets[props.trigram] || []
</script>

<template>
  <svg v-if="known.includes(props.trigram)" viewBox="0 0 300 170" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>{{ m.name }}卦 · {{ m.nature }}</title>
    <rect x="1" y="1" width="298" height="168" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />

    <!-- 左侧爻象 -->
    <g>
      <text x="58" y="28" text-anchor="middle" font-size="20" fill="var(--ink)">{{ m.symbol }}</text>
      <g v-for="(v, i) in lines" :key="i">
        <template v-if="v === 1">
          <rect x="28" :y="48 + i * 22" width="60" height="10" rx="3" fill="var(--ink)" />
        </template>
        <template v-else>
          <rect x="28" :y="48 + i * 22" width="24" height="10" rx="3" fill="var(--ink)" />
          <rect x="64" :y="48 + i * 22" width="24" height="10" rx="3" fill="var(--ink)" />
        </template>
      </g>
      <text x="58" y="128" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--cinnabar)">{{ m.name }} · {{ m.nature }}</text>
      <text x="58" y="148" text-anchor="middle" font-size="11" fill="var(--muted)">{{ m.trait }}</text>
    </g>

    <line x1="118" y1="30" x2="118" y2="150" stroke="var(--line)" stroke-width="1.5" />

    <!-- 右侧自然景 -->
    <g transform="translate(130, 18)">
      <!-- 乾·天 -->
      <g v-if="props.trigram === 'qian'">
        <circle cx="120" cy="28" r="16" fill="var(--cinnabar)" opacity="0.85" />
        <path d="M12 58 Q32 42 52 56 Q72 38 94 54 Q114 42 136 56 Q148 50 156 58" stroke="var(--ink-2)" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M20 82 Q42 68 64 80 Q86 66 108 78 Q126 70 140 80" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M36 104 Q58 94 80 102 Q100 94 120 102" stroke="var(--line)" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <g stroke="var(--ink)" stroke-width="1.8" fill="none" stroke-linecap="round">
          <path d="M40 30 q6 -7 12 0 q6 -7 12 0" />
          <path d="M70 22 q5 -6 10 0 q5 -6 10 0" opacity="0.7" />
        </g>
      </g>
      <!-- 坤·地 -->
      <g v-else-if="props.trigram === 'kun'">
        <path d="M8 50 Q40 38 72 50 Q104 62 152 50" stroke="var(--ink-2)" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M8 72 Q40 60 72 72 Q104 84 152 72" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M8 94 Q40 84 72 94 Q104 104 152 94" stroke="var(--line)" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M40 48 L40 30 M40 38 L32 26 M40 38 L48 26" stroke="var(--good)" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <path d="M100 68 L100 52 M100 60 L93 50 M100 60 L107 50" stroke="var(--good)" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <circle cx="130" cy="36" r="4" fill="var(--good)" opacity="0.5" />
      </g>
      <!-- 震·雷 -->
      <g v-else-if="props.trigram === 'zhen'">
        <path d="M20 48 Q30 28 55 32 Q65 16 90 22 Q115 14 125 30 Q145 34 138 52 Q115 64 90 54 Q55 66 30 56 Q12 56 20 48 Z" fill="var(--ink-2)" opacity="0.75" />
        <path d="M88 56 L68 92 L82 92 L62 130 L100 86 L84 86 L100 56 Z" fill="var(--cinnabar)" />
        <circle cx="40" cy="100" r="2" fill="var(--muted)" />
        <circle cx="130" cy="110" r="2" fill="var(--muted)" />
      </g>
      <!-- 巽·风 -->
      <g v-else-if="props.trigram === 'xun'">
        <path d="M12 40 Q50 28 90 38 Q115 44 118 32 Q120 22 104 26" stroke="var(--ink-2)" stroke-width="2.8" fill="none" stroke-linecap="round" />
        <path d="M12 70 Q60 56 110 68 Q135 74 138 62" stroke="var(--muted)" stroke-width="2.4" fill="none" stroke-linecap="round" />
        <path d="M20 100 Q55 88 90 98 Q110 104 112 94" stroke="var(--line)" stroke-width="2.8" fill="none" stroke-linecap="round" />
        <path d="M130 48 q12 4 8 16" stroke="var(--cinnabar)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7" />
      </g>
      <!-- 坎·水 -->
      <g v-else-if="props.trigram === 'kan'">
        <path d="M10 42 Q24 28 38 42 Q52 56 66 42 Q80 28 94 42 Q108 56 122 42 Q136 28 150 42" stroke="var(--ink)" stroke-width="2.6" fill="none" stroke-linecap="round" />
        <path d="M10 72 Q24 58 38 72 Q52 86 66 72 Q80 58 94 72 Q108 86 122 72 Q136 58 150 72" stroke="var(--ink-2)" stroke-width="2.3" fill="none" stroke-linecap="round" />
        <path d="M10 102 Q24 88 38 102 Q52 116 66 102 Q80 88 94 102 Q108 116 122 102 Q136 88 150 102" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" />
        <circle cx="80" cy="55" r="3" fill="var(--paper)" stroke="var(--ink)" stroke-width="1" opacity="0.8" />
      </g>
      <!-- 离·火 -->
      <g v-else-if="props.trigram === 'li'">
        <path d="M80 18 Q96 42 106 62 Q116 88 102 106 Q90 122 80 122 Q70 122 58 106 Q44 88 54 62 Q64 42 80 18 Z" fill="var(--cinnabar)" opacity="0.88" />
        <path d="M80 52 Q90 66 94 80 Q98 96 80 104 Q62 96 66 80 Q70 66 80 52 Z" fill="var(--paper)" />
        <path d="M30 100 Q40 90 50 100" stroke="var(--muted)" stroke-width="1.5" fill="none" opacity="0.5" />
        <path d="M110 100 Q120 90 130 100" stroke="var(--muted)" stroke-width="1.5" fill="none" opacity="0.5" />
      </g>
      <!-- 艮·山 -->
      <g v-else-if="props.trigram === 'gen'">
        <path d="M8 118 L55 38 L90 118 Z" fill="var(--ink-2)" opacity="0.85" />
        <path d="M70 118 L110 55 L150 118 Z" fill="var(--muted)" opacity="0.8" />
        <path d="M48 52 L55 38 L64 54 L55 48 Z" fill="var(--paper)" opacity="0.9" />
        <path d="M8 118 Q40 108 80 118 Q120 128 150 118" stroke="var(--line)" stroke-width="2" fill="none" />
      </g>
      <!-- 兑·泽 -->
      <g v-else-if="props.trigram === 'dui'">
        <line x1="14" y1="70" x2="146" y2="70" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
        <path d="M48 70 A24 14 0 0 1 96 70" stroke="var(--muted)" stroke-width="2" fill="none" />
        <path d="M32 70 A40 24 0 0 1 112 70" stroke="var(--line)" stroke-width="2" fill="none" />
        <circle cx="80" cy="42" r="5" fill="var(--cinnabar)" opacity="0.8" />
        <path d="M20 90 Q45 84 80 90 Q115 96 140 90" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M40 108 Q60 104 80 108 Q100 112 120 108" stroke="var(--line)" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.7" />
      </g>
    </g>
  </svg>
</template>
