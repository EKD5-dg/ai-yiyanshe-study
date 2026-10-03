<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchStats } from '../utils/api'
import InkBrushArt from '../components/art/InkBrushArt.vue'
import PageLayout from '../components/PageLayout.vue'

const loading = ref(true)
const error = ref('')
const total = ref(0)
const days = ref([])

const todayStr = new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)
const today = computed(() => days.value.find(d => d.date === todayStr)?.visitors || 0)
const maxDay = computed(() => Math.max(1, ...days.value.map(d => d.visitors)))

onMounted(async () => {
  try {
    const res = await fetchStats()
    total.value = res.total
    days.value = res.days
  } catch {
    error.value = '统计数据加载失败，请稍后刷新重试'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <PageLayout layout="rail">
    <h1 class="page-title">📊 访客统计</h1>
    <p class="page-sub">每台设备每天计 1 次 · 按北京时间划分自然日 · 近 30 天</p>
    <InkBrushArt class="brush" />

    <p v-if="loading" class="tip-text">加载中…</p>
    <p v-else-if="error" class="tip-text">{{ error }}</p>

    <template v-else>
      <div class="summary">
        <div class="card stat">
          <span class="num">{{ today }}</span>
          <span class="label">今日访客</span>
        </div>
        <div class="card stat">
          <span class="num">{{ total }}</span>
          <span class="label">累计访客</span>
        </div>
      </div>

      <div class="card chart" v-if="days.length">
        <div v-for="d in days" :key="d.date" class="row">
          <span class="date">{{ d.date.slice(5) }}</span>
          <div class="bar-track">
            <div class="bar" :style="{ width: (d.visitors / maxDay * 100) + '%' }"></div>
          </div>
          <span class="count">{{ d.visitors }}</span>
        </div>
      </div>
      <p v-else class="tip-text">还没有访客记录，把网站分享出去吧～</p>
    </template>
  </PageLayout>
</template>

<style scoped>
.brush { width: 110px; display: block; margin: 0 auto 12px; }
.summary { display: flex; gap: 12px; margin-bottom: 14px; }
.stat { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 20px; }
.num { font-size: 32px; font-weight: bold; color: var(--cinnabar); }
.label { font-size: 13px; color: var(--muted); }
.chart { display: flex; flex-direction: column; gap: 8px; }
.row { display: flex; align-items: center; gap: 10px; }
.date { width: 44px; font-size: 12px; color: var(--ink-2); }
.bar-track { flex: 1; height: 14px; background: var(--paper-2); border-radius: 7px; overflow: hidden; }
.bar { height: 100%; background: var(--cinnabar); border-radius: 7px; min-width: 2px; }
.count { width: 40px; text-align: right; font-size: 12px; color: var(--ink-2); }
.tip-text { color: var(--muted); font-size: 13px; text-align: center; padding: 30px 0; }
</style>
