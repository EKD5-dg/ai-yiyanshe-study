<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import FlipCard from '../components/FlipCard.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import MingguaCalc from '../components/MingguaCalc.vue'
import SceneArt from '../components/art/SceneArt.vue'
import CloudDivider from '../components/art/CloudDivider.vue'
import TopicIcon from '../components/art/TopicIcon.vue'
import fengshui from '../data/fengshui.json'
import topics from '../data/fengshui-topics.json'

const topicIconKind = { t1: 'minggua', t2: 'feixing', t3: 'luopan' }

const store = useProgressStore()
const scenes = ['客厅', '卧室', '书桌', '玄关', '厨房', '办公位']
const active = ref('客厅')
const cards = computed(() => fengshui.filter(f => f.scene === active.value))
const topic = ref(null)        // 当前专题（null = 翻卡列表态）
</script>

<template>
  <div class="page">
    <!-- 列表态：翻卡 + 进阶专题入口 -->
    <template v-if="!topic">
      <h1 class="page-title">🏮 风水小知识</h1>
      <p class="page-sub">点卡片翻面看原理 · 已读 {{ store.readFengshui.length }}/{{ fengshui.length }}</p>

      <div class="tabs">
        <button v-for="s in scenes" :key="s" class="tab" :class="{ on: active === s }" @click="active = s">{{ s }}</button>
      </div>

      <SceneArt :scene="active" class="scene-art" />

      <div class="grid">
        <FlipCard v-for="c in cards" :key="c.id" @open="store.readCard(c.id)">
          <template #front>
            <span class="tag" :class="c.kind === '宜' ? 'tag-good' : 'tag-bad'">{{ c.kind }}</span>
            <p class="summary">{{ c.summary }}</p>
            <span v-if="store.readFengshui.includes(c.id)" class="read">✓ 已读</span>
            <span class="hint">点击翻面 ↻</span>
          </template>
          <template #back>{{ c.detail }}</template>
        </FlipCard>
      </div>

      <CloudDivider style="margin-top: 20px" />
      <h2 class="section-title">📚 进阶专题</h2>
      <div class="topics">
        <button v-for="t in topics" :key="t.id" class="card topic-card" @click="topic = t">
          <TopicIcon :kind="topicIconKind[t.id]" class="topic-art" />
          <span class="topic-title">{{ t.title }}</span>
          <span class="topic-intro">{{ t.intro }}</span>
        </button>
      </div>
    </template>

    <!-- 专题态：纯阅读，不计已读/徽章 -->
    <template v-else>
      <button class="btn btn-ghost" @click="topic = null">← 返回</button>
      <h1 class="page-title topic-head">{{ topic.icon }} {{ topic.title }}</h1>
      <p class="notice">☯ 以下内容为传统文化科普，仅供学习娱乐</p>
      <template v-for="(sec, i) in topic.sections" :key="i">
        <h3 class="sec-heading">{{ sec.heading }}</h3>
        <p class="sec-text">{{ sec.text }}</p>
        <MingguaCalc v-if="topic.interactive === 'minggua' && i === 0" />
      </template>
    </template>

    <DisclaimerBar />
  </div>
</template>

<style scoped>
.tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.tab {
  border: 1px solid var(--line); background: #fff; padding: 5px 16px;
  border-radius: 18px; cursor: pointer; font-size: 13px; color: var(--ink-2);
}
.tab.on { background: var(--cinnabar); border-color: var(--cinnabar); color: #fff; }
.scene-art { width: 100%; max-width: 440px; display: block; margin: 0 auto 12px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.summary { font-size: 15px; margin-top: 8px; }
.read { position: absolute; top: 10px; right: 12px; font-size: 11px; color: var(--good); }
.hint { position: absolute; bottom: 10px; right: 12px; font-size: 11px; color: var(--muted); }
.section-title { font-size: 17px; margin: 24px 0 12px; }
.topics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.topic-card { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; cursor: pointer; text-align: left; font-family: inherit; }
.topic-art { width: 44px; height: 44px; margin-bottom: 2px; }
.topic-title { font-size: 15px; font-weight: bold; }
.topic-intro { font-size: 12px; color: var(--muted); }
.topic-head { margin-top: 14px; }
.notice { background: var(--paper-2); border-radius: 10px; padding: 8px 14px; font-size: 13px; color: var(--ink-2); margin-bottom: 6px; }
.sec-heading { margin: 18px 0 6px; font-size: 16px; color: var(--cinnabar); }
.sec-text { font-size: 14px; color: var(--ink); }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } .topics { grid-template-columns: 1fr; } }
</style>
