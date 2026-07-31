<script setup>
import { ref, onUnmounted } from 'vue'
import { useProgressStore } from '../stores/progress'
import { comboScore } from '../utils/scoring'
import QuizBanner from '../components/art/QuizBanner.vue'
import ScrollFrame from '../components/art/ScrollFrame.vue'
import quizBank from '../data/quiz.json'

const store = useProgressStore()
const phase = ref('start')   // start | playing | over
const questions = ref([])
const qIdx = ref(0)
const lives = ref(3)
const score = ref(0)
const combo = ref(0)
const maxCombo = ref(0)
const rightCount = ref(0)
const timeLeft = ref(15)
const picked = ref(null)     // 本题选择（锁定后显示对错）
let timer = null

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function start() {
  questions.value = shuffle(quizBank).slice(0, 10)
  qIdx.value = 0; lives.value = 3; score.value = 0
  combo.value = 0; maxCombo.value = 0; rightCount.value = 0
  phase.value = 'playing'
  nextTick_()
}

function nextTick_() {
  picked.value = null
  timeLeft.value = 15
  clearInterval(timer)
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) settle(-1)
  }, 1000)
}

function settle(i) {
  clearInterval(timer)
  picked.value = i
  const q = questions.value[qIdx.value]
  if (i === q.answer) {
    combo.value++
    maxCombo.value = Math.max(maxCombo.value, combo.value)
    score.value += comboScore(combo.value)
    rightCount.value++
  } else {
    combo.value = 0
    lives.value--
  }
  setTimeout(() => {
    if (lives.value <= 0 || qIdx.value >= 9) {
      phase.value = 'over'
      store.finishQuiz(score.value, maxCombo.value)
    } else {
      qIdx.value++
      nextTick_()
    }
  }, 900)
}

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="page">
    <!-- 开始 -->
    <div v-if="phase === 'start'" class="card center">
      <QuizBanner class="banner" />
      <h1 class="page-title">答题闯关</h1>
      <p class="page-sub">10 道题 · 每题 15 秒 · 3 条命 · 连击加分</p>
      <p class="best">最佳成绩：{{ store.quizBest.score }} 分 / 连击 ×{{ store.quizBest.combo }}</p>
      <button class="btn" @click="start">开始挑战 ▶</button>
    </div>

    <!-- 答题 -->
    <div v-else-if="phase === 'playing'">
      <div class="hud">
        <span>❤️ {{ lives }}</span>
        <span>🔥 ×{{ combo }}</span>
        <span>⭐ {{ score }}</span>
        <span class="timer" :class="{ danger: timeLeft <= 5 }">⏱ {{ timeLeft }}s</span>
      </div>
      <div class="progress-track"><div class="progress-fill" :style="{ width: (qIdx) * 10 + '%' }"></div></div>
      <h2 class="question">{{ qIdx + 1 }}. {{ questions[qIdx].q }}</h2>
      <div class="options">
        <button v-for="(op, i) in questions[qIdx].options" :key="i" class="card option"
          :disabled="picked !== null"
          :class="{ right: picked !== null && i === questions[qIdx].answer, wrong: picked === i && i !== questions[qIdx].answer }"
          @click="settle(i)">{{ op }}</button>
      </div>
      <p v-if="picked !== null" class="explain">{{ questions[qIdx].explain }}</p>
    </div>

    <!-- 结算 -->
    <div v-else class="card center">
      <ScrollFrame>
        <div style="font-size:40px">{{ rightCount >= 8 ? '🏆' : rightCount >= 5 ? '🎉' : '💪' }}</div>
        <h2>得分 {{ score }}</h2>
        <p>答对 {{ rightCount }}/{{ qIdx + 1 }} · 最高连击 ×{{ maxCombo }} · 灵蕴值 +{{ Math.round(score / 2) }}</p>
        <p v-if="store.lastUnlocked.length" class="unlock">🏅 新徽章：{{ store.lastUnlocked.map(b => b.name).join('、') }}</p>
      </ScrollFrame>
      <div class="over-actions">
        <button class="btn" @click="start">再来一局</button>
        <RouterLink to="/" class="btn btn-ghost" style="margin-left:10px">回首页</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center { text-align: center; padding: 34px; }
.banner { width: 170px; margin: 0 auto; display: block; }
.over-actions { margin-top: 16px; }
.best { font-size: 13px; color: var(--muted); margin: 8px 0 14px; }
.hud { display: flex; gap: 16px; font-size: 15px; margin-bottom: 8px; }
.timer.danger { color: var(--cinnabar); font-weight: bold; }
.question { margin: 14px 0; }
.options { display: grid; gap: 10px; }
.option { cursor: pointer; text-align: left; font-size: 14px; }
.option.right { border-color: var(--good); background: #f0f8f4; }
.option.wrong { border-color: var(--cinnabar); background: #fbf0f0; }
.explain { font-size: 13px; color: var(--ink-2); margin-top: 10px; }
.unlock { color: var(--cinnabar); font-size: 14px; }
</style>
