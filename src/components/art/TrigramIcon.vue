<!-- 八卦自然意象小画：按 trigram key 显示 天/地/雷/风/水/火/山/泽 -->
<script setup>
const props = defineProps({ trigram: { type: String, default: '' } })
const known = ['qian', 'kun', 'zhen', 'xun', 'kan', 'li', 'gen', 'dui']
</script>

<template>
  <svg v-if="known.includes(props.trigram)" viewBox="0 0 96 96" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>八卦意象</title>
    <rect x="2" y="2" width="92" height="92" rx="14" fill="var(--paper-2)" stroke="var(--line)" stroke-width="1.5" />

    <!-- 乾·天：层云与红日 -->
    <g v-if="props.trigram === 'qian'">
      <circle cx="66" cy="30" r="11" fill="var(--cinnabar)" opacity="0.85" />
      <path d="M14 48 Q24 38 36 46 Q48 36 58 46 Q70 40 80 48" stroke="var(--ink-2)" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M20 62 Q32 53 44 61 Q56 52 68 61" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M28 75 Q40 68 52 75" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 坤·地：起伏地平线与小草 -->
    <g v-else-if="props.trigram === 'kun'">
      <path d="M12 58 Q30 50 48 58 Q66 66 84 58" stroke="var(--ink-2)" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M12 70 Q30 63 48 70 Q66 77 84 70" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M30 56 L30 46 M30 50 L25 44 M30 50 L35 44" stroke="var(--good)" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M62 64 L62 55 M62 59 L58 54 M62 59 L66 54" stroke="var(--good)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 震·雷：乌云与闪电 -->
    <g v-else-if="props.trigram === 'zhen'">
      <path d="M24 36 Q28 26 40 28 Q44 18 56 22 Q68 18 70 30 Q80 32 76 42 Q66 48 54 44 Q40 50 30 44 Q20 44 24 36 Z" fill="var(--ink-2)" opacity="0.8" />
      <path d="M52 46 L42 62 L50 62 L40 82 L58 58 L49 58 L58 46 Z" fill="var(--cinnabar)" />
    </g>

    <!-- 巽·风：三条卷曲风纹 -->
    <g v-else-if="props.trigram === 'xun'">
      <path d="M14 34 Q40 28 62 34 Q74 37 74 30 Q74 24 66 26" stroke="var(--ink-2)" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M14 52 Q44 46 70 52 Q82 55 82 48" stroke="var(--muted)" stroke-width="2.2" fill="none" stroke-linecap="round" />
      <path d="M20 70 Q42 64 60 70 Q70 73 70 67" stroke="var(--line)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </g>

    <!-- 坎·水：三层波浪 -->
    <g v-else-if="props.trigram === 'kan'">
      <path d="M14 40 Q22 32 30 40 Q38 48 46 40 Q54 32 62 40 Q70 48 78 40" stroke="var(--ink)" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M14 56 Q22 48 30 56 Q38 64 46 56 Q54 48 62 56 Q70 64 78 56" stroke="var(--ink-2)" stroke-width="2.2" fill="none" stroke-linecap="round" />
      <path d="M14 72 Q22 64 30 72 Q38 80 46 72 Q54 64 62 72 Q70 80 78 72" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 离·火：外焰与内焰 -->
    <g v-else-if="props.trigram === 'li'">
      <path d="M48 16 Q58 32 64 44 Q70 58 62 68 Q54 78 48 78 Q42 78 34 68 Q26 58 32 44 Q38 32 48 16 Z" fill="var(--cinnabar)" opacity="0.9" />
      <path d="M48 42 Q53 50 55 57 Q57 65 48 70 Q39 65 41 57 Q43 50 48 42 Z" fill="var(--paper)" />
    </g>

    <!-- 艮·山：两座山峰 -->
    <g v-else-if="props.trigram === 'gen'">
      <path d="M12 74 L38 34 L58 74 Z" fill="var(--ink-2)" opacity="0.85" />
      <path d="M42 74 L64 44 L84 74 Z" fill="var(--muted)" opacity="0.8" />
      <path d="M33 42 L38 34 L44 43 L38 40 Z" fill="var(--paper)" opacity="0.9" />
    </g>

    <!-- 兑·泽：水面与涟漪 -->
    <g v-else-if="props.trigram === 'dui'">
      <line x1="16" y1="62" x2="80" y2="62" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M34 62 A14 8 0 0 1 62 62" stroke="var(--muted)" stroke-width="2" fill="none" />
      <path d="M26 62 A22 13 0 0 1 70 62" stroke="var(--line)" stroke-width="2" fill="none" />
      <circle cx="48" cy="42" r="3" fill="var(--cinnabar)" opacity="0.8" />
      <path d="M22 72 Q34 68 48 72 Q62 76 74 72" stroke="var(--line)" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>
  </svg>
</template>
