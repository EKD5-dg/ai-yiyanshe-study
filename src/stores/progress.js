import { defineStore } from 'pinia'
import { newlyUnlocked } from '../utils/badges'

export const STORAGE_KEY = 'yiyanshe-progress-v1'

function dateStr(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function defaultState() {
  return {
    lingyun: 0,
    completedLessons: [],
    readFengshui: [],
    badges: [],
    streak: { days: 0, lastDate: '' },
    quizBest: { score: 0, combo: 0 },
    lastUnlocked: []
  }
}

function load() {
  const base = defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return base
    const p = JSON.parse(raw)
    const valid = p && typeof p === 'object' &&
      typeof p.lingyun === 'number' &&
      Array.isArray(p.completedLessons) && Array.isArray(p.badges)
    if (!valid) return base
    return { ...base, ...p, lastUnlocked: [] }
  } catch {
    return base
  }
}

export const useProgressStore = defineStore('progress', {
  state: () => load(),
  getters: {
    // 顺序解锁：可玩关卡数 = 已完成数 + 1
    unlockedCount: (s) => s.completedLessons.length + 1
  },
  actions: {
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
      } catch { /* 隐私模式等场景降级为内存态 */ }
    },
    touchStreak() {
      const today = dateStr(new Date())
      if (this.streak.lastDate === today) return
      const yesterday = dateStr(new Date(Date.now() - 86400000))
      this.streak.days = this.streak.lastDate === yesterday ? this.streak.days + 1 : 1
      this.streak.lastDate = today
    },
    afterAction() {
      const unlocked = newlyUnlocked(this.$state)
      this.badges.push(...unlocked.map(b => b.id))
      this.lastUnlocked = unlocked
      this.persist()
    },
    completeLesson(id, reward) {
      this.touchStreak()
      if (!this.completedLessons.includes(id)) {
        this.completedLessons.push(id)
        this.lingyun += reward
      }
      this.afterAction()
    },
    readCard(id) {
      this.touchStreak()
      if (!this.readFengshui.includes(id)) {
        this.readFengshui.push(id)
        this.lingyun += 5
      }
      this.afterAction()
    },
    finishQuiz(score, maxCombo) {
      this.touchStreak()
      this.lingyun += Math.round(score / 2)
      if (score > this.quizBest.score) this.quizBest.score = score
      if (maxCombo > this.quizBest.combo) this.quizBest.combo = maxCombo
      this.afterAction()
    }
  }
})
