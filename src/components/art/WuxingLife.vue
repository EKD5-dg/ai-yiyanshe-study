<!-- 五行对应四季·方位·颜色的生活示意图 -->
<template>
  <svg viewBox="0 0 320 220" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>五行与四季方位颜色</title>
    <rect x="1" y="1" width="318" height="218" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />

    <!-- 中心土 -->
    <circle cx="160" cy="110" r="28" fill="var(--ink-2)" />
    <text x="160" y="108" text-anchor="middle" font-size="14" fill="var(--paper)">土 · 中央</text>
    <text x="160" y="124" text-anchor="middle" font-size="10" fill="var(--paper)" opacity="0.85">黄 · 四季寄旺</text>

    <!-- 春·木·东 -->
    <g>
      <circle cx="70" cy="110" r="24" fill="var(--good)" />
      <text x="70" y="106" text-anchor="middle" font-size="13" fill="var(--paper)">木 · 春</text>
      <text x="70" y="120" text-anchor="middle" font-size="10" fill="var(--paper)" opacity="0.85">东 · 青绿</text>
      <text x="70" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">生发</text>
    </g>

    <!-- 夏·火·南 -->
    <g>
      <circle cx="160" cy="42" r="24" fill="var(--cinnabar)" />
      <text x="160" y="38" text-anchor="middle" font-size="13" fill="var(--paper)">火 · 夏</text>
      <text x="160" y="52" text-anchor="middle" font-size="10" fill="var(--paper)" opacity="0.85">南 · 红</text>
      <text x="160" y="78" text-anchor="middle" font-size="10" fill="var(--muted)">炎热向上</text>
    </g>

    <!-- 秋·金·西 -->
    <g>
      <circle cx="250" cy="110" r="24" fill="var(--muted)" />
      <text x="250" y="106" text-anchor="middle" font-size="13" fill="var(--paper)">金 · 秋</text>
      <text x="250" y="120" text-anchor="middle" font-size="10" fill="var(--paper)" opacity="0.85">西 · 白</text>
      <text x="250" y="148" text-anchor="middle" font-size="10" fill="var(--muted)">肃杀收敛</text>
    </g>

    <!-- 冬·水·北 -->
    <g>
      <circle cx="160" cy="178" r="24" fill="var(--ink)" />
      <text x="160" y="174" text-anchor="middle" font-size="13" fill="var(--paper)">水 · 冬</text>
      <text x="160" y="188" text-anchor="middle" font-size="10" fill="var(--paper)" opacity="0.85">北 · 黑</text>
    </g>

    <!-- 相生环箭头（春→夏→秋→冬→春） -->
    <g stroke="var(--ink-2)" stroke-width="1.6" fill="none" opacity="0.55">
      <path d="M92 92 Q115 70 138 58" marker-end="url(#wl-arrow)" />
      <path d="M182 58 Q215 72 228 92" marker-end="url(#wl-arrow)" />
      <path d="M228 132 Q205 155 182 168" marker-end="url(#wl-arrow)" />
      <path d="M138 168 Q115 150 92 132" marker-end="url(#wl-arrow)" />
    </g>
    <defs>
      <marker id="wl-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--ink-2)" />
      </marker>
    </defs>
  </svg>
</template>
