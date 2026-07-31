<!-- 上下卦叠合示意：以「火天大有」为例展示两个八卦叠成六爻卦 -->
<script setup>
// 行数据均为显示顺序（自上而下），yin=true 画断开两段
const upper = [{ yin: false }, { yin: true }, { yin: false }]   // 离 ☲
const lower = [{ yin: false }, { yin: false }, { yin: false }]  // 乾 ☰
const hexRows = [...upper, ...lower]                             // 大有 ䷍
</script>

<template>
  <svg viewBox="0 0 300 175" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>上下卦叠合成六爻卦示意</title>
    <!-- 左：上卦 离 -->
    <g v-for="(r, i) in upper" :key="'u' + i">
      <rect v-if="!r.yin" x="25" :y="16 + i * 13" width="66" height="8" rx="3" fill="var(--ink)" />
      <template v-else>
        <rect x="25" :y="16 + i * 13" width="28" height="8" rx="3" fill="var(--ink)" />
        <rect x="63" :y="16 + i * 13" width="28" height="8" rx="3" fill="var(--ink)" />
      </template>
    </g>
    <text x="58" y="72" text-anchor="middle" font-size="11" fill="var(--ink-2)">上卦 ☲ 离（火）</text>
    <text x="58" y="93" text-anchor="middle" font-size="16" fill="var(--muted)">+</text>
    <!-- 左：下卦 乾 -->
    <g v-for="(r, i) in lower" :key="'l' + i">
      <rect x="25" :y="102 + i * 13" width="66" height="8" rx="3" fill="var(--ink)" />
    </g>
    <text x="58" y="158" text-anchor="middle" font-size="11" fill="var(--ink-2)">下卦 ☰ 乾（天）</text>
    <!-- 中：箭头 -->
    <text x="140" y="92" text-anchor="middle" font-size="22" fill="var(--muted)">→</text>
    <!-- 右：六爻卦 大有 -->
    <g v-for="(r, i) in hexRows" :key="'h' + i">
      <rect v-if="!r.yin" x="185" :y="24 + i * 16" width="88" height="9" rx="3" fill="var(--cinnabar)" />
      <template v-else>
        <rect x="185" :y="24 + i * 16" width="37" height="9" rx="3" fill="var(--cinnabar)" />
        <rect x="236" :y="24 + i * 16" width="37" height="9" rx="3" fill="var(--cinnabar)" />
      </template>
    </g>
    <text x="229" y="140" text-anchor="middle" font-size="11" fill="var(--ink-2)">六爻卦 ䷍ 火天大有</text>
    <text x="150" y="171" text-anchor="middle" font-size="11" fill="var(--muted)">上卦 + 下卦 = 六爻卦（读爻自下而上）</text>
  </svg>
</template>
