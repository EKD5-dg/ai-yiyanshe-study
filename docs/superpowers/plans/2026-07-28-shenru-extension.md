# 「易研社」深入学习扩展（v2）实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 v1 基础上新增 64 卦百科（列表+详情+爻辞象辞+卦际关系）、进阶课程 16 关、风水进阶专题 3 个，并重新部署。

**Architecture:** 沿用 v1（Vue3+Vite+Pinia+vue-router 纯前端）。新数据独立文件（yaoci.json / fengshui-topics.json）由详情页懒加载；卦际关系与命卦为纯函数 + Vitest 单测；徽章档位调整保持 24 枚结构。

**Tech Stack:** 同 v1。命令一律 PowerShell + `npm.cmd`/`npx.cmd`，分隔符 `;`。

**设计文档:** `docs/superpowers/specs/2026-07-28-shenru-extension-design.md`

---

### Task V2-1: 算法 utils（relations + minggua，TDD）

**Files:**
- Create: `src/utils/relations.js`, `src/utils/minggua.js`
- Test: `tests/relations.test.js`, `tests/minggua.test.js`

- [ ] **Step 1: 写失败测试 tests/relations.test.js**

```js
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
```

- [ ] **Step 2: `npm.cmd test` 确认新套件失败**

- [ ] **Step 3: 实现 src/utils/relations.js**

```js
import hexagrams from '../data/hexagrams.json'
import trigrams from '../data/trigrams.json'
import { findHexagram } from './divination'

const linesByKey = new Map(trigrams.map(t => [t.key, t.lines]))

// 由上下卦拼出六爻 bits（自下而上）
export function bitsOf(hex) {
  return [...linesByKey.get(hex.lower), ...linesByKey.get(hex.upper)]
}

function byId(id) {
  return hexagrams[id - 1]
}

// 错卦：六爻阴阳全部互换
export function cuogua(id) {
  return findHexagram(bitsOf(byId(id)).map(b => (b ? 0 : 1)))
}

// 综卦：六爻上下颠倒
export function zonggua(id) {
  return findHexagram([...bitsOf(byId(id))].reverse())
}

// 互卦：2-4 爻为下卦、3-5 爻为上卦
export function hugua(id) {
  const b = bitsOf(byId(id))
  return findHexagram([b[1], b[2], b[3], b[2], b[3], b[4]])
}
```

- [ ] **Step 4: 写失败测试 tests/minggua.test.js**

```js
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
```

- [ ] **Step 5: 实现 src/utils/minggua.js**

```js
// 八宅命卦：公历年简化算法（不处理立春分界，页面已注明）
const NUM_TO_GUA = { 1: '坎', 2: '坤', 3: '震', 4: '巽', 6: '乾', 7: '兑', 8: '艮', 9: '离' }
const EAST = ['坎', '离', '震', '巽']

// 各命卦四吉方（生气/天医/延年/伏位）与四凶方（绝命/五鬼/六煞/祸害）
const DIRECTIONS = {
  坎: { lucky: [['生气', '东南'], ['天医', '东'], ['延年', '南'], ['伏位', '北']], unlucky: [['绝命', '西南'], ['五鬼', '东北'], ['六煞', '西北'], ['祸害', '西']] },
  离: { lucky: [['生气', '东'], ['天医', '东南'], ['延年', '北'], ['伏位', '南']], unlucky: [['绝命', '西北'], ['五鬼', '西'], ['六煞', '西南'], ['祸害', '东北']] },
  震: { lucky: [['生气', '南'], ['天医', '北'], ['延年', '东南'], ['伏位', '东']], unlucky: [['绝命', '西'], ['五鬼', '西北'], ['六煞', '东北'], ['祸害', '西南']] },
  巽: { lucky: [['生气', '北'], ['天医', '南'], ['延年', '东'], ['伏位', '东南']], unlucky: [['绝命', '东北'], ['五鬼', '西南'], ['六煞', '西'], ['祸害', '西北']] },
  乾: { lucky: [['生气', '西'], ['天医', '东北'], ['延年', '西南'], ['伏位', '西北']], unlucky: [['绝命', '南'], ['五鬼', '东'], ['六煞', '北'], ['祸害', '东南']] },
  坤: { lucky: [['生气', '东北'], ['天医', '西'], ['延年', '西北'], ['伏位', '西南']], unlucky: [['绝命', '北'], ['五鬼', '东南'], ['六煞', '南'], ['祸害', '东']] },
  艮: { lucky: [['生气', '西南'], ['天医', '西北'], ['延年', '西'], ['伏位', '东北']], unlucky: [['绝命', '东南'], ['五鬼', '北'], ['六煞', '东'], ['祸害', '南']] },
  兑: { lucky: [['生气', '西北'], ['天医', '西南'], ['延年', '东北'], ['伏位', '西']], unlucky: [['绝命', '东'], ['五鬼', '南'], ['六煞', '东南'], ['祸害', '北']] }
}

function reduce1(n) {
  while (n > 9) n = String(n).split('').reduce((s, c) => s + Number(c), 0)
  return n
}

export function minggua(year, gender) {
  const y = reduce1(String(year).split('').reduce((s, c) => s + Number(c), 0))
  let n = gender === 'male' ? reduce1(11 - y) : reduce1(y + 4)
  if (n === 5) n = gender === 'male' ? 2 : 8
  const name = NUM_TO_GUA[n]
  const d = DIRECTIONS[name]
  return {
    name,
    group: EAST.includes(name) ? '东四命' : '西四命',
    lucky: d.lucky.map(([k, v]) => ({ kind: k, dir: v })),
    unlucky: d.unlucky.map(([k, v]) => ({ kind: k, dir: v }))
  }
}
```

- [ ] **Step 6: 全部测试转绿；Commit** `git add -A; git commit -m "feat: 卦际关系与命卦算法（TDD）"`

---

### Task V2-2: 数据（yaoci.json + fengshui-topics.json + lessons 追加 + badges 调整）+ 测试更新

**Files:**
- Create: `src/data/yaoci.json`, `src/data/fengshui-topics.json`
- Modify: `src/data/lessons.json`（追加 l21-l36）, `src/data/badges.json`（lessons 档位）, `tests/data.test.js`

- [ ] **Step 1: 写 src/data/yaoci.json（64 条）**

Schema（数组下标 = id-1）、乾卦完整样例：

```json
{
  "id": 1,
  "xiang": { "text": "天行健，君子以自强不息。", "plain": "天道运转刚健不息，君子应当像天一样不断自我奋进。" },
  "yaoci": [
    { "name": "初九", "text": "潜龙勿用。", "plain": "潜伏的龙，暂时不要行动——实力未足时先蛰伏积累。" },
    { "name": "九二", "text": "见龙在田，利见大人。", "plain": "龙出现在田野，适合去见能提携你的人——崭露头角的时机到了。" },
    { "name": "九三", "text": "君子终日乾乾，夕惕若厉，无咎。", "plain": "整天勤奋努力，晚上仍保持警惕，虽处险境也无灾祸。" },
    { "name": "九四", "text": "或跃在渊，无咎。", "plain": "或跃起或退回深渊，进退自如审时度势，没有过错。" },
    { "name": "九五", "text": "飞龙在天，利见大人。", "plain": "龙飞上天空，大展宏图之时——事业的黄金时刻。" },
    { "name": "上九", "text": "亢龙有悔。", "plain": "飞得过高的龙会后悔——盛极必衰，得意时更要留余地。" }
  ],
  "extra": { "name": "用九", "text": "见群龙无首，吉。", "plain": "群龙都不争当首领，反而吉祥——不逞强出头是最高智慧。" }
}
```

要求：64 条全量；爻名规则阳爻「初九/九二/九三/九四/九五/上九」、阴爻「初六/六二/…/上六」，必须与该卦 bits 一致（可用 relations.bitsOf 核对）；`text` 用通行本原文；`plain` 1-2 句白话，口吻同 v1；仅 id1 有「用九」、id2 有「用六」extra。

- [ ] **Step 2: 写 src/data/fengshui-topics.json（3 个专题）**

```json
[
  { "id": "t1", "title": "八宅与命卦", "icon": "🧭", "intro": "算出你的命卦，看懂东四命与西四命",
    "interactive": "minggua",
    "sections": [
      { "heading": "什么是八宅", "text": "…（传统说法+现代视角，80-150字）" },
      { "heading": "命卦与东西四命", "text": "…" },
      { "heading": "四吉方与四凶方", "text": "…" },
      { "heading": "现代人怎么看", "text": "…理性视角收尾" }
    ] }
]
```

t2 九宫飞星入门、t3 罗盘与二十四山同构（无 interactive 字段），每专题 sections ≥ 4，最后一节必须是理性/现代视角收尾。

- [ ] **Step 3: lessons.json 追加 l21-l36（16 关）**

章节目录见设计文档第 3 节（chapter 4「爻辞入门」6 关 / chapter 5「卦际关系」5 关 / chapter 6「易学思维」5 关，标题按设计文档）。每关结构同 v1：content 2-4 块（含 1 个 tip 梗）、3 题小测。知识必须与 yaoci.json / relations 算法口径一致（如互卦取 2-4、3-5 爻）。

- [ ] **Step 4: badges.json 调整 lessons_completed 档位**

1/5/12/20 → 1/10/20/36；名称改为：初窥门径(1，不变) / 修行渐深(10) / 双十圆满(20) / 易学大成(36)；desc 同步。其余 20 枚不动。

- [ ] **Step 5: 更新 tests/data.test.js 并新增校验**

- lessons：`toHaveLength(36)`；章节断言改为 4+8+8+6+5+5（chapter 1-6）
- badges：新增断言 lessons_completed 组 thresholds 为 `[1, 10, 20, 36]`
- 新增 describe('yaoci.json')：64 条、下标=id-1、每条 yaoci 长度 6、爻名与 bitsOf 阴阳一致（阳爻名含「九」、阴爻名含「六」）、text/plain 非空、id1/id2 有 extra 且其余没有
- 新增 describe('fengshui-topics.json')：3 条、每条 sections≥4、t1 有 interactive='minggua'

- [ ] **Step 6: `npm.cmd test` 全绿；Commit** `git add -A; git commit -m "feat: 爻辞象辞/风水专题/进阶课程数据"`

---

### Task V2-3: 百科页面（列表 + 详情 + 路由导航 + 站内联动）

**Files:**
- Create: `src/views/HexagramsView.vue`, `src/views/HexagramDetailView.vue`
- Modify: `src/router/index.js`（+2 路由）, `src/App.vue`（导航 +「📜 百科」）, `src/views/HomeView.vue`（每日一卦加链接）, `src/views/DivinationView.vue`（结果卡加链接）

- [ ] **Step 1: 路由**：`/hexagrams` → HexagramsView；`/hexagrams/:id` → HexagramDetailView（在组件内校验 id 非 1-64 时 `router.replace('/hexagrams')`）

- [ ] **Step 2: HexagramsView**：搜索框（按 name/fullName includes 过滤）+ 上卦/下卦两组 8 个标签筛选（可取消）+ 64 卦网格卡（symbol 大字 + name + fullName + id 序号），点击进详情。网格 8 列，≤720px 时 4 列。

- [ ] **Step 3: HexagramDetailView**：按设计文档第 2 节区块实现——头部（HexagramFigure bits 用 relations.bitsOf、symbol、fullName、第 N 卦、上X下Y 说明）/ 卦辞区（guaci+plain+fun）/ 象辞区 / 六爻区（自初爻向上逐条卡片，含乾坤 extra）/ 卦际关系区（cuogua/zonggua/hugua 三卡，RouterLink 跳转；综卦为自身时显示「本卦自综」标记）/ 上一卦下一卦翻页 / DisclaimerBar。yaoci.json 在该组件内 import（Vite 会随详情页 chunk 懒加载）。

- [ ] **Step 4: 联动**：HomeView 每日一卦卡片底部加 `<RouterLink :to="'/hexagrams/' + daily.id">查看百科 →</RouterLink>`；DivinationView 本卦/变卦卡标题旁加同款链接。App.vue navs 数组插入 `{ to: '/hexagrams', label: '百科', icon: '📜' }`（放「学堂」之后）。

- [ ] **Step 5: `npm.cmd run build` 成功 + `npm.cmd test` 全绿；Commit** `git add -A; git commit -m "feat: 64卦百科列表与详情页"`

---

### Task V2-4: 风水进阶专题 + 命卦计算器

**Files:**
- Create: `src/components/MingguaCalc.vue`
- Modify: `src/views/FengshuiView.vue`

- [ ] **Step 1: MingguaCalc.vue**：年份下拉（1920-2025）+ 性别单选 + 计算按钮 → 展示命卦名、东四/西四命、四吉方/四凶方两列表格；底部小字「按公历年份简化计算，未处理立春分界，仅供娱乐参考」。调用 `minggua(year, gender)`。

- [ ] **Step 2: FengshuiView 两态化**（模式同 LessonsView）：默认态在翻卡区下方加「进阶专题」区块（3 张卡：icon+title+intro）；点击进入专题态——渲染该专题 sections（heading+text），t1 在 intro 后插入 `<MingguaCalc />`，顶部返回按钮 + 显著科普提示条，底部 DisclaimerBar。

- [ ] **Step 3: build + test 全绿；Commit** `git add -A; git commit -m "feat: 风水进阶专题与命卦计算器"`

---

### Task V2-5: 验收 + 部署

- [ ] **Step 1:** `npm.cmd test`（全部套件）+ `npm.cmd run build` 全绿
- [ ] **Step 2:** `npm.cmd run preview` 浏览器走查：百科列表筛选/搜索、任意详情页六爻与卦际关系跳转、非法 id 重定向、每日一卦与起卦链接、学堂第 21 关在通关 20 关前锁定（用 localStorage 造数据验证解锁边界）、风水专题三个都能打开、命卦计算器 1990 男=坎、移动端 6 个 Tab 正常
- [ ] **Step 3:** 修复问题后 `git add -A; git commit -m "fix: v2 验收修复"`（无问题跳过）
- [ ] **Step 4:** 部署 `npx.cmd wrangler pages deploy dist --project-name yiyanshe --branch master --commit-dirty=true`（CI=true 环境变量），线上 200 验证

---

## 自检记录

- ✅ 设计文档三模块 ↔ V2-1~V2-4；测试调整 ↔ V2-2 Step 5；部署 ↔ V2-5
- ✅ relations/minggua 完整代码与测试向量已内联；类型/函数名前后一致（bitsOf/cuogua/zonggua/hugua/minggua）
- ✅ 内容任务给出 schema + 完整样例 + 数量与一致性硬性要求
