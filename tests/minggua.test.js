import { describe, it, expect } from 'vitest'
import { minggua } from '../src/utils/minggua'

describe('minggua 命卦计算', () => {
  it('1990 男 → 坎，东四命', () => {
    const r = minggua(1990, 'male')
    expect(r.name).toBe('坎')
    expect(r.group).toBe('东四命')
  })
  it('1990 女 → 艮，西四命', () => {
    const r = minggua(1990, 'female')
    expect(r.name).toBe('艮')
    expect(r.group).toBe('西四命')
  })
  it('2000 男 → 离（2,11-2=9），东四命', () => {
    expect(minggua(2000, 'male').name).toBe('离')
  })
  it('公式得 5：男归坤、女归艮', () => {
    // 1959: 1+9+5+9=24→6，男 11-6=5 → 坤
    expect(minggua(1959, 'male').name).toBe('坤')
    // 1937: 1+9+3+7=20→2，女 2+4=6 → 乾（对照组）
    expect(minggua(1937, 'female').name).toBe('乾')
    // 1946: 1+9+4+6=20→2，男 11-2=9 离；女 2+4=6 乾（再对照）
    // 女得 5 的例子：1955: 1+9+5+5=20→2? 不对——直接构造：y=1 时女 1+4=5 → 艮；1900: 1+9+0+0=10→1
    expect(minggua(1900, 'female').name).toBe('艮')
  })
  it('返回四吉方与四凶方各 4 项', () => {
    const r = minggua(1990, 'male')
    expect(r.lucky).toHaveLength(4)
    expect(r.unlucky).toHaveLength(4)
  })
  it('边界年份可计算', () => {
    expect(minggua(1920, 'male').name).toBeTruthy()
    expect(minggua(2025, 'female').name).toBeTruthy()
  })
})
