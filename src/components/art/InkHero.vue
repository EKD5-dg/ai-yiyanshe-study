<!-- 首页水墨横幅：远山、红日、飞鸟、云纹，纯装饰 -->
<template>
  <svg viewBox="0 0 800 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="140" fill="var(--paper-2)" fill-opacity="0.5" />
    <!-- 红日 -->
    <circle cx="590" cy="46" r="24" fill="var(--cinnabar)" opacity="0.85" />
    <!-- 三层远山（由远及近） -->
    <path d="M0 96 Q80 46 160 84 Q230 108 300 76 Q380 40 460 82 Q540 112 620 84 Q700 58 800 92 L800 140 L0 140 Z" fill="var(--muted)" opacity="0.25" />
    <path d="M0 112 Q100 70 200 100 Q290 124 380 96 Q470 66 560 100 Q660 128 800 104 L800 140 L0 140 Z" fill="var(--ink-2)" opacity="0.35" />
    <path d="M0 128 Q140 102 280 122 Q420 140 560 120 Q680 106 800 126 L800 140 L0 140 Z" fill="var(--ink-2)" opacity="0.5" />
    <!-- 飞鸟 -->
    <g stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M180 40 q7 -8 14 0 q7 -8 14 0" />
      <path d="M225 28 q6 -7 12 0 q6 -7 12 0" opacity="0.75" />
      <path d="M265 46 q5 -6 10 0 q5 -6 10 0" opacity="0.55" />
    </g>
    <!-- 云纹 -->
    <g stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.9">
      <path d="M480 34 Q495 20 512 30 Q530 16 546 30 Q558 24 566 34" />
      <path d="M496 46 Q512 36 530 44 Q544 38 554 46" />
    </g>
  </svg>
</template>
