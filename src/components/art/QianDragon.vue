<!-- 乾卦六爻：一条龙的成长线 -->
<template>
  <svg viewBox="0 0 320 230" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>乾卦六爻成长线</title>
    <rect x="1" y="1" width="318" height="228" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />
    <text x="160" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--ink)">乾卦六爻 · 龙的成长线</text>

    <!-- 上九 亢龙 -->
    <g>
      <circle cx="36" cy="48" r="12" fill="var(--muted)" opacity="0.5" />
      <text x="36" y="52" text-anchor="middle" font-size="9" fill="var(--paper)">上</text>
      <text x="60" y="46" font-size="12" fill="var(--ink-2)">亢龙有悔</text>
      <text x="60" y="60" font-size="10" fill="var(--muted)">飞得过高 · 盛极而衰</text>
      <path d="M200 48 Q230 30 260 42 Q280 50 270 60" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6" />
    </g>

    <!-- 九五 飞龙 -->
    <g>
      <circle cx="36" cy="82" r="14" fill="var(--cinnabar)" />
      <text x="36" y="86" text-anchor="middle" font-size="10" fill="var(--paper)">五</text>
      <text x="60" y="78" font-size="12" font-weight="bold" fill="var(--cinnabar)">飞龙在天</text>
      <text x="60" y="94" font-size="10" fill="var(--muted)">全盛巅峰 · 利见大人</text>
      <path d="M190 88 Q220 60 255 72 Q285 82 300 70" stroke="var(--cinnabar)" stroke-width="2.4" fill="none" stroke-linecap="round" />
      <circle cx="292" cy="58" r="8" fill="var(--cinnabar)" opacity="0.25" />
    </g>

    <!-- 九四 或跃 -->
    <g>
      <circle cx="36" cy="116" r="12" fill="var(--ink-2)" />
      <text x="36" y="120" text-anchor="middle" font-size="9" fill="var(--paper)">四</text>
      <text x="60" y="114" font-size="12" fill="var(--ink)">或跃在渊</text>
      <text x="60" y="128" font-size="10" fill="var(--muted)">审时度势 · 进退有据</text>
      <path d="M200 120 Q230 100 260 118" stroke="var(--ink-2)" stroke-width="2" fill="none" stroke-dasharray="5 3" stroke-linecap="round" />
    </g>

    <!-- 九三 终日乾乾 -->
    <g>
      <circle cx="36" cy="150" r="12" fill="var(--ink-2)" />
      <text x="36" y="154" text-anchor="middle" font-size="9" fill="var(--paper)">三</text>
      <text x="60" y="148" font-size="12" fill="var(--ink)">终日乾乾</text>
      <text x="60" y="162" font-size="10" fill="var(--muted)">勤奋警惕 · 夕惕若厉</text>
      <path d="M200 155 L250 155" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" />
      <path d="M255 148 L270 155 L255 162" stroke="var(--ink-2)" stroke-width="1.6" fill="none" />
    </g>

    <!-- 九二 见龙在田 -->
    <g>
      <circle cx="36" cy="184" r="12" fill="var(--ink-2)" />
      <text x="36" y="188" text-anchor="middle" font-size="9" fill="var(--paper)">二</text>
      <text x="60" y="182" font-size="12" fill="var(--ink)">见龙在田</text>
      <text x="60" y="196" font-size="10" fill="var(--muted)">崭露头角 · 利见大人</text>
      <path d="M200 195 Q230 185 260 192" stroke="var(--good)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 初九 潜龙 -->
    <g>
      <circle cx="36" cy="212" r="12" fill="var(--muted)" />
      <text x="36" y="216" text-anchor="middle" font-size="9" fill="var(--paper)">初</text>
      <text x="60" y="210" font-size="12" fill="var(--ink-2)">潜龙勿用</text>
      <text x="60" y="222" font-size="10" fill="var(--muted)">蛰伏蓄力 · 厚积薄发</text>
      <path d="M200 215 Q220 222 250 212" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5" stroke-dasharray="3 3" />
    </g>

    <!-- 向上箭头 -->
    <path d="M18 48 L18 212" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="2 3" />
    <text x="10" y="130" font-size="9" fill="var(--muted)" transform="rotate(-90 10 130)">成长方向</text>
  </svg>
</template>
