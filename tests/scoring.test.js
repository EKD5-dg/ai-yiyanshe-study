import { describe, it, expect } from 'vitest'
import { comboScore } from '../src/utils/scoring'

describe('comboScore 连击积分', () => {
  it('首题 10 分，连击每加 1 递增 10%', () => {
    expect(comboScore(1)).toBe(10)
    expect(comboScore(2)).toBe(11)
    expect(comboScore(5)).toBe(14)
    expect(comboScore(10)).toBe(19)
  })
})
