<!-- 九宫方位图：展示命卦四吉方/四凶方（上北下南、左西右东） -->
<script setup>
const props = defineProps({
  lucky: { type: Array, default: () => [] },    // [{ kind, dir }]
  unlucky: { type: Array, default: () => [] }
})

// 方位 → 九宫格 [列, 行]（0 起）：上北下南、左西右东
const DIR_CELL = {
  西北: [0, 0], 北: [1, 0], 东北: [2, 0],
  西: [0, 1], 东: [2, 1],
  西南: [0, 2], 南: [1, 2], 东南: [2, 2]
}

function cells() {
  const map = {}
  for (const d of props.lucky) if (DIR_CELL[d.dir]) map[d.dir] = { kind: d.kind, good: true }
  for (const d of props.unlucky) if (DIR_CELL[d.dir]) map[d.dir] = { kind: d.kind, good: false }
  return Object.entries(map).map(([dir, v]) => ({ dir, ...v, x: DIR_CELL[dir][0] * 78 + 3, y: DIR_CELL[dir][1] * 78 + 3 }))
}
</script>

<template>
  <svg v-if="lucky.length || unlucky.length" viewBox="0 0 240 240" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>命卦九宫方位图</title>
    <g v-for="c in cells()" :key="c.dir">
      <rect :x="c.x" :y="c.y" width="72" height="72" rx="8" :fill="c.good ? 'var(--good)' : 'var(--cinnabar)'" fill-opacity="0.08" :stroke="c.good ? 'var(--good)' : 'var(--cinnabar)'" stroke-width="1" />
      <text :x="c.x + 36" :y="c.y + 30" text-anchor="middle" font-size="15" :fill="c.good ? 'var(--good)' : 'var(--cinnabar)'">{{ c.dir }}</text>
      <text :x="c.x + 36" :y="c.y + 52" text-anchor="middle" font-size="12" :fill="c.good ? 'var(--good)' : 'var(--cinnabar)'">{{ c.kind }}</text>
    </g>
    <!-- 中宫 -->
    <rect x="81" y="81" width="72" height="72" rx="8" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1" />
    <text x="117" y="112" text-anchor="middle" font-size="14" fill="var(--ink-2)">中</text>
    <text x="117" y="132" text-anchor="middle" font-size="10" fill="var(--muted)">上北下南</text>
  </svg>
</template>
