<!-- 卦际关系示意：错卦反色 / 综卦颠倒 / 互卦取中 -->
<script setup>
const props = defineProps({ type: { type: String, default: '' } })
const known = ['cuo', 'zong', 'hu']

// 示例用泰卦：下乾上坤 = 下三阳上三阴，自下而上 1,1,1,0,0,0
const base = [1, 1, 1, 0, 0, 0]
const cuo = base.map(v => (v ? 0 : 1))
// 综：上下颠倒
const zong = [...base].reverse()
// 互：取 2-4 为下卦、3-5 为上卦 → 下 1,1,0 上 1,0,0
const hu = [1, 1, 0, 1, 0, 0]

const labels = {
  cuo: { title: '错卦 · 镜像反色', note: '六爻阴阳全部互换', left: '泰', right: '否' },
  zong: { title: '综卦 · 上下颠倒', note: '整卦旋转 180°', left: '泰', right: '否' },
  hu: { title: '互卦 · 取中间四爻', note: '2-4 为下卦，3-5 为上卦', left: '泰', right: '互出之卦' }
}
const cfg = labels[props.type]
const rightBits = props.type === 'cuo' ? cuo : props.type === 'zong' ? zong : hu

function yOf(i) {
  // 自下而上：i=0 初爻在最底
  return 118 - i * 18
}
</script>

<template>
  <svg v-if="known.includes(props.type)" viewBox="0 0 300 180" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>{{ cfg.title }}</title>
    <rect x="1" y="1" width="298" height="178" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />
    <text x="150" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--ink)">{{ cfg.title }}</text>
    <text x="150" y="42" text-anchor="middle" font-size="11" fill="var(--muted)">{{ cfg.note }}</text>

    <!-- 左卦 -->
    <g>
      <text x="70" y="58" text-anchor="middle" font-size="12" fill="var(--ink-2)">{{ cfg.left }}</text>
      <g v-for="(v, i) in base" :key="'l' + i">
        <rect v-if="v" x="42" :y="yOf(i)" width="56" height="9" rx="3" fill="var(--ink)" />
        <template v-else>
          <rect x="42" :y="yOf(i)" width="22" height="9" rx="3" fill="var(--ink)" />
          <rect x="76" :y="yOf(i)" width="22" height="9" rx="3" fill="var(--ink)" />
        </template>
      </g>
    </g>

    <!-- 中间箭头 -->
    <g>
      <line x1="110" y1="95" x2="175" y2="95" stroke="var(--cinnabar)" stroke-width="2" marker-end="url(#rel-arrow)" />
      <text v-if="props.type === 'cuo'" x="142" y="88" text-anchor="middle" font-size="10" fill="var(--cinnabar)">反色</text>
      <text v-else-if="props.type === 'zong'" x="142" y="88" text-anchor="middle" font-size="10" fill="var(--cinnabar)">翻转</text>
      <text v-else x="142" y="88" text-anchor="middle" font-size="10" fill="var(--cinnabar)">取中</text>
    </g>
    <defs>
      <marker id="rel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--cinnabar)" />
      </marker>
    </defs>

    <!-- 右卦 -->
    <g>
      <text x="230" y="58" text-anchor="middle" font-size="12" fill="var(--cinnabar)">{{ cfg.right }}</text>
      <g v-for="(v, i) in rightBits" :key="'r' + i">
        <rect v-if="v" x="202" :y="yOf(i)" width="56" height="9" rx="3" fill="var(--ink)" />
        <template v-else>
          <rect x="202" :y="yOf(i)" width="22" height="9" rx="3" fill="var(--ink)" />
          <rect x="236" :y="yOf(i)" width="22" height="9" rx="3" fill="var(--ink)" />
        </template>
      </g>
    </g>

    <text x="150" y="168" text-anchor="middle" font-size="10" fill="var(--muted)">
      {{ props.type === 'hu' ? '初爻与上爻不参与' : '对照正反两面，理解更完整' }}
    </text>
  </svg>
</template>
