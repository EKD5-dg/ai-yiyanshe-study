import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProgressStore, STORAGE_KEY } from '../src/stores/progress'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('progress store', () => {
  it('无存档时为初始状态', () => {
    const s = useProgressStore()
    expect(s.lingyun).toBe(0)
    expect(s.completedLessons).toEqual([])
  })

  it('存档损坏时重置为初始状态（不抛错）', () => {
    localStorage.setItem(STORAGE_KEY, '{{{ 不是 JSON')
    const s = useProgressStore()
    expect(s.lingyun).toBe(0)
  })

  it('存档结构不符时重置', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lingyun: '很多' }))
    const s = useProgressStore()
    expect(s.lingyun).toBe(0)
  })

  it('completeLesson 加灵蕴值且幂等、写入 localStorage', () => {
    const s = useProgressStore()
    s.completeLesson('l01', 30)
    s.completeLesson('l01', 30)
    expect(s.completedLessons).toEqual(['l01'])
    expect(s.lingyun).toBe(30)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).lingyun).toBe(30)
  })

  it('完成第 1 关解锁徽章 b_lessons_1，并记录在 lastUnlocked', () => {
    const s = useProgressStore()
    s.completeLesson('l01', 30)
    expect(s.badges).toContain('b_lessons_1')
    expect(s.lastUnlocked.map(b => b.id)).toContain('b_lessons_1')
  })

  it('同一天多次行为 streak 只记 1 天', () => {
    const s = useProgressStore()
    s.completeLesson('l01', 30)
    s.readCard('f01')
    expect(s.streak.days).toBe(1)
  })

  it('finishQuiz 只在破纪录时更新最佳成绩', () => {
    const s = useProgressStore()
    s.finishQuiz(200, 5)
    s.finishQuiz(100, 3)
    expect(s.quizBest.score).toBe(200)
    expect(s.quizBest.combo).toBe(5)
  })
})
