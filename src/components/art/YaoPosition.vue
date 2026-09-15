<!-- 爻位示意：阳位/阴位、得中、九五之尊 -->
<template>
  <svg viewBox="0 0 300 220" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>当位与得中示意</title>
    <rect x="1" y="1" width="298" height="218" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />
    <text x="150" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--ink)">爻位：当位 · 得中 · 九五</text>

    <!-- 六爻位，自下而上 初→上 -->
    <g>
      <!-- 上爻 阴位 -->
      <g>
        <rect x="70" y="40" width="160" height="22" rx="6" fill="var(--paper)" stroke="var(--line)" />
        <text x="60" y="55" text-anchor="end" font-size="11" fill="var(--muted)">上</text>
        <text x="150" y="55" text-anchor="middle" font-size="11" fill="var(--muted)">阴位 · 极限</text>
      </g>
      <!-- 五爻 阳位·得中·九五 -->
      <g>
        <rect x="70" y="68" width="160" height="28" rx="8" fill="#fbf0f0" stroke="var(--cinnabar)" stroke-width="1.8" />
        <text x="60" y="86" text-anchor="end" font-size="12" font-weight="bold" fill="var(--cinnabar)">五</text>
        <text x="150" y="86" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--cinnabar)">阳位 · 上卦中 · 九五之尊</text>
      </g>
      <!-- 四爻 阴位 -->
      <g>
        <rect x="70" y="102" width="160" height="22" rx="6" fill="var(--paper)" stroke="var(--line)" />
        <text x="60" y="117" text-anchor="end" font-size="11" fill="var(--muted)">四</text>
        <text x="150" y="117" text-anchor="middle" font-size="11" fill="var(--muted)">阴位 · 过渡</text>
      </g>
      <!-- 三爻 阳位 -->
      <g>
        <rect x="70" y="130" width="160" height="22" rx="6" fill="var(--paper)" stroke="var(--line)" />
        <text x="60" y="145" text-anchor="end" font-size="11" fill="var(--muted)">三</text>
        <text x="150" y="145" text-anchor="middle" font-size="11" fill="var(--muted)">阳位 · 转折</text>
      </g>
      <!-- 二爻 阴位·得中 -->
      <g>
        <rect x="70" y="158" width="160" height="26" rx="8" fill="#f0f8f4" stroke="var(--good)" stroke-width="1.6" />
        <text x="60" y="175" text-anchor="end" font-size="12" font-weight="bold" fill="var(--good)">二</text>
        <text x="150" y="175" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--good)">阴位 · 下卦中 · 得中</text>
      </g>
      <!-- 初爻 阳位 -->
      <g>
        <rect x="70" y="190" width="160" height="22" rx="6" fill="var(--paper)" stroke="var(--line)" />
        <text x="60" y="205" text-anchor="end" font-size="11" fill="var(--muted)">初</text>
        <text x="150" y="205" text-anchor="middle" font-size="11" fill="var(--muted)">阳位 · 开端</text>
      </g>
    </g>

    <!-- 右侧图例 -->
    <g font-size="10">
      <rect x="246" y="50" width="12" height="12" rx="2" fill="#fbf0f0" stroke="var(--cinnabar)" />
      <text x="262" y="59" fill="var(--cinnabar)">既中且正</text>
      <rect x="246" y="70" width="12" height="12" rx="2" fill="#f0f8f4" stroke="var(--good)" />
      <text x="262" y="79" fill="var(--good)">得中</text>
    </g>
  </svg>
</template>
