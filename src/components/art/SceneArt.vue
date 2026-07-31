<!-- 风水场景线描插画：横幅式，按 scene 名显示 6 种生活场景 -->
<script setup>
const props = defineProps({ scene: { type: String, default: '' } })
const known = ['客厅', '卧室', '书桌', '玄关', '厨房', '办公位']
</script>

<template>
  <svg v-if="known.includes(props.scene)" viewBox="0 0 320 96" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>{{ props.scene }}场景示意</title>
    <line x1="16" y1="84" x2="304" y2="84" stroke="var(--line)" stroke-width="2" stroke-linecap="round" />

    <!-- 客厅：沙发 + 茶几 + 挂画 -->
    <g v-if="props.scene === '客厅'" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linecap="round">
      <rect x="60" y="44" width="86" height="26" rx="6" fill="var(--paper-2)" />
      <rect x="52" y="38" width="14" height="38" rx="5" fill="var(--paper-2)" />
      <rect x="140" y="38" width="14" height="38" rx="5" fill="var(--paper-2)" />
      <line x1="60" y1="76" x2="60" y2="84" /><line x1="146" y1="76" x2="146" y2="84" />
      <rect x="196" y="58" width="64" height="6" rx="3" fill="var(--paper-2)" />
      <line x1="204" y1="64" x2="204" y2="84" /><line x1="252" y1="64" x2="252" y2="84" />
      <rect x="210" y="16" width="34" height="26" rx="2" />
      <path d="M214 36 L222 26 L228 32 L234 22 L240 34" stroke="var(--cinnabar)" stroke-width="1.5" />
    </g>

    <!-- 卧室：床 + 床头柜 + 月亮窗 -->
    <g v-else-if="props.scene === '卧室'" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linecap="round">
      <rect x="70" y="50" width="110" height="24" rx="4" fill="var(--paper-2)" />
      <rect x="62" y="30" width="14" height="44" rx="4" fill="var(--paper-2)" />
      <rect x="80" y="42" width="30" height="10" rx="5" fill="var(--paper)" />
      <line x1="74" y1="74" x2="74" y2="84" /><line x1="176" y1="74" x2="176" y2="84" />
      <rect x="200" y="56" width="28" height="22" rx="3" fill="var(--paper-2)" />
      <circle cx="214" cy="64" r="2" fill="var(--ink-2)" />
      <path d="M262 22 A13 13 0 1 0 274 40 A10 10 0 0 1 262 22 Z" fill="var(--cinnabar)" opacity="0.6" stroke="none" />
    </g>

    <!-- 书桌：桌 + 台灯 + 书堆 -->
    <g v-else-if="props.scene === '书桌'" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linecap="round">
      <rect x="70" y="52" width="180" height="8" rx="3" fill="var(--paper-2)" />
      <line x1="84" y1="60" x2="84" y2="84" /><line x1="236" y1="60" x2="236" y2="84" />
      <path d="M104 52 L104 34 Q104 26 116 28 L124 30" />
      <path d="M124 24 A9 9 0 0 1 130 38 L118 34 Z" fill="var(--cinnabar)" opacity="0.7" stroke="none" />
      <rect x="168" y="42" width="44" height="7" rx="2" fill="var(--paper-2)" />
      <rect x="172" y="34" width="36" height="7" rx="2" fill="var(--paper-2)" />
      <rect x="178" y="26" width="26" height="7" rx="2" fill="var(--paper-2)" />
    </g>

    <!-- 玄关：门 + 地垫 + 挂衣钩 -->
    <g v-else-if="props.scene === '玄关'" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linecap="round">
      <rect x="92" y="16" width="52" height="68" rx="3" fill="var(--paper-2)" />
      <circle cx="134" cy="52" r="3" fill="var(--ink-2)" stroke="none" />
      <ellipse cx="118" cy="88" rx="34" ry="5" fill="var(--paper-2)" stroke="var(--line)" />
      <line x1="196" y1="20" x2="196" y2="52" />
      <path d="M188 26 L204 26" /><path d="M190 34 Q196 42 202 34" />
      <path d="M196 52 Q186 62 192 74 Q196 80 200 74 Q206 62 196 52 Z" fill="var(--paper-2)" />
    </g>

    <!-- 厨房：灶台 + 锅 + 抽油烟机 -->
    <g v-else-if="props.scene === '厨房'" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linecap="round">
      <rect x="80" y="60" width="150" height="24" rx="3" fill="var(--paper-2)" />
      <path d="M120 52 A22 12 0 0 1 164 52 L166 60 L118 60 Z" fill="var(--paper-2)" />
      <line x1="128" y1="44" x2="126" y2="36" stroke="var(--muted)" />
      <line x1="142" y1="42" x2="142" y2="33" stroke="var(--muted)" />
      <line x1="156" y1="44" x2="158" y2="36" stroke="var(--muted)" />
      <rect x="108" y="12" width="68" height="12" rx="4" fill="var(--paper-2)" />
      <line x1="142" y1="24" x2="142" y2="30" />
      <circle cx="204" cy="70" r="6" stroke="var(--cinnabar)" />
    </g>

    <!-- 办公位：显示器 + 键盘 + 绿植 -->
    <g v-else-if="props.scene === '办公位'" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-linecap="round">
      <rect x="70" y="60" width="180" height="8" rx="3" fill="var(--paper-2)" />
      <line x1="84" y1="68" x2="84" y2="84" /><line x1="236" y1="68" x2="236" y2="84" />
      <rect x="110" y="22" width="58" height="34" rx="3" fill="var(--paper-2)" />
      <line x1="139" y1="56" x2="139" y2="60" />
      <rect x="182" y="50" width="42" height="8" rx="3" fill="var(--paper-2)" />
      <path d="M92 60 L92 50 M92 54 Q84 50 86 42 M92 54 Q100 50 98 42" stroke="var(--good)" />
      <path d="M86 60 A7 7 0 0 0 98 60 Z" fill="var(--paper-2)" />
    </g>
  </svg>
</template>
