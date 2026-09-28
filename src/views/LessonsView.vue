<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import { figureMap } from '../components/art/figureMap.js'
import ChapterBanner from '../components/art/ChapterBanner.vue'
import SealStamp from '../components/art/SealStamp.vue'
import LazyImage from '../components/LazyImage.vue'
import lessons from '../data/lessons.json'

const store = useProgressStore()
const current = ref(null)      // 当前关对象
const phase = ref('read')      // read | quiz | done
const qIdx = ref(0)            // 当前题号
const picked = ref(null)       // 本题已选下标
const firstTryAll = ref(true)  // 是否全部首选即对
const answeredRight = ref(false)

// 过滤掉未注册图名的 figure 块，避免渲染出空白 block
const visibleContent = computed(() =>
  current.value ? current.value.content.filter(b => b.type !== 'figure' || figureMap[b.value]) : []
)

const chapters = computed(() => {
  const map = new Map()
  lessons.forEach((l, i) => {
    if (!map.has(l.chapter)) map.set(l.chapter, { name: l.chapterName, items: [] })
    map.get(l.chapter).items.push({ ...l, index: i })
  })
  return [...map.values()]
})

function isUnlocked(index) { return index < store.unlockedCount }
function isDone(id) { return store.completedLessons.includes(id) }

function open(lesson, index) {
  if (!isUnlocked(index)) return
  current.value = lesson
  phase.value = 'read'
  qIdx.value = 0
  picked.value = null
  firstTryAll.value = true
  answeredRight.value = false
}

function pick(i) {
  if (answeredRight.value) return
  picked.value = i
  const q = current.value.questions[qIdx.value]
  if (i === q.answer) {
    answeredRight.value = true
  } else {
    firstTryAll.value = false
  }
}

function nextQuestion() {
  if (qIdx.value < 2) {
    qIdx.value++
    picked.value = null
    answeredRight.value = false
  } else {
    store.completeLesson(current.value.id, firstTryAll.value ? 30 : 15)
    phase.value = 'done'
  }
}
</script>

<template>
  <div class="page">
    <!-- 关卡地图 -->
    <template v-if="!current">
      <h1 class="page-title">📖 易经学堂</h1>
      <p class="page-sub">从阴阳到六十四卦，一关一关打通关</p>
      <LazyImage class="lesson-art" src="/images/lessons-study.webp" alt="书卷求学插画" />
      <section v-for="(ch, ci) in chapters" :key="ci" class="chapter">
        <ChapterBanner :chapter="ci + 1" class="ch-banner" />
        <h3 class="ch-name">第{{ ['一', '二', '三', '四', '五', '六'][ci] }}章 · {{ ch.name }}</h3>
        <div class="levels">
          <button v-for="l in ch.items" :key="l.id" class="level card"
            :class="{ locked: !isUnlocked(l.index), done: isDone(l.id) }"
            @click="open(l, l.index)">
            <span class="lv-icon">{{ isDone(l.id) ? '✅' : isUnlocked(l.index) ? '▶' : '🔒' }}</span>
            <span class="lv-title">{{ l.title }}</span>
          </button>
        </div>
      </section>
    </template>

    <!-- 知识页 -->
    <template v-else-if="phase === 'read'">
      <button class="btn btn-ghost" @click="current = null">← 返回地图</button>
      <h1 class="page-title">{{ current.title }}</h1>
      <div v-for="(b, i) in visibleContent" :key="i" class="block" :class="b.type">
        <component v-if="b.type === 'figure'" :is="figureMap[b.value]" v-bind="b.props || {}" class="figure-img" />
        <p v-else>{{ b.type === 'tip' ? '💡 ' + b.value : b.value }}</p>
      </div>
      <button class="btn" @click="phase = 'quiz'">开始小测 ▶</button>
    </template>

    <!-- 小测 -->
    <template v-else-if="phase === 'quiz'">
      <p class="page-sub">第 {{ qIdx + 1 }}/3 题</p>
      <h2 class="question">{{ current.questions[qIdx].q }}</h2>
      <div class="options">
        <button v-for="(op, i) in current.questions[qIdx].options" :key="i" class="card option"
          :class="{ right: answeredRight && i === current.questions[qIdx].answer, wrong: picked === i && i !== current.questions[qIdx].answer }"
          @click="pick(i)">{{ op }}</button>
      </div>
      <p v-if="picked !== null && !answeredRight" class="explain wrong-tip">再想想～</p>
      <p v-if="answeredRight" class="explain">✔ {{ current.questions[qIdx].explain }}</p>
      <button v-if="answeredRight" class="btn" @click="nextQuestion">{{ qIdx < 2 ? '下一题' : '完成关卡' }}</button>
    </template>

    <!-- 结算 -->
    <template v-else>
      <div class="card result">
        <SealStamp text="通" :size="52" class="result-seal" />
        <h2>通关！{{ current.title }}</h2>
        <p>获得灵蕴值 +{{ firstTryAll ? 30 : 15 }}</p>
        <p v-if="store.lastUnlocked.length" class="unlock">🏅 解锁徽章：{{ store.lastUnlocked.map(b => b.name).join('、') }}</p>
        <button class="btn" @click="current = null">返回关卡地图</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.chapter { margin-bottom: 20px; }
.lesson-art {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--line);
  overflow: hidden;
  margin-bottom: 16px;
}
.ch-banner { width: 100%; display: block; border-radius: 10px; border: 1px solid var(--line); margin-bottom: 8px; }
.ch-name { margin-bottom: 10px; color: var(--ink-2); font-size: 15px; }
.levels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.level { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; text-align: left; }
.level.locked { opacity: .45; cursor: not-allowed; }
.level.done { border-color: var(--good); }
.block { margin: 12px 0; }
.block.figure { display: flex; justify-content: center; padding: 6px 0; }
.figure-img { max-width: 320px; width: 100%; }
.block.figure :deep(.photo-figure) { width: 100%; max-width: 520px; }
.block.figure :deep(.photo-figure .lazy-img) { border-radius: 0; }
.block.tip { background: var(--paper-2); border-radius: 10px; padding: 10px 14px; font-size: 14px; }
.question { margin: 8px 0 14px; }
.options { display: grid; gap: 10px; margin-bottom: 12px; }
.option { cursor: pointer; text-align: left; font-size: 14px; }
.option.right { border-color: var(--good); background: #f0f8f4; }
.option.wrong { border-color: var(--cinnabar); background: #fbf0f0; }
.explain { font-size: 13px; color: var(--good); margin-bottom: 12px; }
.wrong-tip { color: var(--cinnabar); }
.result { text-align: center; padding: 30px; }
.result-seal { display: block; margin: 0 auto 8px; }
.unlock { color: var(--cinnabar); font-size: 14px; }
@media (max-width: 720px) { .levels { grid-template-columns: 1fr 1fr; } }
</style>
