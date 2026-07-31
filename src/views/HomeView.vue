<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import { dailyHexagram } from '../utils/daily'
import BadgeItem from '../components/BadgeItem.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import SyncPanel from '../components/SyncPanel.vue'
import InkHero from '../components/art/InkHero.vue'
import ModuleArt from '../components/art/ModuleArt.vue'
import CloudDivider from '../components/art/CloudDivider.vue'
import badges from '../data/badges.json'
import lessons from '../data/lessons.json'

const store = useProgressStore()
const daily = dailyHexagram()
const lessonPct = computed(() => Math.round(store.completedLessons.length / lessons.length * 100))

// 今日任务：任意学习行为即算当日打卡（与 store 的 streak 日期格式一致）
const now = new Date()
const todayDone = computed(() => store.streak.lastDate === `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)

const modules = [
  { to: '/lessons', art: 'lessons', title: '易经学堂', sub: () => `已学 ${store.completedLessons.length}/${lessons.length} 关` },
  { to: '/fengshui', art: 'fengshui', title: '风水小知识', sub: () => `已读 ${store.readFengshui.length} 条` },
  { to: '/divination', art: 'divination', title: '趣味起卦', sub: () => '摇一摇铜钱' },
  { to: '/quiz', art: 'quiz', title: '答题闯关', sub: () => `最高连击 ×${store.quizBest.combo}` }
]
</script>

<template>
  <div class="page">
    <InkHero class="hero" />

    <section class="daily card">
      <div class="daily-label">每 日 一 卦</div>
      <div class="daily-symbol">{{ daily.symbol }}</div>
      <h2>{{ daily.fullName }}</h2>
      <p class="guaci">{{ daily.guaci }}</p>
      <p class="plain">{{ daily.plain }}</p>
      <p class="fun">💡 {{ daily.fun }}</p>
      <RouterLink :to="'/hexagrams/' + daily.id" class="link">查看百科 →</RouterLink>
    </section>

    <section class="modules">
      <RouterLink v-for="m in modules" :key="m.to" :to="m.to" class="card module">
        <ModuleArt :kind="m.art" class="m-art" />
        <b>{{ m.title }}</b>
        <span class="m-sub">{{ m.sub() }}</span>
        <div v-if="m.to === '/lessons'" class="progress-track">
          <div class="progress-fill" :style="{ width: lessonPct + '%' }"></div>
        </div>
      </RouterLink>
    </section>

    <section class="card stats">
      <CloudDivider />
      <b>我的成就</b>
      <div class="stat-row">
        <span>⭐ 灵蕴值 {{ store.lingyun }}</span>
        <span>🏅 徽章 {{ store.badges.length }}/24</span>
        <span>🔥 连续 {{ store.streak.days }} 天</span>
      </div>
      <p class="daily-task" :class="{ done: todayDone }">
        {{ todayDone ? '✅ 今日任务已完成：学习打卡成功！' : '🎯 今日任务：完成 1 个关卡或读 1 条风水卡' }}
      </p>
      <div class="badge-wall">
        <BadgeItem v-for="b in badges" :key="b.id" :badge="b" :unlocked="store.badges.includes(b.id)" />
      </div>
    </section>

    <SyncPanel />

    <DisclaimerBar />
  </div>
</template>

<style scoped>
.hero { width: 100%; display: block; border-radius: 14px; margin-bottom: 14px; border: 1px solid var(--line); }
.daily { text-align: center; background: linear-gradient(135deg, #fffdf7, #f3ecd9); }
.daily-label { font-size: 12px; color: var(--cinnabar); letter-spacing: 4px; }
.daily-symbol { font-size: 46px; line-height: 1.3; }
.guaci { color: var(--ink-2); font-size: 14px; margin: 4px 0; }
.plain { font-size: 14px; max-width: 560px; margin: 6px auto; }
.fun { font-size: 13px; color: var(--cinnabar); margin-top: 6px; }
.link { display: inline-block; margin-top: 8px; font-size: 13px; color: var(--cinnabar); }
.modules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 14px; }
.module { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.m-art { width: 44px; height: 44px; }
.m-sub { font-size: 12px; color: var(--muted); }
.module .progress-track { width: 100%; }
.stats { margin-top: 14px; }
.stat-row { display: flex; gap: 18px; font-size: 13px; color: var(--ink-2); margin: 8px 0 12px; flex-wrap: wrap; }
.daily-task { font-size: 13px; color: var(--muted); margin-bottom: 12px; }
.daily-task.done { color: var(--good); }
.badge-wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(86px, 1fr)); gap: 8px; }
@media (max-width: 720px) {
  .modules { grid-template-columns: 1fr 1fr; }
}
</style>
