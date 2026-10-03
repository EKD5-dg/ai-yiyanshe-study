<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import hexagrams from '../data/hexagrams.json'
import trigrams from '../data/trigrams.json'
import yaoci from '../data/yaoci.json'
import { bitsOf, cuogua, zonggua, hugua } from '../utils/relations'
import HexagramFigure from '../components/HexagramFigure.vue'
import TrigramIcon from '../components/art/TrigramIcon.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import PageLayout from '../components/PageLayout.vue'

const route = useRoute()
const router = useRouter()

const id = computed(() => Number(route.params.id))
const valid = computed(() => Number.isInteger(id.value) && id.value >= 1 && id.value <= 64)

// 非法 id 重定向回列表页（校验 route.name 避免离开页面时 params 清空误触发）
watch(valid, ok => {
  if (!ok && route.name === 'hexagram-detail') router.replace('/hexagrams')
}, { immediate: true })

const trigramByKey = new Map(trigrams.map(t => [t.key, t]))

const hex = computed(() => (valid.value ? hexagrams[id.value - 1] : null))
const entry = computed(() => (valid.value ? yaoci[id.value - 1] : null))
const bits = computed(() => bitsOf(hex.value))
const upperT = computed(() => trigramByKey.get(hex.value.upper))
const lowerT = computed(() => trigramByKey.get(hex.value.lower))

// 卦际关系（实时计算）
const relations = computed(() => {
  const zong = zonggua(id.value)
  return [
    { label: '错卦', hex: cuogua(id.value), note: '六爻阴阳全反' },
    { label: '综卦', hex: zong, note: '上下颠倒', selfZong: zong.id === id.value },
    { label: '互卦', hex: hugua(id.value), note: '2-4爻为下、3-5爻为上' }
  ]
})
</script>

<template>
  <PageLayout v-if="hex" layout="wide">
    <RouterLink to="/hexagrams" class="back">← 返回百科</RouterLink>

    <section class="card head">
      <HexagramFigure :bits="bits" />
      <div class="head-info">
        <div class="head-symbol">{{ hex.symbol }}</div>
        <h1 class="head-name">{{ hex.fullName }}</h1>
        <p class="head-meta">第 {{ hex.id }} 卦 · 上{{ upperT.name }}（{{ upperT.nature }}）下{{ lowerT.name }}（{{ lowerT.nature }}）</p>
        <div class="trigram-icons">
          <span class="ti"><TrigramIcon :trigram="hex.upper" /><i>上卦·{{ upperT.name }}（{{ upperT.nature }}）</i></span>
          <span class="ti"><TrigramIcon :trigram="hex.lower" /><i>下卦·{{ lowerT.name }}（{{ lowerT.nature }}）</i></span>
        </div>
      </div>
    </section>

    <section class="card block">
      <h3>📖 卦辞</h3>
      <p class="original">{{ hex.guaci }}</p>
      <p class="plain">{{ hex.plain }}</p>
      <p class="fun">💡 {{ hex.fun }}</p>
    </section>

    <section class="card block">
      <h3>🏔 象辞（大象传）</h3>
      <p class="original">{{ entry.xiang.text }}</p>
      <p class="plain">{{ entry.xiang.plain }}</p>
    </section>

    <section class="block">
      <h3 class="yao-title">☯ 六爻详解（自初爻向上）</h3>
      <div class="yao-list">
        <div v-for="y in entry.yaoci" :key="y.name" class="card yao-card">
          <b class="yao-name">{{ y.name }}</b>
          <p class="original">{{ y.text }}</p>
          <p class="plain">{{ y.plain }}</p>
        </div>
        <div v-if="entry.extra" class="card yao-card extra">
          <b class="yao-name">{{ entry.extra.name }}</b>
          <p class="original">{{ entry.extra.text }}</p>
          <p class="plain">{{ entry.extra.plain }}</p>
        </div>
      </div>
    </section>

    <section class="block">
      <h3 class="yao-title">🔗 卦际关系</h3>
      <div class="rel-grid">
        <div v-for="r in relations" :key="r.label" class="card rel-card">
          <span class="rel-label">{{ r.label }}</span>
          <span v-if="r.selfZong" class="rel-self">
            <span class="rel-symbol">{{ r.hex.symbol }}</span>
            <b>{{ r.hex.name }}</b>
            <span class="tag tag-good">自综</span>
          </span>
          <RouterLink v-else :to="'/hexagrams/' + r.hex.id" class="rel-link">
            <span class="rel-symbol">{{ r.hex.symbol }}</span>
            <b>{{ r.hex.name }}</b>
          </RouterLink>
          <span class="rel-note">{{ r.note }}</span>
        </div>
      </div>
    </section>

    <nav class="pager">
      <RouterLink v-if="id > 1" :to="'/hexagrams/' + (id - 1)" class="btn btn-ghost">← 第{{ id - 1 }}卦 {{ hexagrams[id - 2].name }}</RouterLink>
      <span v-else></span>
      <RouterLink v-if="id < 64" :to="'/hexagrams/' + (id + 1)" class="btn btn-ghost">第{{ id + 1 }}卦 {{ hexagrams[id].name }} →</RouterLink>
    </nav>

    <DisclaimerBar />
  </PageLayout>
</template>

<style scoped>
.back { display: inline-block; font-size: 13px; color: var(--muted); margin-bottom: 12px; }
.head { display: flex; align-items: center; gap: 26px; padding: 24px; }
.head-symbol { font-size: 44px; line-height: 1.2; }
.head-name { font-size: 22px; letter-spacing: 2px; margin: 2px 0; }
.head-meta { font-size: 13px; color: var(--muted); }
.trigram-icons { display: flex; gap: 14px; margin-top: 10px; }
.ti { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.ti svg { width: 52px; height: 52px; }
.ti i { font-style: normal; font-size: 11px; color: var(--muted); }
.block { margin-top: 14px; }
.block h3 { margin-bottom: 6px; }
.original { color: var(--ink-2); font-size: 14px; margin: 4px 0; }
.plain { font-size: 14px; }
.fun { font-size: 13px; color: var(--cinnabar); margin-top: 6px; }
.yao-title { margin-bottom: 8px; }
.yao-list { display: grid; gap: 10px; }
.yao-card .yao-name { color: var(--cinnabar); }
.yao-card.extra { background: var(--paper-2); }
.rel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.rel-card { display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
.rel-label { font-size: 12px; color: var(--muted); }
.rel-link, .rel-self { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.rel-link:hover b { color: var(--cinnabar); }
.rel-symbol { font-size: 30px; line-height: 1.2; }
.rel-note { font-size: 11px; color: var(--muted); }
.pager { display: flex; justify-content: space-between; margin-top: 18px; }
.pager .btn { font-size: 13px; padding: 6px 16px; }
@media (max-width: 720px) {
  .head { gap: 16px; padding: 18px; }
  .rel-grid { grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
}
</style>
