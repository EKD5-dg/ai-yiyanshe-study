<script setup>
import { computed } from 'vue'
import { useProgressStore, todayStr } from '../stores/progress'
import { dailyHexagram } from '../utils/daily'
import SyncPanel from './SyncPanel.vue'
import badges from '../data/badges.json'
import lessons from '../data/lessons.json'

const store = useProgressStore()
const daily = dailyHexagram()
const lessonPct = computed(() => Math.round(store.completedLessons.length / lessons.length * 100))
const todayDone = computed(() => store.streak.lastDate === todayStr())
</script>

<template>
  <aside class="rail">
    <section class="card daily">
      <div class="kicker">每 日 一 卦</div>
      <div class="glyph">{{ daily.symbol }}</div>
      <h2 class="name">{{ daily.fullName }}</h2>
      <p class="guaci">{{ daily.guaci }}</p>
      <p class="plain">{{ daily.plain }}</p>
      <RouterLink :to="'/hexagrams/' + daily.id" class="link">查看百科 →</RouterLink>
    </section>

    <section class="card status">
      <div class="row"><span>学习进度</span><b>{{ store.completedLessons.length }}/{{ lessons.length }}</b></div>
      <div class="track"><div class="fill" :style="{ width: lessonPct + '%' }"></div></div>
      <div class="row gap"><span>灵蕴值</span><b>⭐ {{ store.lingyun }}</b></div>
      <div class="row"><span>徽章</span><b>🏅 {{ store.badges.length }}/{{ badges.length }}</b></div>
      <div class="row"><span>连续打卡</span><b>🔥 {{ store.streak.days }} 天</b></div>
      <p class="task" :class="{ done: todayDone }">
        {{ todayDone ? '✅ 今日已打卡' : '🎯 今日任务：完成 1 关或读 1 条' }}
      </p>
    </section>

    <SyncPanel class="rail-sync" />
  </aside>
</template>

<style scoped>
.rail { display: flex; flex-direction: column; gap: 12px; }
@media (min-width: 1024px) { .rail { position: sticky; top: 76px; } }
.daily { text-align: center; background: linear-gradient(135deg, #fffdf7, #f3ecd9); }
.kicker { font-size: 11px; color: var(--cinnabar); letter-spacing: 4px; }
.glyph { font-size: 40px; line-height: 1.25; }
.name { font-size: 18px; letter-spacing: 2px; margin: 2px 0 6px; }
.guaci { font-size: 12px; color: var(--ink-2); line-height: 1.6; }
.plain { font-size: 12px; color: var(--muted); line-height: 1.65; margin-top: 6px; }
.link { display: inline-block; margin-top: 8px; font-size: 12px; color: var(--cinnabar); }
.status { font-size: 13px; }
.row { display: flex; justify-content: space-between; color: var(--ink-2); padding: 2px 0; }
.row.gap { margin-top: 8px; }
.task { font-size: 12px; color: var(--muted); margin-top: 10px; line-height: 1.5; }
.task.done { color: var(--good); }
.rail-sync { margin-top: 0; }
</style>
