import { describe, it, expect } from 'vitest'
import { newlyUnlocked } from '../src/utils/badges'

function makeState(over = {}) {
  return {
    lingyun: 0, completedLessons: [], readFengshui: [], badges: [],
    streak: { days: 0, lastDate: '' }, quizBest: { score: 0, combo: 0 }, ...over
  }
}

describe('newlyUnlocked', () => {
  it('初始状态无解锁', () => {
    expect(newlyUnlocked(makeState())).toHaveLength(0)
  })
  it('完成 1 关解锁 b_lessons_1', () => {
    const got = newlyUnlocked(makeState({ completedLessons: ['l01'] }))
    expect(got.map(b => b.id)).toContain('b_lessons_1')
  })
  it('已拥有的徽章不重复解锁', () => {
    const got = newlyUnlocked(makeState({ completedLessons: ['l01'], badges: ['b_lessons_1'] }))
    expect(got.map(b => b.id)).not.toContain('b_lessons_1')
  })
  it('跨档位一次可解锁多枚', () => {
    const got = newlyUnlocked(makeState({ completedLessons: Array.from({ length: 10 }, (_, i) => 'l' + (i + 1)) }))
    expect(got.map(b => b.id)).toEqual(expect.arrayContaining(['b_lessons_1', 'b_lessons_2']))
  })
})
