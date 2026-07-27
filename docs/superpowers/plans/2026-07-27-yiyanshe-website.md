# 「易研社」趣味学易网站 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建纯前端的风水/易经趣味学习网站：5 个页面（首页/易经学堂/风水小知识/趣味起卦/答题闯关），进度存 localStorage。

**Architecture:** Vue 3 SPA。内容全部为静态 JSON 数据；核心算法（起卦/每日一卦/积分/徽章）为纯函数放 `src/utils/`，用 Vitest 做 TDD；用户进度集中在一个 Pinia store 并持久化到 localStorage；视图组件只做渲染与交互。

**Tech Stack:** Vue 3 (Composition API) + Vite + vue-router + Pinia + Vitest (jsdom)

**设计文档:** `docs/superpowers/specs/2026-07-27-yiyanshe-website-design.md`

---

## 文件结构总览

```
ai-zhouyi/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js               # 挂载 app + router + pinia
    ├── App.vue               # 布局壳：桌面顶部导航 / 移动底部 Tab
    ├── style.css             # 主题变量与全局样式（宣纸/墨黑/朱砂）
    ├── router/index.js       # 5 路由 + 兜底重定向
    ├── data/
    │   ├── trigrams.json     # 八卦（8 条）
    │   ├── hexagrams.json    # 64 卦全量
    │   ├── lessons.json      # 20 关课程
    │   ├── fengshui.json     # 风水卡（6 场景 × 5 条 = 30 条）
    │   ├── quiz.json         # 题库 100 题
    │   └── badges.json       # 24 枚徽章
    ├── utils/
    │   ├── divination.js     # 六爻铜钱起卦、变卦、查卦
    │   ├── daily.js          # 每日一卦
    │   ├── scoring.js        # 连击积分
    │   └── badges.js         # 徽章解锁判定
    ├── stores/progress.js    # 用户进度 store（含持久化与容错）
    ├── components/
    │   ├── HexagramFigure.vue  # 六爻卦象图（阴阳爻横线）
    │   ├── FlipCard.vue        # 翻转卡片
    │   ├── BadgeItem.vue       # 徽章
    │   └── DisclaimerBar.vue   # 免责声明条
    └── views/
        ├── HomeView.vue
        ├── LessonsView.vue     # 关卡地图 + 关卡学习/小测（同页两态）
        ├── FengshuiView.vue
        ├── DivinationView.vue
        └── QuizView.vue
tests/
    ├── data.test.js          # 数据文件完整性校验
    ├── divination.test.js
    ├── daily.test.js
    ├── scoring.test.js
    ├── badges.test.js
    └── progress.test.js
```

约定：所有终端命令在 PowerShell 中执行，工作目录 `c:\Users\macan\Desktop\ai-zhouyi`，分隔符用 `;` 不用 `&&`。

---

### Task 1: 项目脚手架 + 主题样式 + 路由壳

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.js`, `src/App.vue`, `src/style.css`, `src/router/index.js`, 5 个 view 占位文件

- [ ] **Step 1: 写 package.json**

```json
{
  "name": "yiyanshe",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "pinia": "^3.0.0",
    "vue": "^3.5.0",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0",
    "jsdom": "^26.0.0",
    "vite": "^7.0.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: 写 vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js']
  }
})
```

- [ ] **Step 3: 写 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>易研社 · 趣味学易</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 4: 写 src/style.css（主题变量 + 通用样式）**

```css
:root {
  --paper: #faf6ed;
  --paper-2: #f5f0e6;
  --ink: #2b2b2b;
  --ink-2: #6b5f4d;
  --muted: #8a7f6a;
  --cinnabar: #a83232;
  --cinnabar-dark: #8a2828;
  --line: #e5dcc8;
  --card-shadow: #ece3cf;
  --good: #2e7d5b;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--paper);
  color: var(--ink);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}
a { color: inherit; text-decoration: none; }
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 3px 0 var(--card-shadow);
}
.btn {
  display: inline-block;
  border: none;
  cursor: pointer;
  background: var(--cinnabar);
  color: #fff;
  padding: 8px 26px;
  border-radius: 22px;
  font-size: 15px;
  box-shadow: 0 3px 0 var(--cinnabar-dark);
}
.btn:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
.btn-ghost {
  background: transparent;
  color: var(--cinnabar);
  border: 1px solid var(--cinnabar);
  box-shadow: none;
}
.tag {
  display: inline-block;
  font-size: 12px;
  padding: 1px 10px;
  border-radius: 10px;
}
.tag-good { background: #e3f0e9; color: var(--good); }
.tag-bad { background: #f7e3e3; color: var(--cinnabar); }
.page { max-width: 960px; margin: 0 auto; padding: 20px 16px 80px; }
.page-title { font-size: 22px; letter-spacing: 2px; margin-bottom: 4px; }
.page-sub { font-size: 13px; color: var(--muted); margin-bottom: 18px; }
.progress-track { height: 8px; background: var(--paper-2); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--cinnabar); border-radius: 4px; transition: width .3s; }
```

- [ ] **Step 5: 写 src/router/index.js**

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/lessons', name: 'lessons', component: () => import('../views/LessonsView.vue') },
  { path: '/fengshui', name: 'fengshui', component: () => import('../views/FengshuiView.vue') },
  { path: '/divination', name: 'divination', component: () => import('../views/DivinationView.vue') },
  { path: '/quiz', name: 'quiz', component: () => import('../views/QuizView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({ history: createWebHistory(), routes })
```

- [ ] **Step 6: 写 src/main.js**

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

createApp(App).use(createPinia()).use(router).mount('#app')
```

- [ ] **Step 7: 写 src/App.vue（响应式导航壳）**

```vue
<script setup>
const navs = [
  { to: '/', label: '首页', icon: '🏠' },
  { to: '/lessons', label: '学堂', icon: '📖' },
  { to: '/fengshui', label: '风水', icon: '🏮' },
  { to: '/divination', label: '起卦', icon: '🪙' },
  { to: '/quiz', label: '闯关', icon: '⚔️' }
]
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="brand">☯ 易研社</RouterLink>
    <nav class="topnav">
      <RouterLink v-for="n in navs" :key="n.to" :to="n.to">{{ n.label }}</RouterLink>
    </nav>
  </header>
  <RouterView />
  <nav class="tabbar">
    <RouterLink v-for="n in navs" :key="n.to" :to="n.to">
      <span class="tab-icon">{{ n.icon }}</span>
      <span class="tab-label">{{ n.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 22px; border-bottom: 1px solid var(--line); background: var(--paper);
  position: sticky; top: 0; z-index: 10;
}
.brand { font-size: 19px; font-weight: bold; letter-spacing: 1px; }
.topnav { display: flex; gap: 22px; font-size: 15px; color: var(--ink-2); }
.topnav a.router-link-active { color: var(--cinnabar); font-weight: bold; }
.tabbar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 10;
  background: #fff; border-top: 1px solid var(--line);
  justify-content: space-around; padding: 6px 0 8px;
}
.tabbar a { display: flex; flex-direction: column; align-items: center; font-size: 11px; color: var(--muted); }
.tabbar a.router-link-active { color: var(--cinnabar); }
.tab-icon { font-size: 18px; }
@media (max-width: 720px) {
  .topnav { display: none; }
  .tabbar { display: flex; }
}
</style>
```

- [ ] **Step 8: 写 5 个占位 view（后续任务逐个替换为完整实现）**

每个文件内容相同模式，以 `src/views/HomeView.vue` 为例（其余 4 个改标题）：

```vue
<template>
  <div class="page">
    <h1 class="page-title">首页</h1>
    <p class="page-sub">建设中…</p>
  </div>
</template>
```

- [ ] **Step 9: 安装依赖并验证 dev/build**

```powershell
npm install; npm run build
```
Expected: build 成功，产出 `dist/`，无报错。

- [ ] **Step 10: Commit**

```powershell
git add -A; git commit -m "feat: 脚手架与导航壳（Vue3+Vite+Router+Pinia）"
```

---

### Task 2: 卦象数据（trigrams.json + hexagrams.json）+ 校验测试

**Files:**
- Create: `src/data/trigrams.json`, `src/data/hexagrams.json`
- Test: `tests/data.test.js`（本任务先写卦象部分）

- [ ] **Step 1: 写 src/data/trigrams.json（8 条全量，完整内容如下）**

```json
[
  { "key": "qian", "name": "乾", "symbol": "☰", "lines": [1,1,1], "nature": "天", "traits": "刚健、进取", "mnemonic": "乾三连：三条实线，像天一样完整不断" },
  { "key": "kun", "name": "坤", "symbol": "☷", "lines": [0,0,0], "nature": "地", "traits": "包容、承载", "mnemonic": "坤六断：三条虚线，像大地般柔顺" },
  { "key": "zhen", "name": "震", "symbol": "☳", "lines": [1,0,0], "nature": "雷", "traits": "行动、激发", "mnemonic": "震仰盂：下实上虚，像口朝上的盆接住雷声" },
  { "key": "xun", "name": "巽", "symbol": "☴", "lines": [0,1,1], "nature": "风", "traits": "渗透、灵活", "mnemonic": "巽下断：只有底下断开，风从缝隙钻进来" },
  { "key": "kan", "name": "坎", "symbol": "☵", "lines": [0,1,0], "nature": "水", "traits": "智慧、险中行", "mnemonic": "坎中满：中间实线，像水流中间最深" },
  { "key": "li", "name": "离", "symbol": "☲", "lines": [1,0,1], "nature": "火", "traits": "光明、依附", "mnemonic": "离中虚：中间虚线，像火焰中心是空的" },
  { "key": "gen", "name": "艮", "symbol": "☶", "lines": [0,0,1], "nature": "山", "traits": "静止、稳重", "mnemonic": "艮覆碗：上实下虚，像倒扣的碗稳如山" },
  { "key": "dui", "name": "兑", "symbol": "☱", "lines": [1,1,0], "nature": "泽", "traits": "喜悦、交流", "mnemonic": "兑上缺：顶上开口，像张开嘴笑的湖面" }
]
```

`lines` 自下而上，1=阳爻，0=阴爻。

- [ ] **Step 2: 写 src/data/hexagrams.json（64 条，按文王卦序）**

字段 schema 与两条完整样例（其余 62 条按同样结构编写，内容要求：`guaci` 用原文，`plain` 为 2-3 句白话解读，`fun` 为一句年轻人语感的趣味总结）：

```json
[
  {
    "id": 1,
    "name": "乾",
    "fullName": "乾为天",
    "symbol": "䷀",
    "upper": "qian",
    "lower": "qian",
    "guaci": "元亨利贞。",
    "plain": "乾卦六爻全阳，象征天道运行、生生不息。事情处于强劲上升期，大方向吉利，但要守正道、不可狂飙。",
    "fun": "满级大佬开局，但别浪——天道也讲基本法。"
  },
  {
    "id": 2,
    "name": "坤",
    "fullName": "坤为地",
    "symbol": "䷁",
    "upper": "kun",
    "lower": "kun",
    "guaci": "元亨，利牝马之贞。",
    "plain": "坤卦六爻全阴，象征大地的包容与承载。此时宜跟随、配合、积蓄力量，不宜抢先出头。",
    "fun": "当个稳健辅助也很香，别抢打野的活。"
  }
]
```

硬性要求：
- 64 条按文王卦序排列，`id` 为 1–64
- `symbol` 必须是 Unicode 六爻卦字符：`id=n` 对应码点 `0x4DC0 + (n-1)`（U+4DC0 ䷀ 起，Unicode 区块本身就是文王卦序）
- `upper`/`lower` 取值为 trigrams 的 8 个 `key`，且必须与该卦真实上下卦一致（由 Step 3 测试用标准表校验）

- [ ] **Step 3: 写数据校验测试 tests/data.test.js**

```js
import { describe, it, expect } from 'vitest'
import trigrams from '../src/data/trigrams.json'
import hexagrams from '../src/data/hexagrams.json'

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
```

- [ ] **Step 4: 运行测试确认失败（hexagrams 尚未写满 64 条时应红）**

```powershell
npm test
```
Expected: FAIL（64 条未写齐前）

- [ ] **Step 5: 补齐 64 卦数据后再跑测试**

```powershell
npm test
```
Expected: `tests/data.test.js` 全部 PASS。若 `kingWen` 表某格与权威卦序冲突，以通行本《周易》卦序修正数据与表格（两者必须对得上才算过）。

- [ ] **Step 6: Commit**

```powershell
git add -A; git commit -m "feat: 八卦与64卦数据及完整性校验"
```

---

### Task 3: 内容数据（lessons / fengshui / quiz / badges）+ 校验测试

**Files:**
- Create: `src/data/lessons.json`, `src/data/fengshui.json`, `src/data/quiz.json`, `src/data/badges.json`
- Modify: `tests/data.test.js`（追加校验）

- [ ] **Step 1: 写 src/data/lessons.json（20 关）**

Schema 与一条完整样例（其余 19 关同结构）：

```json
[
  {
    "id": "l01",
    "chapter": 1,
    "chapterName": "阴阳与五行",
    "title": "阴阳：万物的开关",
    "content": [
      { "type": "text", "value": "古人观察世界发现：白天黑夜、冷热动静，万物都有两面。这两面就叫阴与阳。" },
      { "type": "text", "value": "阳代表主动、明亮、向上（白天、火、动）；阴代表安静、幽暗、向下（夜晚、水、静）。" },
      { "type": "tip", "value": "记忆梗：阳=手机亮屏模式，阴=夜间深色模式，一天内反复切换才护眼。" }
    ],
    "questions": [
      {
        "q": "下面哪一组全部属于「阳」的意象？",
        "options": ["白天、火、运动", "夜晚、水、安静", "月亮、冬天、休息", "地面、寒冷、收藏"],
        "answer": 0,
        "explain": "阳对应主动、明亮、温热的一面。"
      },
      {
        "q": "阴阳关系的正确理解是？",
        "options": ["阳好阴坏", "阴阳对立且互相转化", "阴阳毫无关系", "只有阳没有阴"],
        "answer": 1,
        "explain": "阴阳相互依存、消长转化，没有好坏之分。"
      },
      {
        "q": "「夜间深色模式」在课程里比喻的是？",
        "options": ["五行", "阳", "阴", "八卦"],
        "answer": 2,
        "explain": "深色安静的一面对应阴。"
      }
    ]
  }
]
```

20 关目录（章/关卡 id/标题，内容按此编写）：
- 第一章「阴阳与五行」：l01 阴阳：万物的开关 / l02 五行相生：一条能量链 / l03 五行相克：互相制衡 / l04 五行在生活里
- 第二章「认识八卦」：l05 乾：天行健 / l06 坤：大地母亲 / l07 震：一声惊雷 / l08 巽：无孔不入的风 / l09 坎：水与险 / l10 离：火与光明 / l11 艮：稳如山 / l12 兑：喜悦之泽
- 第三章「六十四卦入门」：l13 卦是怎么叠出来的 / l14 怎么读一条卦辞 / l15 乾卦精讲 / l16 坤卦精讲 / l17 泰与否：好坏互转 / l18 既济与未济：完成与未完成 / l19 谦卦：最受欢迎的卦 / l20 结业：你的易学地图

每关固定 3 道题，`answer` 为正确选项下标（0-3）。

- [ ] **Step 2: 写 src/data/fengshui.json（6 场景 × 5 条 = 30 条）**

Schema 与一条完整样例：

```json
[
  {
    "id": "f01",
    "scene": "客厅",
    "kind": "宜",
    "summary": "沙发靠实墙摆放",
    "detail": "传统说法认为背后有靠象征有依靠、安全感。从生活角度看，背靠实墙的座位不会有人从身后经过，确实坐得更安心。"
  }
]
```

场景固定 6 个：客厅、卧室、书桌、玄关、厨房、办公位，每个场景 5 条（宜/忌混合），`kind` 取值仅 `宜` 或 `忌`。`detail` 需包含传统说法 + 现代生活视角两层解释。

- [ ] **Step 3: 写 src/data/quiz.json（100 题）**

Schema 与一条完整样例：

```json
[
  {
    "id": "q001",
    "q": "八卦中象征「天」的是哪一卦？",
    "options": ["坤", "乾", "坎", "离"],
    "answer": 1,
    "difficulty": "easy",
    "explain": "乾三连，象征天，性质刚健。"
  }
]
```

要求：100 题；`difficulty` 分布 easy≥40、medium≥35、hard≥15；内容覆盖阴阳五行、八卦、64 卦常识、风水小知识四类，均出自 lessons/fengshui/hexagrams 已有内容，不引入未讲过的知识点。

- [ ] **Step 4: 写 src/data/badges.json（24 枚 = 6 指标 × 4 档）**

完整规则：`metric` 六种 × 各 4 个 `threshold` 档位。完整文件结构（24 条全列出，图标与命名按此表）：

| metric | 档位 thresholds | 徽章名（依次） | icon |
|---|---|---|---|
| lessons_completed | 1 / 5 / 12 / 20 | 初窥门径 / 渐入佳境 / 登堂入室 / 易学小成 | 📖 |
| fengshui_read | 5 / 10 / 20 / 30 | 风生水起 / 察风观水 / 布局有道 / 风水通鉴 | 🏮 |
| quiz_best_score | 100 / 200 / 350 / 500 | 小试牛刀 / 对答如流 / 胸有成竹 / 题海无敌 | ⚔️ |
| quiz_best_combo | 3 / 5 / 8 / 10 | 三连小胜 / 五连出击 / 八连暴走 / 十连封神 | 🔥 |
| streak_days | 2 / 7 / 14 / 30 | 两天打卡 / 七日之约 / 半月同行 / 月度学霸 | 📅 |
| lingyun | 100 / 500 / 1500 / 3000 | 灵光乍现 / 灵蕴充盈 / 灵台清明 / 灵蕴大师 | ⭐ |

单条 schema：

```json
{ "id": "b_lessons_1", "metric": "lessons_completed", "threshold": 1, "name": "初窥门径", "icon": "📖", "desc": "通过第 1 个关卡" }
```

`id` 规则：`b_<metric缩写>_<档位1-4>`，依次为 `b_lessons_*`、`b_fengshui_*`、`b_score_*`、`b_combo_*`、`b_streak_*`、`b_lingyun_*`。

- [ ] **Step 5: 在 tests/data.test.js 追加校验**

```js
import lessons from '../src/data/lessons.json'
import fengshui from '../src/data/fengshui.json'
import quiz from '../src/data/quiz.json'
import badges from '../src/data/badges.json'

describe('lessons.json', () => {
  it('20 关、每关 3 题、答案下标合法', () => {
    expect(lessons).toHaveLength(20)
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
  it('章节划分正确（4+8+8）', () => {
    expect(lessons.filter(l => l.chapter === 1)).toHaveLength(4)
    expect(lessons.filter(l => l.chapter === 2)).toHaveLength(8)
    expect(lessons.filter(l => l.chapter === 3)).toHaveLength(8)
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
})
```

- [ ] **Step 6: 运行测试到全绿**

```powershell
npm test
```
Expected: `tests/data.test.js` 全部 PASS。

- [ ] **Step 7: Commit**

```powershell
git add -A; git commit -m "feat: 课程/风水/题库/徽章数据及校验"
```

---

### Task 4: 核心算法 utils（TDD）

**Files:**
- Create: `src/utils/divination.js`, `src/utils/daily.js`, `src/utils/scoring.js`, `src/utils/badges.js`
- Test: `tests/divination.test.js`, `tests/daily.test.js`, `tests/scoring.test.js`, `tests/badges.test.js`

- [ ] **Step 1: 写失败测试 tests/divination.test.js**

```js
import { describe, it, expect } from 'vitest'
import { castLine, castHexagram, findHexagram, interpret } from '../src/utils/divination'

// 固定序列 rng 工具
function seqRng(values) {
  let i = 0
  return () => values[i++ % values.length]
}

describe('castLine 三枚铜钱', () => {
  it('三背 = 老阳 9（阳爻、变爻）', () => {
    const l = castLine(seqRng([0.4, 0.4, 0.4])) // <0.5 视为背
    expect(l.value).toBe(9)
    expect(l.yang).toBe(true)
    expect(l.changing).toBe(true)
  })
  it('三字 = 老阴 6（阴爻、变爻）', () => {
    const l = castLine(seqRng([0.6, 0.6, 0.6]))
    expect(l.value).toBe(6)
    expect(l.yang).toBe(false)
    expect(l.changing).toBe(true)
  })
  it('一背二字 = 少阳 7（阳爻、不变）', () => {
    const l = castLine(seqRng([0.4, 0.6, 0.6]))
    expect(l.value).toBe(7)
    expect(l.yang).toBe(true)
    expect(l.changing).toBe(false)
  })
  it('二背一字 = 少阴 8（阴爻、不变）', () => {
    const l = castLine(seqRng([0.4, 0.4, 0.6]))
    expect(l.value).toBe(8)
    expect(l.yang).toBe(false)
    expect(l.changing).toBe(false)
  })
  it('随机投掷值只会是 6/7/8/9', () => {
    for (let i = 0; i < 200; i++) {
      expect([6, 7, 8, 9]).toContain(castLine().value)
    }
  })
})

describe('castHexagram', () => {
  it('生成六爻，自下而上', () => {
    expect(castHexagram()).toHaveLength(6)
  })
})

describe('findHexagram 查卦', () => {
  it('六阳 = 乾(1)，六阴 = 坤(2)', () => {
    expect(findHexagram([1, 1, 1, 1, 1, 1]).id).toBe(1)
    expect(findHexagram([0, 0, 0, 0, 0, 0]).id).toBe(2)
  })
  it('下乾上坤 = 泰(11)，下坤上乾 = 否(12)', () => {
    expect(findHexagram([1, 1, 1, 0, 0, 0]).id).toBe(11)
    expect(findHexagram([0, 0, 0, 1, 1, 1]).id).toBe(12)
  })
})

describe('interpret 解卦', () => {
  it('六个老阳：本卦乾，变卦坤，六爻皆变', () => {
    const lines = castHexagram(seqRng([0.4])) // 恒为背 → 全 9
    const r = interpret(lines)
    expect(r.origin.id).toBe(1)
    expect(r.changed.id).toBe(2)
    expect(r.changingIdx).toEqual([0, 1, 2, 3, 4, 5])
  })
  it('无变爻时 changed 为 null', () => {
    // 每爻都是 背字字=7：少阳
    const lines = castHexagram(seqRng([0.4, 0.6, 0.6]))
    const r = interpret(lines)
    expect(r.origin.id).toBe(1)
    expect(r.changed).toBeNull()
  })
})
```

- [ ] **Step 2: 运行确认失败**

```powershell
npm test
```
Expected: FAIL — `divination` 模块不存在。

- [ ] **Step 3: 实现 src/utils/divination.js**

```js
import hexagrams from '../data/hexagrams.json'
import trigrams from '../data/trigrams.json'

// 三枚铜钱掷一爻：背=3、字=2；6 老阴 / 7 少阳 / 8 少阴 / 9 老阳
export function castLine(rng = Math.random) {
  let sum = 0
  const coins = []
  for (let i = 0; i < 3; i++) {
    const back = rng() < 0.5
    coins.push(back ? '背' : '字')
    sum += back ? 3 : 2
  }
  return { value: sum, coins, yang: sum % 2 === 1, changing: sum === 6 || sum === 9 }
}

// 六爻自下而上
export function castHexagram(rng = Math.random) {
  return Array.from({ length: 6 }, () => castLine(rng))
}

const trigramByLines = new Map(trigrams.map(t => [t.lines.join(''), t.key]))

// bits: 长度 6，自下而上，1 阳 0 阴
export function findHexagram(bits) {
  const lower = trigramByLines.get(bits.slice(0, 3).join(''))
  const upper = trigramByLines.get(bits.slice(3, 6).join(''))
  return hexagrams.find(h => h.lower === lower && h.upper === upper)
}

export function interpret(lines) {
  const bits = lines.map(l => (l.yang ? 1 : 0))
  const origin = findHexagram(bits)
  const changingIdx = lines.map((l, i) => (l.changing ? i : -1)).filter(i => i >= 0)
  let changed = null
  if (changingIdx.length > 0) {
    const cb = [...bits]
    for (const i of changingIdx) cb[i] = cb[i] ? 0 : 1
    changed = findHexagram(cb)
  }
  return { origin, changed, changingIdx }
}
```

- [ ] **Step 4: 写失败测试 daily / scoring / badges**

`tests/daily.test.js`：

```js
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
```

`tests/scoring.test.js`：

```js
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
```

`tests/badges.test.js`：

```js
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
    const got = newlyUnlocked(makeState({ completedLessons: ['a', 'b', 'c', 'd', 'e'] }))
    expect(got.map(b => b.id)).toEqual(expect.arrayContaining(['b_lessons_1', 'b_lessons_2']))
  })
})
```

- [ ] **Step 5: 实现三个 util**

`src/utils/daily.js`：

```js
import hexagrams from '../data/hexagrams.json'

// 按日期字符串哈希取卦，当天全站恒定
export function dailyHexagram(date = new Date()) {
  const s = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return hexagrams[h % 64]
}
```

`src/utils/scoring.js`：

```js
export const BASE_SCORE = 10

// combo 为本题答对后的连击数（从 1 起）
export function comboScore(combo) {
  return Math.round(BASE_SCORE * (1 + 0.1 * (combo - 1)))
}
```

`src/utils/badges.js`：

```js
import badges from '../data/badges.json'

function metricsFrom(state) {
  return {
    lessons_completed: state.completedLessons.length,
    fengshui_read: state.readFengshui.length,
    quiz_best_score: state.quizBest.score,
    quiz_best_combo: state.quizBest.combo,
    streak_days: state.streak.days,
    lingyun: state.lingyun
  }
}

// 返回本次新达成的徽章对象数组
export function newlyUnlocked(state) {
  const m = metricsFrom(state)
  return badges.filter(b => !state.badges.includes(b.id) && m[b.metric] >= b.threshold)
}
```

- [ ] **Step 6: 全部测试转绿**

```powershell
npm test
```
Expected: 全部 PASS。

- [ ] **Step 7: Commit**

```powershell
git add -A; git commit -m "feat: 起卦/每日一卦/积分/徽章核心算法（TDD）"
```

---

### Task 5: 进度 store（Pinia + localStorage 容错，TDD）

**Files:**
- Create: `src/stores/progress.js`
- Test: `tests/progress.test.js`

- [ ] **Step 1: 写失败测试 tests/progress.test.js**

```js
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
```

- [ ] **Step 2: 运行确认失败**

```powershell
npm test
```
Expected: FAIL — store 不存在。

- [ ] **Step 3: 实现 src/stores/progress.js**

```js
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
```

- [ ] **Step 4: 测试转绿**

```powershell
npm test
```
Expected: 全部 PASS。

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: 用户进度 store（持久化/容错/徽章判定）"
```

---

### Task 6: 通用组件（卦象图 / 翻转卡 / 徽章 / 免责声明）

**Files:**
- Create: `src/components/HexagramFigure.vue`, `src/components/FlipCard.vue`, `src/components/BadgeItem.vue`, `src/components/DisclaimerBar.vue`

- [ ] **Step 1: 写 src/components/HexagramFigure.vue（六爻横线图，顶部为上爻，变爻标红）**

```vue
<script setup>
defineProps({
  bits: { type: Array, required: true },       // 自下而上 0/1
  changing: { type: Array, default: () => [] } // 变爻下标（0=初爻）
})
</script>

<template>
  <div class="hex">
    <div v-for="i in [5, 4, 3, 2, 1, 0]" :key="i" class="line" :class="{ changing: changing.includes(i) }">
      <span v-if="bits[i]" class="seg"></span>
      <template v-else>
        <span class="seg"></span>
        <span class="seg"></span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.hex { display: inline-flex; flex-direction: column; gap: 7px; }
.line { display: flex; gap: 10px; width: 88px; height: 11px; }
.seg { flex: 1; background: var(--ink); border-radius: 2px; }
.line.changing .seg { background: var(--cinnabar); }
</style>
```

- [ ] **Step 2: 写 src/components/FlipCard.vue（点击翻面，首次翻开触发 open 事件）**

```vue
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['open'])
const flipped = ref(false)
let opened = false
function toggle() {
  flipped.value = !flipped.value
  if (flipped.value && !opened) {
    opened = true
    emit('open')
  }
}
</script>

<template>
  <div class="flip" :class="{ flipped }" @click="toggle">
    <div class="face front"><slot name="front" /></div>
    <div class="face back"><slot name="back" /></div>
  </div>
</template>

<style scoped>
.flip { position: relative; perspective: 900px; cursor: pointer; min-height: 150px; }
.face {
  position: absolute; inset: 0; backface-visibility: hidden; transition: transform .5s;
  background: #fff; border: 1px solid var(--line); border-radius: 14px;
  padding: 14px; box-shadow: 0 3px 0 var(--card-shadow);
}
.front { transform: rotateY(0); }
.back { transform: rotateY(180deg); overflow: auto; font-size: 13px; color: var(--ink-2); }
.flipped .front { transform: rotateY(-180deg); }
.flipped .back { transform: rotateY(0); }
</style>
```

- [ ] **Step 3: 写 src/components/BadgeItem.vue**

```vue
<script setup>
defineProps({
  badge: { type: Object, required: true },
  unlocked: { type: Boolean, default: false }
})
</script>

<template>
  <div class="badge" :class="{ unlocked }" :title="badge.desc">
    <span class="icon">{{ unlocked ? badge.icon : '🔒' }}</span>
    <span class="name">{{ badge.name }}</span>
  </div>
</template>

<style scoped>
.badge {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 10px 4px; border-radius: 12px; background: var(--paper-2);
  opacity: .45; font-size: 12px; color: var(--ink-2);
}
.badge.unlocked { opacity: 1; background: #fff; border: 1px solid var(--line); box-shadow: 0 2px 0 var(--card-shadow); }
.icon { font-size: 22px; }
</style>
```

- [ ] **Step 4: 写 src/components/DisclaimerBar.vue**

```vue
<template>
  <p class="disclaimer">☯ 本站内容仅供传统文化学习与娱乐，不构成任何现实决策建议。</p>
</template>

<style scoped>
.disclaimer {
  margin-top: 24px; padding: 10px; text-align: center;
  font-size: 12px; color: var(--muted);
  border-top: 1px dashed var(--line);
}
</style>
```

- [ ] **Step 5: 构建验证 + Commit**

```powershell
npm run build; git add -A; git commit -m "feat: 通用组件（卦象图/翻转卡/徽章/免责声明）"
```
Expected: build 成功。

---

### Task 7: 首页 HomeView

**Files:**
- Modify: `src/views/HomeView.vue`（替换占位）

- [ ] **Step 1: 实现 src/views/HomeView.vue**

```vue
<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import { dailyHexagram } from '../utils/daily'
import BadgeItem from '../components/BadgeItem.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import badges from '../data/badges.json'
import lessons from '../data/lessons.json'

const store = useProgressStore()
const daily = dailyHexagram()
const lessonPct = computed(() => Math.round(store.completedLessons.length / lessons.length * 100))

const modules = [
  { to: '/lessons', icon: '📖', title: '易经学堂', sub: () => `已学 ${store.completedLessons.length}/${lessons.length} 关` },
  { to: '/fengshui', icon: '🏮', title: '风水小知识', sub: () => `已读 ${store.readFengshui.length} 条` },
  { to: '/divination', icon: '🪙', title: '趣味起卦', sub: () => '摇一摇铜钱' },
  { to: '/quiz', icon: '⚔️', title: '答题闯关', sub: () => `最高连击 ×${store.quizBest.combo}` }
]
</script>

<template>
  <div class="page">
    <section class="daily card">
      <div class="daily-label">每 日 一 卦</div>
      <div class="daily-symbol">{{ daily.symbol }}</div>
      <h2>{{ daily.fullName }}</h2>
      <p class="guaci">{{ daily.guaci }}</p>
      <p class="plain">{{ daily.plain }}</p>
      <p class="fun">💡 {{ daily.fun }}</p>
    </section>

    <section class="modules">
      <RouterLink v-for="m in modules" :key="m.to" :to="m.to" class="card module">
        <span class="m-icon">{{ m.icon }}</span>
        <b>{{ m.title }}</b>
        <span class="m-sub">{{ m.sub() }}</span>
        <div v-if="m.to === '/lessons'" class="progress-track">
          <div class="progress-fill" :style="{ width: lessonPct + '%' }"></div>
        </div>
      </RouterLink>
    </section>

    <section class="card stats">
      <b>我的成就</b>
      <div class="stat-row">
        <span>⭐ 灵蕴值 {{ store.lingyun }}</span>
        <span>🏅 徽章 {{ store.badges.length }}/24</span>
        <span>🔥 连续 {{ store.streak.days }} 天</span>
      </div>
      <div class="badge-wall">
        <BadgeItem v-for="b in badges" :key="b.id" :badge="b" :unlocked="store.badges.includes(b.id)" />
      </div>
    </section>

    <DisclaimerBar />
  </div>
</template>

<style scoped>
.daily { text-align: center; background: linear-gradient(135deg, #fffdf7, #f3ecd9); }
.daily-label { font-size: 12px; color: var(--cinnabar); letter-spacing: 4px; }
.daily-symbol { font-size: 46px; line-height: 1.3; }
.guaci { color: var(--ink-2); font-size: 14px; margin: 4px 0; }
.plain { font-size: 14px; max-width: 560px; margin: 6px auto; }
.fun { font-size: 13px; color: var(--cinnabar); margin-top: 6px; }
.modules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 14px; }
.module { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.m-icon { font-size: 26px; }
.m-sub { font-size: 12px; color: var(--muted); }
.module .progress-track { width: 100%; }
.stats { margin-top: 14px; }
.stat-row { display: flex; gap: 18px; font-size: 13px; color: var(--ink-2); margin: 8px 0 12px; flex-wrap: wrap; }
.badge-wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(86px, 1fr)); gap: 8px; }
@media (max-width: 720px) {
  .modules { grid-template-columns: 1fr 1fr; }
}
</style>
```

- [ ] **Step 2: 本地验证**

```powershell
npm run dev
```
浏览器检查：每日一卦正常、四模块卡可点、徽章墙 24 枚全部锁定态、窄屏下变两列。

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "feat: 首页（每日一卦/模块入口/成就墙）"
```

---

### Task 8: 易经学堂 LessonsView（关卡地图 + 学习/小测）

**Files:**
- Modify: `src/views/LessonsView.vue`（替换占位）

- [ ] **Step 1: 实现 src/views/LessonsView.vue**

同页两态：`current === null` 显示关卡地图；否则显示该关「知识页 → 逐题小测 → 结算」。规则：选错可重选直到答对（显示解析）；全部首选即对奖励 30 灵蕴值，否则 15。

```vue
<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import lessons from '../data/lessons.json'

const store = useProgressStore()
const current = ref(null)      // 当前关对象
const phase = ref('read')      // read | quiz | done
const qIdx = ref(0)            // 当前题号
const picked = ref(null)       // 本题已选下标
const firstTryAll = ref(true)  // 是否全部首选即对
const answeredRight = ref(false)

const chapters = computed(() => {
  const map = new Map()
  lessons.forEach((l, i) => {
    if (!map.has(l.chapter)) map.set(l.chapter, { name: l.chapterName, items: [] })
    map.get(l.chapter).items.push({ ...l, index: i })
  })
  return [...map.values()]
})

function isUnlocked(index) { return index < store.unlockedCount }
function isDone(id) { return store.completedLessons.includes(id) }

function open(lesson, index) {
  if (!isUnlocked(index)) return
  current.value = lesson
  phase.value = 'read'
  qIdx.value = 0
  picked.value = null
  firstTryAll.value = true
  answeredRight.value = false
}

function pick(i) {
  if (answeredRight.value) return
  picked.value = i
  const q = current.value.questions[qIdx.value]
  if (i === q.answer) {
    answeredRight.value = true
  } else {
    firstTryAll.value = false
  }
}

function nextQuestion() {
  if (qIdx.value < 2) {
    qIdx.value++
    picked.value = null
    answeredRight.value = false
  } else {
    store.completeLesson(current.value.id, firstTryAll.value ? 30 : 15)
    phase.value = 'done'
  }
}
</script>

<template>
  <div class="page">
    <!-- 关卡地图 -->
    <template v-if="!current">
      <h1 class="page-title">📖 易经学堂</h1>
      <p class="page-sub">从阴阳到六十四卦，一关一关打通关</p>
      <section v-for="(ch, ci) in chapters" :key="ci" class="chapter">
        <h3 class="ch-name">第{{ ['一', '二', '三'][ci] }}章 · {{ ch.name }}</h3>
        <div class="levels">
          <button v-for="l in ch.items" :key="l.id" class="level card"
            :class="{ locked: !isUnlocked(l.index), done: isDone(l.id) }"
            @click="open(l, l.index)">
            <span class="lv-icon">{{ isDone(l.id) ? '✅' : isUnlocked(l.index) ? '▶' : '🔒' }}</span>
            <span class="lv-title">{{ l.title }}</span>
          </button>
        </div>
      </section>
    </template>

    <!-- 知识页 -->
    <template v-else-if="phase === 'read'">
      <button class="btn btn-ghost" @click="current = null">← 返回地图</button>
      <h1 class="page-title">{{ current.title }}</h1>
      <div v-for="(b, i) in current.content" :key="i" class="block" :class="b.type">
        <p>{{ b.type === 'tip' ? '💡 ' + b.value : b.value }}</p>
      </div>
      <button class="btn" @click="phase = 'quiz'">开始小测 ▶</button>
    </template>

    <!-- 小测 -->
    <template v-else-if="phase === 'quiz'">
      <p class="page-sub">第 {{ qIdx + 1 }}/3 题</p>
      <h2 class="question">{{ current.questions[qIdx].q }}</h2>
      <div class="options">
        <button v-for="(op, i) in current.questions[qIdx].options" :key="i" class="card option"
          :class="{ right: answeredRight && i === current.questions[qIdx].answer, wrong: picked === i && i !== current.questions[qIdx].answer }"
          @click="pick(i)">{{ op }}</button>
      </div>
      <p v-if="picked !== null && !answeredRight" class="explain wrong-tip">再想想～</p>
      <p v-if="answeredRight" class="explain">✔ {{ current.questions[qIdx].explain }}</p>
      <button v-if="answeredRight" class="btn" @click="nextQuestion">{{ qIdx < 2 ? '下一题' : '完成关卡' }}</button>
    </template>

    <!-- 结算 -->
    <template v-else>
      <div class="card result">
        <div style="font-size:40px">🎉</div>
        <h2>通关！{{ current.title }}</h2>
        <p>获得灵蕴值 +{{ firstTryAll ? 30 : 15 }}</p>
        <p v-if="store.lastUnlocked.length" class="unlock">🏅 解锁徽章：{{ store.lastUnlocked.map(b => b.name).join('、') }}</p>
        <button class="btn" @click="current = null">返回关卡地图</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.chapter { margin-bottom: 20px; }
.ch-name { margin-bottom: 10px; color: var(--ink-2); font-size: 15px; }
.levels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.level { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; text-align: left; }
.level.locked { opacity: .45; cursor: not-allowed; }
.level.done { border-color: var(--good); }
.block { margin: 12px 0; }
.block.tip { background: var(--paper-2); border-radius: 10px; padding: 10px 14px; font-size: 14px; }
.question { margin: 8px 0 14px; }
.options { display: grid; gap: 10px; margin-bottom: 12px; }
.option { cursor: pointer; text-align: left; font-size: 14px; }
.option.right { border-color: var(--good); background: #f0f8f4; }
.option.wrong { border-color: var(--cinnabar); background: #fbf0f0; }
.explain { font-size: 13px; color: var(--good); margin-bottom: 12px; }
.wrong-tip { color: var(--cinnabar); }
.result { text-align: center; padding: 30px; }
.unlock { color: var(--cinnabar); font-size: 14px; }
@media (max-width: 720px) { .levels { grid-template-columns: 1fr 1fr; } }
</style>
```

- [ ] **Step 2: 本地验证**

`npm run dev` 检查：只有第 1 关可点；通关后第 2 关解锁；答错后可重选；首关通关弹徽章提示；刷新后进度保留。

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "feat: 易经学堂关卡学习与小测"
```

---

### Task 9: 风水小知识 FengshuiView

**Files:**
- Modify: `src/views/FengshuiView.vue`（替换占位）

- [ ] **Step 1: 实现 src/views/FengshuiView.vue**

```vue
<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import FlipCard from '../components/FlipCard.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import fengshui from '../data/fengshui.json'

const store = useProgressStore()
const scenes = ['客厅', '卧室', '书桌', '玄关', '厨房', '办公位']
const active = ref('客厅')
const cards = computed(() => fengshui.filter(f => f.scene === active.value))
</script>

<template>
  <div class="page">
    <h1 class="page-title">🏮 风水小知识</h1>
    <p class="page-sub">点卡片翻面看原理 · 已读 {{ store.readFengshui.length }}/{{ fengshui.length }}</p>

    <div class="tabs">
      <button v-for="s in scenes" :key="s" class="tab" :class="{ on: active === s }" @click="active = s">{{ s }}</button>
    </div>

    <div class="grid">
      <FlipCard v-for="c in cards" :key="c.id" @open="store.readCard(c.id)">
        <template #front>
          <span class="tag" :class="c.kind === '宜' ? 'tag-good' : 'tag-bad'">{{ c.kind }}</span>
          <p class="summary">{{ c.summary }}</p>
          <span v-if="store.readFengshui.includes(c.id)" class="read">✓ 已读</span>
          <span class="hint">点击翻面 ↻</span>
        </template>
        <template #back>{{ c.detail }}</template>
      </FlipCard>
    </div>

    <DisclaimerBar />
  </div>
</template>

<style scoped>
.tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.tab {
  border: 1px solid var(--line); background: #fff; padding: 5px 16px;
  border-radius: 18px; cursor: pointer; font-size: 13px; color: var(--ink-2);
}
.tab.on { background: var(--cinnabar); border-color: var(--cinnabar); color: #fff; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.summary { font-size: 15px; margin-top: 8px; }
.read { position: absolute; top: 10px; right: 12px; font-size: 11px; color: var(--good); }
.hint { position: absolute; bottom: 10px; right: 12px; font-size: 11px; color: var(--muted); }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: 本地验证**

`npm run dev` 检查：切换场景正常；翻卡后已读数 +1 且刷新保留；重复翻同一张不重复计数。

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "feat: 风水小知识翻卡页"
```

---

### Task 10: 趣味起卦 DivinationView

**Files:**
- Modify: `src/views/DivinationView.vue`（替换占位）

- [ ] **Step 1: 实现 src/views/DivinationView.vue**

交互：点「摇铜钱」按钮逐爻生成（每 500ms 一爻，共 6 次），完成后展示本卦/变卦解读。

```vue
<script setup>
import { ref, computed } from 'vue'
import { castLine, interpret } from '../utils/divination'
import HexagramFigure from '../components/HexagramFigure.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'

const lines = ref([])        // 已掷出的爻（自下而上）
const casting = ref(false)
const result = ref(null)

const bits = computed(() => lines.value.map(l => (l.yang ? 1 : 0)))
const changing = computed(() => lines.value.map((l, i) => (l.changing ? i : -1)).filter(i => i >= 0))

function start() {
  lines.value = []
  result.value = null
  casting.value = true
  const timer = setInterval(() => {
    lines.value.push(castLine())
    if (lines.value.length === 6) {
      clearInterval(timer)
      casting.value = false
      result.value = interpret(lines.value)
    }
  }, 500)
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">🪙 趣味起卦</h1>
    <p class="page-sub">三枚铜钱摇六次，看看今天掷出什么卦</p>

    <div class="stage card">
      <HexagramFigure v-if="lines.length" :bits="bits" :changing="changing" />
      <p v-else class="placeholder-text">卦象将在这里自下而上生长</p>
      <div class="coins" v-if="lines.length">
        <span v-for="(l, i) in lines" :key="i" class="coin-row">第{{ i + 1 }}爻 {{ l.coins.join(' ') }} → {{ l.value }}</span>
      </div>
      <button class="btn" :disabled="casting" @click="start">{{ casting ? '摇卦中…' : lines.length ? '再摇一次' : '摇铜钱 🪙' }}</button>
    </div>

    <div v-if="result" class="reading">
      <div class="card">
        <h3>本卦 · {{ result.origin.fullName }} {{ result.origin.symbol }}</h3>
        <p class="guaci">{{ result.origin.guaci }}</p>
        <p>{{ result.origin.plain }}</p>
        <p class="fun">💡 {{ result.origin.fun }}</p>
      </div>
      <div v-if="result.changed" class="card">
        <h3>变卦 · {{ result.changed.fullName }} {{ result.changed.symbol }}</h3>
        <p class="sub">有 {{ result.changingIdx.length }} 个变爻（红色），事情可能向这个方向发展：</p>
        <p>{{ result.changed.plain }}</p>
      </div>
      <div v-else class="card"><p class="sub">无变爻，卦象稳定，参照本卦即可。</p></div>
    </div>

    <DisclaimerBar />
  </div>
</template>

<style scoped>
.stage { text-align: center; padding: 26px; }
.placeholder-text { color: var(--muted); font-size: 13px; }
.coins { display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: var(--muted); margin: 12px 0; }
.stage .btn { margin-top: 10px; }
.reading { display: grid; gap: 12px; margin-top: 14px; }
.guaci { color: var(--ink-2); font-size: 14px; margin: 4px 0; }
.fun { color: var(--cinnabar); font-size: 13px; margin-top: 6px; }
.sub { font-size: 13px; color: var(--muted); }
</style>
```

- [ ] **Step 2: 本地验证**

`npm run dev` 检查：逐爻动画生长；变爻标红；有/无变卦两种结果都能出现；免责声明可见。

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "feat: 铜钱起卦互动页"
```

---

### Task 11: 答题闯关 QuizView

**Files:**
- Modify: `src/views/QuizView.vue`（替换占位）

- [ ] **Step 1: 实现 src/views/QuizView.vue**

规则：抽 10 题；每题 15 秒，超时算错；3 命，答错/超时扣 1 命且连击归零；答对得 `comboScore(combo)` 分；命尽或题完结算，调 `store.finishQuiz(score, maxCombo)`。

```vue
<script setup>
import { ref, onUnmounted } from 'vue'
import { useProgressStore } from '../stores/progress'
import { comboScore } from '../utils/scoring'
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
      <div style="font-size:40px">⚔️</div>
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
      <div style="font-size:40px">{{ rightCount >= 8 ? '🏆' : rightCount >= 5 ? '🎉' : '💪' }}</div>
      <h2>得分 {{ score }}</h2>
      <p>答对 {{ rightCount }}/{{ qIdx + 1 }} · 最高连击 ×{{ maxCombo }} · 灵蕴值 +{{ Math.round(score / 2) }}</p>
      <p v-if="store.lastUnlocked.length" class="unlock">🏅 新徽章：{{ store.lastUnlocked.map(b => b.name).join('、') }}</p>
      <button class="btn" @click="start">再来一局</button>
      <RouterLink to="/" class="btn btn-ghost" style="margin-left:10px">回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.center { text-align: center; padding: 34px; }
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
```

- [ ] **Step 2: 本地验证**

`npm run dev` 检查：倒计时走字、超时扣命；连击分递增；3 错提前结算；破纪录后首页最佳成绩更新。

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "feat: 限时答题闯关玩法"
```

---

### Task 12: 收尾验收

**Files:**
- Modify: 无新文件，修复验收中发现的问题

- [ ] **Step 1: 全量测试 + 构建**

```powershell
npm test; npm run build
```
Expected: 测试全部 PASS，build 成功。

- [ ] **Step 2: 预览走查**

```powershell
npm run preview
```
验收清单（桌面 + 手机视口各过一遍）：
1. 首页：每日一卦展示、四模块跳转、徽章墙
2. 学堂：顺序解锁、通关奖励、刷新保留
3. 风水：翻卡计数、场景切换
4. 起卦：动画、变卦、免责声明
5. 闯关：计时/连击/命数/结算/徽章
6. 刷新后所有进度保留；堆测：手动把 localStorage 改成非法 JSON 后刷新不白屏
7. 直接访问不存在路径（如 /xxx）重定向首页

- [ ] **Step 3: 修复发现的问题并提交**

```powershell
git add -A; git commit -m "fix: 验收走查问题修复"
```
若无问题可跳过。

- [ ] **Step 4: 最终提交**

```powershell
git add -A; git commit -m "chore: 首版验收完成" --allow-empty
```

---

## 自检记录（规格覆盖）

- ✅ 5 页面 ↔ Task 1/7/8/9/10/11
- ✅ 6 个数据文件 ↔ Task 2/3
- ✅ 起卦/每日一卦/积分/徽章算法 ↔ Task 4
- ✅ localStorage 持久化与容错 ↔ Task 5（测试覆盖损坏/结构不符）
- ✅ 响应式两端 ↔ Task 1 导航壳 + 各 view 媒体查询 + Task 12 走查
- ✅ 免责声明 ↔ DisclaimerBar（首页/风水/起卦页引用）
- ✅ 路由兜底重定向 ↔ Task 1 catch-all

