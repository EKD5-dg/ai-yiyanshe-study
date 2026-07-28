<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import FlipCard from '../components/FlipCard.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import fengshui from '../data/fengshui.json'

const store = useProgressStore()
const scenes = ['客厅', '卧室', '书桌', '玄关', '厨房', '办公位']
const active = ref('客厅')
const cards = computed(() => fengshui.filter(f => f.scene === active.value))
</script>

<template>
  <div class="page">
    <h1 class="page-title">🏮 风水小知识</h1>
    <p class="page-sub">点卡片翻面看原理 · 已读 {{ store.readFengshui.length }}/{{ fengshui.length }}</p>

    <div class="tabs">
      <button v-for="s in scenes" :key="s" class="tab" :class="{ on: active === s }" @click="active = s">{{ s }}</button>
    </div>

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
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.summary { font-size: 15px; margin-top: 8px; }
.read { position: absolute; top: 10px; right: 12px; font-size: 11px; color: var(--good); }
.hint { position: absolute; bottom: 10px; right: 12px; font-size: 11px; color: var(--muted); }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
</style>
