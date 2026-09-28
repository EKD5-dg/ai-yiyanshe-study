<!-- 五行相生相克环：外圈实线箭头为相生（邻位），内部虚线箭头为相克（隔位） -->
<script setup>
import { useId } from 'vue'

// 每实例唯一的 defs id 前缀，避免同页多实例冲突
const uid = useId().replace(/[^a-zA-Z0-9]/g, '') || 'x'
const shengId = `wx-sheng-${uid}`
const keId = `wx-ke-${uid}`

// 五行节点按正五边形分布，颜色就近取自站内色板
const nodes = [
  { name: '木', x: 130, y: 35, color: 'var(--good)' },
  { name: '火', x: 211, y: 94, color: 'var(--cinnabar)' },
  { name: '土', x: 180, y: 189, color: 'var(--ink-2)' },
  { name: '金', x: 80, y: 189, color: 'var(--muted)' },
  { name: '水', x: 49, y: 94, color: 'var(--ink)' }
]
// 相生（邻位顺时针）与相克（隔位）连线端点：已按节点半径向内收缩
const sheng = [
  'M148 48 L188 78', 'M204 116 L188 163', 'M156 189 L104 189',
  'M72 167 L56 118', 'M67 80 L110 49'
]
const ke = [
  'M137 57 L171 163', 'M161 178 L70 111', 'M72 94 L186 94',
  'M192 108 L102 173', 'M87 166 L122 60'
]
</script>

<template>
  <svg viewBox="0 0 260 250" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>五行相生相克图</title>
    <defs>
      <marker :id="shengId" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--ink-2)" />
      </marker>
      <marker :id="keId" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--cinnabar)" />
      </marker>
    </defs>
    <path v-for="(d, i) in sheng" :key="'s' + i" :d="d" stroke="var(--ink-2)" stroke-width="2" fill="none" :marker-end="`url(#${shengId})`" />
    <path v-for="(d, i) in ke" :key="'k' + i" :d="d" stroke="var(--cinnabar)" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity="0.75" :marker-end="`url(#${keId})`" />
    <g v-for="n in nodes" :key="n.name">
      <circle :cx="n.x" :cy="n.y" r="20" :fill="n.color" />
      <text :x="n.x" :y="n.y + 5.5" text-anchor="middle" font-size="16" fill="var(--paper)">{{ n.name }}</text>
    </g>
    <g font-size="11">
      <line x1="52" y1="238" x2="80" y2="238" stroke="var(--ink-2)" stroke-width="2" :marker-end="`url(#${shengId})`" />
      <text x="88" y="242" fill="var(--ink-2)">相生（滋养）</text>
      <line x1="160" y1="238" x2="188" y2="238" stroke="var(--cinnabar)" stroke-width="1.5" stroke-dasharray="4 3" :marker-end="`url(#${keId})`" />
      <text x="196" y="242" fill="var(--cinnabar)">相克（制衡）</text>
    </g>
  </svg>
</template>
