<!-- 成对卦意象：泰否互转 / 既济未济收尾 -->
<script setup>
const props = defineProps({ pair: { type: String, default: '' } })
const known = ['taipi', 'jiwei']

// 泰：下乾上坤 111000；否：000111
const tai = [1, 1, 1, 0, 0, 0]
const pi = [0, 0, 0, 1, 1, 1]
// 既济：下离上坎 101010；未济：010101
const ji = [1, 0, 1, 0, 1, 0]
const wei = [0, 1, 0, 1, 0, 1]

function yOf(i) { return 70 - i * 14 }

const cfg = {
  taipi: {
    title: '地天泰 ↔ 天地否',
    leftName: '泰 · 通达', rightName: '否 · 闭塞',
    leftBits: tai, rightBits: pi,
    leftNote: '天气上升·地气下降，二气相交',
    rightNote: '各归各位却互不相交',
    tip: '否极泰来 · 坏到极点会向好转化'
  },
  jiwei: {
    title: '水火既济 ↔ 火水未济',
    leftName: '既济 · 已成', rightName: '未济 · 未成',
    leftBits: ji, rightBits: wei,
    leftNote: '事情办成，但「初吉终乱」',
    rightNote: '小狐渡河，湿尾未竟',
    tip: '六十四卦以未济收尾 · 故事永远有新可能'
  }
}
const c = cfg[props.pair]
</script>

<template>
  <svg v-if="known.includes(props.pair)" viewBox="0 0 320 190" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>{{ c.title }}</title>
    <rect x="1" y="1" width="318" height="188" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />
    <text x="160" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--ink)">{{ c.title }}</text>

    <!-- 左 -->
    <g>
      <text x="80" y="48" text-anchor="middle" font-size="12" fill="var(--good)">{{ c.leftName }}</text>
      <g v-for="(v, i) in c.leftBits" :key="'L' + i">
        <rect v-if="v" x="52" :y="yOf(i) + 20" width="56" height="8" rx="3" fill="var(--ink)" />
        <template v-else>
          <rect x="52" :y="yOf(i) + 20" width="22" height="8" rx="3" fill="var(--ink)" />
          <rect x="86" :y="yOf(i) + 20" width="22" height="8" rx="3" fill="var(--ink)" />
        </template>
      </g>
      <text x="80" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">{{ c.leftNote }}</text>
    </g>

    <!-- 中间双向 -->
    <g>
      <line x1="120" y1="90" x2="190" y2="90" stroke="var(--cinnabar)" stroke-width="1.8" marker-end="url(#hp-a)" marker-start="url(#hp-b)" />
      <text x="155" y="82" text-anchor="middle" font-size="10" fill="var(--cinnabar)">互转</text>
    </g>
    <defs>
      <marker id="hp-a" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--cinnabar)" />
      </marker>
      <marker id="hp-b" markerWidth="7" markerHeight="7" refX="1" refY="3" orient="auto">
        <path d="M6 0 L0 3 L6 6 Z" fill="var(--cinnabar)" />
      </marker>
    </defs>

    <!-- 右 -->
    <g>
      <text x="240" y="48" text-anchor="middle" font-size="12" fill="var(--cinnabar)">{{ c.rightName }}</text>
      <g v-for="(v, i) in c.rightBits" :key="'R' + i">
        <rect v-if="v" x="212" :y="yOf(i) + 20" width="56" height="8" rx="3" fill="var(--ink)" />
        <template v-else>
          <rect x="212" :y="yOf(i) + 20" width="22" height="8" rx="3" fill="var(--ink)" />
          <rect x="246" :y="yOf(i) + 20" width="22" height="8" rx="3" fill="var(--ink)" />
        </template>
      </g>
      <text x="240" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">{{ c.rightNote }}</text>
    </g>

    <rect x="36" y="154" width="248" height="24" rx="10" fill="#fff" stroke="var(--line)" />
    <text x="160" y="170" text-anchor="middle" font-size="11" fill="var(--cinnabar)">{{ c.tip }}</text>
  </svg>
</template>
