import { describe, it, expect } from 'vitest'
import trigrams from '../src/data/trigrams.json'
import hexagrams from '../src/data/hexagrams.json'
import lessons from '../src/data/lessons.json'
import fengshui from '../src/data/fengshui.json'
import quiz from '../src/data/quiz.json'
import badges from '../src/data/badges.json'
import yaoci from '../src/data/yaoci.json'
import fengshuiTopics from '../src/data/fengshui-topics.json'

// 文王卦序标准表：kingWen[lowerKey][upperKey] = 卦序号
const kingWen = {
  qian: { qian: 1, kun: 11, zhen: 34, xun: 9, kan: 5, li: 14, gen: 26, dui: 43 },
  kun:  { qian: 12, kun: 2, zhen: 16, xun: 20, kan: 8, li: 35, gen: 23, dui: 45 },
  zhen: { qian: 25, kun: 24, zhen: 51, xun: 42, kan: 3, li: 21, gen: 27, dui: 17 },
  xun:  { qian: 44, kun: 46, zhen: 32, xun: 57, kan: 48, li: 50, gen: 18, dui: 28 },
  kan:  { qian: 6, kun: 7, zhen: 40, xun: 59, kan: 29, li: 64, gen: 4, dui: 47 },
  li:   { qian: 13, kun: 36, zhen: 55, xun: 37, kan: 63, li: 30, gen: 22, dui: 49 },
  gen:  { qian: 33, kun: 15, zhen: 62, xun: 53, kan: 39, li: 56, gen: 52, dui: 31 },
  dui:  { qian: 10, kun: 19, zhen: 54, xun: 61, kan: 60, li: 38, gen: 41, dui: 58 }
}

describe('trigrams.json', () => {
  it('包含 8 卦且字段齐全', () => {
    expect(trigrams).toHaveLength(8)
    for (const t of trigrams) {
      expect(t.key).toBeTruthy()
      expect(t.lines).toHaveLength(3)
      expect(t.mnemonic.length).toBeGreaterThan(5)
    }
  })
  it('key 无重复', () => {
    expect(new Set(trigrams.map(t => t.key)).size).toBe(8)
  })
})

describe('hexagrams.json', () => {
  const keys = new Set(trigrams.map(t => t.key))
  it('包含 64 卦，id 为 1..64 顺序排列', () => {
    expect(hexagrams).toHaveLength(64)
    hexagrams.forEach((h, i) => expect(h.id).toBe(i + 1))
  })
  it('symbol 与 Unicode 卦序一致', () => {
    for (const h of hexagrams) {
      expect(h.symbol.codePointAt(0)).toBe(0x4dc0 + h.id - 1)
    }
  })
  it('上下卦合法且符合文王卦序表', () => {
    for (const h of hexagrams) {
      expect(keys.has(h.upper)).toBe(true)
      expect(keys.has(h.lower)).toBe(true)
      expect(kingWen[h.lower][h.upper]).toBe(h.id)
    }
  })
  it('文案字段完整', () => {
    for (const h of hexagrams) {
      expect(h.name.length).toBeGreaterThan(0)
      expect(h.guaci.length).toBeGreaterThan(1)
      expect(h.plain.length).toBeGreaterThan(10)
      expect(h.fun.length).toBeGreaterThan(4)
    }
  })
})

describe('lessons.json', () => {
  it('36 关、每关 3 题、答案下标合法', () => {
    expect(lessons).toHaveLength(36)
    for (const l of lessons) {
      expect(l.questions).toHaveLength(3)
      expect(l.content.length).toBeGreaterThanOrEqual(2)
      for (const q of l.questions) {
        expect(q.options).toHaveLength(4)
        expect(q.answer).toBeGreaterThanOrEqual(0)
        expect(q.answer).toBeLessThan(4)
        expect(q.explain.length).toBeGreaterThan(3)
      }
    }
  })
  it('章节划分正确（4+8+8+6+5+5）', () => {
    expect(lessons.filter(l => l.chapter === 1)).toHaveLength(4)
    expect(lessons.filter(l => l.chapter === 2)).toHaveLength(8)
    expect(lessons.filter(l => l.chapter === 3)).toHaveLength(8)
    expect(lessons.filter(l => l.chapter === 4)).toHaveLength(6)
    expect(lessons.filter(l => l.chapter === 5)).toHaveLength(5)
    expect(lessons.filter(l => l.chapter === 6)).toHaveLength(5)
  })
})

describe('fengshui.json', () => {
  it('6 场景各 5 条，kind 合法', () => {
    expect(fengshui).toHaveLength(30)
    const scenes = ['客厅', '卧室', '书桌', '玄关', '厨房', '办公位']
    for (const s of scenes) {
      expect(fengshui.filter(f => f.scene === s)).toHaveLength(5)
    }
    for (const f of fengshui) {
      expect(['宜', '忌']).toContain(f.kind)
      expect(f.detail.length).toBeGreaterThan(15)
    }
  })
})

describe('quiz.json', () => {
  it('100 题、难度分布达标、答案合法', () => {
    expect(quiz).toHaveLength(100)
    expect(quiz.filter(q => q.difficulty === 'easy').length).toBeGreaterThanOrEqual(40)
    expect(quiz.filter(q => q.difficulty === 'medium').length).toBeGreaterThanOrEqual(35)
    expect(quiz.filter(q => q.difficulty === 'hard').length).toBeGreaterThanOrEqual(15)
    for (const q of quiz) {
      expect(q.options).toHaveLength(4)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(4)
    }
    expect(new Set(quiz.map(q => q.id)).size).toBe(100)
  })
})

describe('badges.json', () => {
  it('24 枚 = 6 指标 × 4 档，threshold 递增', () => {
    expect(badges).toHaveLength(24)
    const metrics = ['lessons_completed', 'fengshui_read', 'quiz_best_score', 'quiz_best_combo', 'streak_days', 'lingyun']
    for (const m of metrics) {
      const group = badges.filter(b => b.metric === m)
      expect(group).toHaveLength(4)
      const ts = group.map(b => b.threshold)
      expect([...ts].sort((a, b) => a - b)).toEqual(ts)
    }
    expect(new Set(badges.map(b => b.id)).size).toBe(24)
  })
  it('lessons_completed 档位为 1/10/20/36', () => {
    const ts = badges.filter(b => b.metric === 'lessons_completed').map(b => b.threshold)
    expect(ts).toEqual([1, 10, 20, 36])
  })
})

describe('yaoci.json', () => {
  const linesOf = new Map(trigrams.map(t => [t.key, t.lines]))
  it('64 条且下标 = id-1', () => {
    expect(yaoci).toHaveLength(64)
    yaoci.forEach((y, i) => expect(y.id).toBe(i + 1))
  })
  it('每条 6 爻，爻名阴阳与卦象一致，text/plain 非空', () => {
    const posNames = ['初', '二', '三', '四', '五', '上']
    for (const y of yaoci) {
      const h = hexagrams[y.id - 1]
      const bits = [...linesOf.get(h.lower), ...linesOf.get(h.upper)]
      expect(y.yaoci).toHaveLength(6)
      expect(y.xiang.text.length).toBeGreaterThan(3)
      expect(y.xiang.plain.length).toBeGreaterThan(3)
      y.yaoci.forEach((line, i) => {
        expect(line.name).toContain(posNames[i])
        expect(line.name).toContain(bits[i] === 1 ? '九' : '六')
        expect(line.text.length).toBeGreaterThan(1)
        expect(line.plain.length).toBeGreaterThan(3)
      })
    }
  })
  it('仅乾坤两卦有 extra（用九/用六）', () => {
    expect(yaoci[0].extra.name).toBe('用九')
    expect(yaoci[1].extra.name).toBe('用六')
    for (const y of yaoci) {
      if (y.id !== 1 && y.id !== 2) expect(y.extra).toBeUndefined()
    }
  })
})

describe('fengshui-topics.json', () => {
  it('3 个专题、每专题 sections ≥ 4 且字段完整', () => {
    expect(fengshuiTopics).toHaveLength(3)
    for (const t of fengshuiTopics) {
      expect(t.title.length).toBeGreaterThan(0)
      expect(t.icon.length).toBeGreaterThan(0)
      expect(t.intro.length).toBeGreaterThan(0)
      expect(t.sections.length).toBeGreaterThanOrEqual(4)
      for (const s of t.sections) {
        expect(s.heading.length).toBeGreaterThan(0)
        expect(s.text.length).toBeGreaterThan(30)
      }
    }
  })
  it('t1 带 minggua 交互，其余无 interactive', () => {
    expect(fengshuiTopics[0].id).toBe('t1')
    expect(fengshuiTopics[0].interactive).toBe('minggua')
    expect(fengshuiTopics[1].interactive).toBeUndefined()
    expect(fengshuiTopics[2].interactive).toBeUndefined()
  })
})
