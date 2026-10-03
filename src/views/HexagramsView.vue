<script setup>
import { ref, computed } from 'vue'
import hexagrams from '../data/hexagrams.json'
import trigrams from '../data/trigrams.json'
import HexListBanner from '../components/art/HexListBanner.vue'
import PageLayout from '../components/PageLayout.vue'

const keyword = ref('')
const upperKey = ref(null)   // 选中的上卦 key（null = 不筛选）
const lowerKey = ref(null)

function toggleUpper(key) {
  upperKey.value = upperKey.value === key ? null : key
}
function toggleLower(key) {
  lowerKey.value = lowerKey.value === key ? null : key
}

const filtered = computed(() => {
  const kw = keyword.value.trim()
  return hexagrams.filter(h => {
    if (kw && !h.name.includes(kw) && !h.fullName.includes(kw)) return false
    if (upperKey.value && h.upper !== upperKey.value) return false
    if (lowerKey.value && h.lower !== lowerKey.value) return false
    return true
  })
})
</script>

<template>
  <PageLayout layout="rail">
    <h1 class="page-title">📜 64 卦百科</h1>
    <p class="page-sub">按卦名搜索或按上下卦筛选，点击任意卦查看详解</p>
    <HexListBanner class="list-banner" />

    <div class="filters card">
      <input v-model="keyword" class="search" type="text" placeholder="搜索卦名，如「乾」「水火既济」" />
      <div class="filter-row">
        <span class="filter-label">上卦</span>
        <button v-for="t in trigrams" :key="'u-' + t.key" class="ftag" :class="{ on: upperKey === t.key }" @click="toggleUpper(t.key)">
          {{ t.symbol }} {{ t.name }}
        </button>
      </div>
      <div class="filter-row">
        <span class="filter-label">下卦</span>
        <button v-for="t in trigrams" :key="'l-' + t.key" class="ftag" :class="{ on: lowerKey === t.key }" @click="toggleLower(t.key)">
          {{ t.symbol }} {{ t.name }}
        </button>
      </div>
    </div>

    <div v-if="filtered.length" class="grid">
      <RouterLink v-for="h in filtered" :key="h.id" :to="'/hexagrams/' + h.id" class="card hex-card">
        <span class="hx-symbol">{{ h.symbol }}</span>
        <b class="hx-name">{{ h.name }}</b>
        <span class="hx-full">{{ h.fullName }}</span>
        <span class="hx-order">第{{ h.id }}卦</span>
      </RouterLink>
    </div>
    <p v-else class="empty">没有符合条件的卦象，换个筛选试试～</p>
  </PageLayout>
</template>

<style scoped>
.list-banner { width: 100%; display: block; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 14px; }
.filters { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.search {
  width: 100%; padding: 8px 14px; font-size: 14px;
  border: 1px solid var(--line); border-radius: 20px;
  background: var(--paper-2); color: var(--ink); outline: none;
}
.search:focus { border-color: var(--cinnabar); background: #fff; }
.filter-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.filter-label { font-size: 12px; color: var(--muted); margin-right: 4px; }
.ftag {
  border: 1px solid var(--line); background: #fff; color: var(--ink-2);
  font-size: 12px; padding: 2px 10px; border-radius: 12px; cursor: pointer;
}
.ftag.on { background: var(--cinnabar); border-color: var(--cinnabar); color: #fff; }
.grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; }
.hex-card {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 12px 6px; text-align: center;
}
.hx-symbol { font-size: 30px; line-height: 1.2; }
.hx-name { font-size: 14px; }
.hx-full { font-size: 11px; color: var(--ink-2); }
.hx-order { font-size: 11px; color: var(--muted); }
.empty { text-align: center; color: var(--muted); font-size: 13px; padding: 30px 0; }
@media (max-width: 720px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
