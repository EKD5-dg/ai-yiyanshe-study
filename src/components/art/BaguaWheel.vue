<!-- 八卦圆盘图：八卦总览课程配图（简化均匀分布，乾起顺时针） -->
<script setup>
// 8 组：卦符 / 卦名 / 自然象，按圆周 45° 均匀排布
const items = [
  { sym: '☰', name: '乾·天', x: 120, y: 34 },
  { sym: '☱', name: '兑·泽', x: 181, y: 59 },
  { sym: '☲', name: '离·火', x: 206, y: 120 },
  { sym: '☳', name: '震·雷', x: 181, y: 181 },
  { sym: '☷', name: '坤·地', x: 120, y: 206 },
  { sym: '☶', name: '艮·山', x: 59, y: 181 },
  { sym: '☵', name: '坎·水', x: 34, y: 120 },
  { sym: '☴', name: '巽·风', x: 59, y: 59 }
]
</script>

<template>
  <svg viewBox="0 0 240 240" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>八卦圆盘图</title>
    <circle cx="120" cy="120" r="114" fill="var(--paper-2)" fill-opacity="0.5" stroke="var(--line)" stroke-width="1.5" />
    <circle cx="120" cy="120" r="62" fill="none" stroke="var(--line)" stroke-width="1" />
    <!-- 中心小太极 -->
    <circle cx="120" cy="120" r="28" fill="var(--ink)" />
    <path d="M120 92 A28 28 0 0 1 120 148 A14 14 0 0 1 120 120 A14 14 0 0 0 120 92 Z" fill="var(--paper)" />
    <circle cx="120" cy="106" r="3.2" fill="var(--ink)" />
    <circle cx="120" cy="134" r="3.2" fill="var(--paper)" />
    <!-- 八方卦符与卦名 -->
    <g v-for="it in items" :key="it.name" text-anchor="middle">
      <text :x="it.x" :y="it.y" font-size="17" fill="var(--ink)">{{ it.sym }}</text>
      <text :x="it.x" :y="it.y + 15" font-size="10" fill="var(--ink-2)">{{ it.name }}</text>
    </g>
  </svg>
</template>
