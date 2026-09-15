<!-- 百科页顶部装饰：卷轴与卦爻 -->
<template>
  <svg viewBox="0 0 640 72" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="640" height="72" fill="var(--paper-2)" fill-opacity="0.45" />
    <!-- 左侧卷轴头 -->
    <rect x="24" y="20" width="70" height="32" rx="4" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.5" />
    <circle cx="24" cy="36" r="6" fill="var(--ink-2)" />
    <circle cx="94" cy="36" r="6" fill="var(--ink-2)" />
    <line x1="36" y1="30" x2="82" y2="30" stroke="var(--line)" stroke-width="2" />
    <line x1="36" y1="38" x2="74" y2="38" stroke="var(--line)" stroke-width="2" />
    <line x1="36" y1="46" x2="78" y2="46" stroke="var(--line)" stroke-width="2" />

    <!-- 中间卦爻装饰 -->
    <g fill="var(--ink)" opacity="0.55">
      <rect x="200" y="22" width="48" height="5" rx="1.5" />
      <rect x="200" y="32" width="48" height="5" rx="1.5" />
      <rect x="200" y="42" width="20" height="5" rx="1.5" />
      <rect x="228" y="42" width="20" height="5" rx="1.5" />
      <rect x="280" y="22" width="20" height="5" rx="1.5" />
      <rect x="308" y="22" width="20" height="5" rx="1.5" />
      <rect x="280" y="32" width="48" height="5" rx="1.5" />
      <rect x="280" y="42" width="48" height="5" rx="1.5" />
    </g>
    <text x="360" y="40" font-size="16" fill="var(--cinnabar)" opacity="0.7">64</text>

    <!-- 远山 -->
    <path d="M400 52 Q460 28 520 48 Q570 36 640 50 L640 72 L400 72 Z" fill="var(--ink-2)" opacity="0.2" />
    <path d="M440 60 Q500 44 560 58 Q600 50 640 60 L640 72 L440 72 Z" fill="var(--muted)" opacity="0.25" />
    <circle cx="580" cy="24" r="10" fill="var(--cinnabar)" opacity="0.55" />
  </svg>
</template>
