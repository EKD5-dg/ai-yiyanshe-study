<!-- 风水场景插画：横幅式扁平风，按 scene 名显示 6 种生活场景 -->
<script setup>
const props = defineProps({ scene: { type: String, default: '' } })
const known = ['客厅', '卧室', '书桌', '玄关', '厨房', '办公位']
</script>

<template>
  <svg v-if="known.includes(props.scene)" viewBox="0 0 320 110" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>{{ props.scene }}场景示意</title>
    <!-- 背景暖色衬底 + 地面 -->
    <rect x="6" y="6" width="308" height="98" rx="12" fill="var(--paper-2)" fill-opacity="0.55" />
    <line x1="18" y1="94" x2="302" y2="94" stroke="var(--line)" stroke-width="2" stroke-linecap="round" />

    <!-- 客厅：挂画 + 沙发 + 地毯 + 茶几绿植 + 落地灯 -->
    <g v-if="props.scene === '客厅'">
      <ellipse cx="118" cy="97" rx="86" ry="5" fill="var(--ink-2)" opacity="0.1" />
      <rect x="196" y="16" width="54" height="38" rx="3" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="2" />
      <path d="M200 48 L214 30 L224 42 L236 24 L246 46" fill="var(--ink-2)" opacity="0.3" />
      <circle cx="238" cy="26" r="4.5" fill="var(--cinnabar)" opacity="0.85" />
      <rect x="44" y="36" width="112" height="16" rx="8" fill="var(--muted)" opacity="0.45" />
      <rect x="44" y="50" width="112" height="26" rx="5" fill="var(--muted)" opacity="0.3" />
      <rect x="34" y="44" width="14" height="38" rx="7" fill="var(--muted)" opacity="0.55" />
      <rect x="152" y="44" width="14" height="38" rx="7" fill="var(--muted)" opacity="0.55" />
      <rect x="52" y="54" width="46" height="14" rx="5" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.5" />
      <rect x="102" y="54" width="46" height="14" rx="5" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.5" />
      <rect x="60" y="40" width="26" height="11" rx="5" fill="var(--cinnabar)" opacity="0.5" />
      <line x1="44" y1="82" x2="44" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <line x1="156" y1="82" x2="156" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <rect x="192" y="66" width="66" height="7" rx="3.5" fill="var(--muted)" opacity="0.55" />
      <line x1="200" y1="73" x2="200" y2="93" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <line x1="250" y1="73" x2="250" y2="93" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M219 66 L221 58 L229 58 L231 66 Z" fill="var(--cinnabar)" opacity="0.6" />
      <path d="M225 58 L225 50 M225 53 Q219 50 220 44 M225 53 Q231 50 230 44" stroke="var(--good)" stroke-width="2" fill="none" stroke-linecap="round" />
      <line x1="287" y1="34" x2="287" y2="93" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M276 34 L298 34 L293 18 L281 18 Z" fill="var(--cinnabar)" opacity="0.8" />
    </g>

    <!-- 卧室：床 + 枕头被子 + 床头柜台灯 + 月亮窗 -->
    <g v-else-if="props.scene === '卧室'">
      <ellipse cx="120" cy="97" rx="90" ry="5" fill="var(--ink-2)" opacity="0.1" />
      <rect x="46" y="26" width="15" height="58" rx="6" fill="var(--muted)" opacity="0.6" />
      <rect x="58" y="56" width="126" height="26" rx="4" fill="var(--muted)" opacity="0.3" />
      <path d="M58 56 L184 56 L184 70 Q120 78 58 70 Z" fill="var(--cinnabar)" opacity="0.35" />
      <path d="M58 68 Q120 76 184 68" stroke="var(--cinnabar)" stroke-width="1.5" fill="none" opacity="0.5" />
      <rect x="66" y="42" width="38" height="14" rx="7" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.8" />
      <line x1="62" y1="82" x2="62" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <line x1="180" y1="82" x2="180" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <rect x="204" y="60" width="34" height="32" rx="3" fill="var(--muted)" opacity="0.4" />
      <line x1="208" y1="74" x2="234" y2="74" stroke="var(--ink-2)" stroke-width="1.5" />
      <circle cx="221" cy="68" r="2" fill="var(--ink-2)" />
      <line x1="221" y1="52" x2="221" y2="60" stroke="var(--ink-2)" stroke-width="2" />
      <path d="M212 52 L230 52 L226 40 L216 40 Z" fill="var(--cinnabar)" opacity="0.75" />
      <rect x="254" y="14" width="48" height="38" rx="4" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="2" />
      <path d="M284 20 A11 11 0 1 0 293 36 A8.5 8.5 0 0 1 284 20 Z" fill="var(--muted)" opacity="0.8" />
      <circle cx="266" cy="24" r="1.5" fill="var(--muted)" />
      <circle cx="272" cy="42" r="1.2" fill="var(--muted)" />
    </g>

    <!-- 书桌：台灯 + 书堆 + 笔筒 + 座椅 -->
    <g v-else-if="props.scene === '书桌'">
      <ellipse cx="160" cy="97" rx="100" ry="5" fill="var(--ink-2)" opacity="0.1" />
      <rect x="64" y="56" width="176" height="9" rx="4" fill="var(--muted)" opacity="0.55" />
      <line x1="78" y1="65" x2="78" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <rect x="196" y="65" width="36" height="28" rx="3" fill="var(--muted)" opacity="0.35" />
      <line x1="202" y1="76" x2="226" y2="76" stroke="var(--ink-2)" stroke-width="1.5" />
      <circle cx="214" cy="82" r="1.8" fill="var(--ink-2)" />
      <path d="M96 56 L96 36 Q96 28 108 30 L116 33" stroke="var(--ink-2)" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M114 26 A10 10 0 0 1 122 41 L108 36 Z" fill="var(--cinnabar)" opacity="0.8" />
      <g stroke="var(--cinnabar)" stroke-width="1.2" opacity="0.5" stroke-linecap="round">
        <line x1="122" y1="44" x2="126" y2="50" /><line x1="116" y1="46" x2="118" y2="52" />
      </g>
      <rect x="142" y="48" width="40" height="8" rx="2" fill="var(--good)" opacity="0.45" />
      <rect x="146" y="40" width="34" height="8" rx="2" fill="var(--cinnabar)" opacity="0.45" />
      <rect x="150" y="32" width="28" height="8" rx="2" fill="var(--muted)" opacity="0.6" />
      <rect x="252" y="40" width="14" height="16" rx="2" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.8" />
      <line x1="257" y1="40" x2="255" y2="30" stroke="var(--ink-2)" stroke-width="1.6" stroke-linecap="round" />
      <line x1="261" y1="40" x2="262" y2="29" stroke="var(--cinnabar)" stroke-width="1.6" stroke-linecap="round" />
      <rect x="26" y="50" width="10" height="36" rx="4" fill="var(--muted)" opacity="0.5" />
      <rect x="22" y="66" width="30" height="8" rx="4" fill="var(--muted)" opacity="0.35" />
      <line x1="34" y1="74" x2="34" y2="93" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- 玄关：门 + 地垫 + 衣帽架 + 鞋与绿植 -->
    <g v-else-if="props.scene === '玄关'">
      <ellipse cx="120" cy="97" rx="80" ry="5" fill="var(--ink-2)" opacity="0.1" />
      <rect x="82" y="14" width="58" height="80" rx="3" fill="var(--muted)" opacity="0.3" />
      <rect x="90" y="22" width="42" height="28" rx="2" fill="none" stroke="var(--ink-2)" stroke-width="1.6" />
      <rect x="90" y="56" width="42" height="30" rx="2" fill="none" stroke="var(--ink-2)" stroke-width="1.6" />
      <circle cx="133" cy="54" r="3" fill="var(--cinnabar)" />
      <rect x="76" y="94" width="70" height="7" rx="3.5" fill="var(--cinnabar)" opacity="0.4" />
      <line x1="196" y1="18" x2="196" y2="93" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <line x1="184" y1="24" x2="208" y2="24" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" />
      <circle cx="196" cy="16" r="3" fill="none" stroke="var(--ink-2)" stroke-width="1.6" />
      <path d="M186 30 Q182 48 188 62 Q196 68 204 62 Q210 48 206 30 Q196 34 186 30 Z" fill="var(--cinnabar)" opacity="0.45" />
      <path d="M182 26 Q196 34 210 26" stroke="var(--ink-2)" stroke-width="1.6" fill="none" />
      <ellipse cx="160" cy="90" rx="9" ry="4" fill="var(--ink-2)" opacity="0.5" />
      <ellipse cx="172" cy="90" rx="9" ry="4" fill="var(--ink-2)" opacity="0.35" />
      <path d="M252 62 L256 52 L268 52 L272 62 Z" fill="var(--cinnabar)" opacity="0.55" />
      <path d="M262 52 L262 36 M262 42 Q252 38 253 28 M262 42 Q272 38 271 28 M262 47 Q255 46 254 40" stroke="var(--good)" stroke-width="2.2" fill="none" stroke-linecap="round" />
    </g>

    <!-- 厨房：抽油烟机 + 灶台锅具 + 橱柜 + 置物架 -->
    <g v-else-if="props.scene === '厨房'">
      <ellipse cx="150" cy="97" rx="95" ry="5" fill="var(--ink-2)" opacity="0.1" />
      <rect x="60" y="60" width="160" height="34" rx="3" fill="var(--muted)" opacity="0.35" />
      <line x1="140" y1="60" x2="140" y2="94" stroke="var(--ink-2)" stroke-width="1.6" />
      <circle cx="130" cy="76" r="2" fill="var(--ink-2)" />
      <circle cx="150" cy="76" r="2" fill="var(--ink-2)" />
      <rect x="88" y="54" width="104" height="6" rx="3" fill="var(--muted)" opacity="0.65" />
      <path d="M110 52 A20 12 0 0 1 150 52 L152 54 L108 54 Z" fill="var(--ink-2)" opacity="0.6" />
      <path d="M108 44 A22 8 0 0 1 152 44 L150 48 L110 48 Z" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.6" />
      <circle cx="130" cy="42" r="2.5" fill="var(--ink-2)" />
      <g stroke="var(--muted)" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.9">
        <path d="M120 34 Q118 28 122 22" /><path d="M130 34 Q132 27 128 20" /><path d="M140 34 Q138 28 142 22" />
      </g>
      <rect x="98" y="8" width="64" height="13" rx="5" fill="var(--muted)" opacity="0.6" />
      <rect x="124" y="2" width="12" height="8" fill="var(--muted)" opacity="0.4" />
      <line x1="236" y1="34" x2="292" y2="34" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" />
      <rect x="244" y="20" width="12" height="14" rx="2" fill="var(--cinnabar)" opacity="0.5" />
      <rect x="262" y="16" width="12" height="18" rx="2" fill="var(--good)" opacity="0.4" />
      <path d="M196 54 Q206 50 208 42 L212 44 Q210 52 200 57 Z" fill="var(--cinnabar)" opacity="0.6" />
    </g>

    <!-- 办公位：显示器 + 键盘鼠标 + 转椅 + 绿植水杯 -->
    <g v-else-if="props.scene === '办公位'">
      <ellipse cx="170" cy="97" rx="100" ry="5" fill="var(--ink-2)" opacity="0.1" />
      <rect x="88" y="60" width="180" height="8" rx="4" fill="var(--muted)" opacity="0.55" />
      <line x1="102" y1="68" x2="102" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <line x1="254" y1="68" x2="254" y2="93" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round" />
      <rect x="118" y="18" width="70" height="40" rx="4" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="2" />
      <path d="M126 48 L140 34 L150 42 L162 26 L178 44" stroke="var(--cinnabar)" stroke-width="2" fill="none" stroke-linecap="round" />
      <line x1="153" y1="58" x2="153" y2="60" stroke="var(--ink-2)" stroke-width="4" />
      <rect x="200" y="52" width="44" height="8" rx="3" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.6" />
      <ellipse cx="256" cy="57" rx="5" ry="3.5" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.4" />
      <path d="M276 62 L279 52 L291 52 L294 62 Z" fill="var(--cinnabar)" opacity="0.55" />
      <path d="M285 52 L285 40 M285 45 Q277 42 278 34 M285 45 Q293 42 292 34" stroke="var(--good)" stroke-width="2.2" fill="none" stroke-linecap="round" />
      <rect x="34" y="34" width="13" height="34" rx="6" fill="var(--muted)" opacity="0.6" />
      <rect x="30" y="62" width="34" height="9" rx="4.5" fill="var(--muted)" opacity="0.4" />
      <line x1="46" y1="71" x2="46" y2="84" stroke="var(--ink-2)" stroke-width="2.5" />
      <line x1="34" y1="90" x2="58" y2="90" stroke="var(--ink-2)" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="36" cy="93" r="2.5" fill="var(--ink-2)" />
      <circle cx="56" cy="93" r="2.5" fill="var(--ink-2)" />
      <rect x="218" y="42" width="9" height="10" rx="2" fill="var(--cinnabar)" opacity="0.6" />
    </g>
  </svg>
</template>
