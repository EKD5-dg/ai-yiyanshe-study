import { describe, it, expect } from 'vitest'
import { bitsOf, cuogua, zonggua, hugua } from '../src/utils/relations'
import hexagrams from '../src/data/hexagrams.json'

describe('bitsOf', () => {
  it('乾 = 六阳，坤 = 六阴，泰 = 下三阳上三阴', () => {
    expect(bitsOf(hexagrams[0])).toEqual([1, 1, 1, 1, 1, 1])
    expect(bitsOf(hexagrams[1])).toEqual([0, 0, 0, 0, 0, 0])
    expect(bitsOf(hexagrams[10])).toEqual([1, 1, 1, 0, 0, 0])
  })
})

describe('cuogua 错卦（阴阳全反）', () => {
  it('乾↔坤，既济↔未济', () => {
    expect(cuogua(1).id).toBe(2)
    expect(cuogua(2).id).toBe(1)
    expect(cuogua(63).id).toBe(64)
  })
})

describe('zonggua 综卦（上下颠倒）', () => {
  it('泰↔否，屯↔蒙', () => {
    expect(zonggua(11).id).toBe(12)
    expect(zonggua(3).id).toBe(4)
  })
  it('乾坤坎离等 8 卦颠倒为自身', () => {
    for (const id of [1, 2, 29, 30, 27, 28, 61, 62]) {
      expect(zonggua(id).id).toBe(id)
    }
  })
})

describe('hugua 互卦（2-4爻为下、3-5爻为上）', () => {
  it('既济(63)互卦为未济(64)，泰(11)互卦为归妹(54)', () => {
    expect(hugua(63).id).toBe(64)
    expect(hugua(11).id).toBe(54)
  })
})
