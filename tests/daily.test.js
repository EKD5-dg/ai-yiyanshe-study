import { describe, it, expect } from 'vitest'
import { dailyHexagram } from '../src/utils/daily'

describe('dailyHexagram', () => {
  it('同一天结果恒定', () => {
    expect(dailyHexagram(new Date(2026, 6, 27)).id).toBe(dailyHexagram(new Date(2026, 6, 27)).id)
  })
  it('返回合法卦对象', () => {
    const h = dailyHexagram(new Date(2026, 0, 1))
    expect(h.id).toBeGreaterThanOrEqual(1)
    expect(h.id).toBeLessThanOrEqual(64)
    expect(h.plain).toBeTruthy()
  })
})
