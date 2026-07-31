# 易研社全站图文增强实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为全站 8 个页面新增 16 个纯静态手写 SVG 插画/信息图组件，让页面更生动、概念更易懂。

**Architecture:** 所有插画组件放 `src/components/art/`，SVG 内联、颜色引用现有 CSS 变量；课程配图通过 lessons.json 新增 `figure` 内容块 + `figureMap.js` 映射表接入；其余页面直接引组件。零新依赖、零图片文件。

**Tech Stack:** Vue 3 SFC（`<script setup>`）、内联 SVG、Vitest。

**说明：** 纯装饰性 SVG 的内部 path 坐标属于创作内容，无"唯一正确写法"，计划中以精确绘制规格（元素清单、viewBox、配色变量、props 契约）代替逐行 path 代码；所有逻辑代码（映射表、视图接入、测试、数据块）均给出完整代码。

**通用组件规格（所有 art 组件遵守）：**
- 文件头注释一行说明用途
- 根元素为 `<svg>`，设 `viewBox`，宽度默认 `100%` 或固定值，可用 `width` prop 覆盖
- 颜色只用：`var(--paper)` `var(--paper-2)` `var(--ink)` `var(--ink-2)` `var(--muted)` `var(--cinnabar)` `var(--line)` `var(--good)`，以及上述色的透明度变体（fill-opacity）
- 带枚举 props 的组件对未知值整体 `v-if` 不渲染，不抛错
- `aria-hidden="true"`（纯装饰）或 `role="img"` + `<title>`（信息图）

---

### Task 1: figureMap 映射表 + 数据测试 + lessons.json 配图块

**Files:**
- Create: `src/components/art/figureMap.js`
- Modify: `src/data/lessons.json`（8 个关卡插入 9 个 figure 块）
- Modify: `tests/data.test.js`（lessons describe 块内追加用例）

- [ ] **Step 1.1: 在 `tests/data.test.js` 的 `describe('lessons.json')` 内追加失败测试**

```js
  it('figure 块的 value 均已在 figureMap 注册', async () => {
    const { figureMap } = await import('../src/components/art/figureMap.js')
    const figures = lessons.flatMap(l => l.content.filter(b => b.type === 'figure'))
    expect(figures.length).toBeGreaterThanOrEqual(8)
    for (const f of figures) {
      expect(Object.keys(figureMap), `未注册的图名: ${f.value}`).toContain(f.value)
    }
  })
```

- [ ] **Step 1.2: 运行 `npx vitest run tests/data.test.js`，预期 FAIL（figureMap.js 不存在）**

- [ ] **Step 1.3: 创建 `src/components/art/figureMap.js`**

```js
// 课程配图注册表：lessons.json 中 type=figure 块的 value → 组件
import TaijiFigure from './TaijiFigure.vue'
import YaoFigure from './YaoFigure.vue'
import BaguaWheel from './BaguaWheel.vue'
import WuxingRing from './WuxingRing.vue'
import HexagramStack from './HexagramStack.vue'

export const figureMap = {
  taiji: TaijiFigure,
  yao: YaoFigure,
  bagua: BaguaWheel,
  wuxing: WuxingRing,
  stack: HexagramStack
}
```

（此时 5 个 .vue 尚不存在，Task 2 创建后测试才能通过——本任务与 Task 2 同一提交。）

- [ ] **Step 1.4: 修改 `src/data/lessons.json`，在下列关卡 content 数组指定位置插入 figure 块**

| 关卡 | 插入位置 | 块 |
|---|---|---|
| l01 阴阳 | 第 2 个 text 之后 | `{"type":"figure","value":"taiji"}` |
| l02 五行相生 | 第 2 个 text 之后 | `{"type":"figure","value":"wuxing"}` |
| l03 五行相克 | 第 2 个 text 之后 | `{"type":"figure","value":"wuxing"}` |
| l05 乾 | 第 1 个 text 之后 | `{"type":"figure","value":"bagua"}` |
| l12 兑（章末） | tip 之前 | `{"type":"figure","value":"bagua"}` |
| l13 卦是怎么叠出来的 | 第 1 个 text 之后插 `yao`，第 2 个 text 之后插 `stack` | 两块 |
| l21 什么是爻辞 | 第 1 个 text 之后 | `{"type":"figure","value":"yao"}` |
| l22 爻位与时机 | 第 1 个 text 之后 | `{"type":"figure","value":"yao"}` |

共 9 块、8 个关卡。其余字段不动。

### Task 2: 5 个课程信息图组件 + LessonsView 渲染接入

**Files:**
- Create: `src/components/art/TaijiFigure.vue`、`YaoFigure.vue`、`BaguaWheel.vue`、`WuxingRing.vue`、`HexagramStack.vue`
- Modify: `src/views/LessonsView.vue`

**绘制规格（均为 `role="img"` 信息图，居中显示，含 `<title>`）：**
- `TaijiFigure`：viewBox 0 0 160 160。太极图：外圆描边 var(--ink)，S 形双鱼（墨黑/宣纸白），两个鱼眼；下方两侧标注文字"阳"（--cinnabar）与"阴"（--ink-2），font-size 12。
- `YaoFigure`：viewBox 0 0 300 120。左半：一条长横线（--ink，高 10 圆角矩形）标注"阳爻 —"；右半：两条短横线标注"阴爻 --"；下方一行小字"六个爻位自下而上：初·二·三·四·五·上"（--muted，font-size 11）。
- `BaguaWheel`：viewBox 0 0 240 240。中心小太极（复用绘法，半径 28）；外环 8 个方向排布 8 组"卦符 + 卦名 + 自然象"文本（数据内联在组件里的常量数组：☰乾天、☱兑泽、☲离火、☳震雷、☴巽风、☵坎水、☶艮山、☷坤地），按先天八卦方位：乾上、坤下、离左... 采用简化均匀 45° 分布即可，卦符 font-size 18，名称 11。外圈细描边圆 var(--line)。
- `WuxingRing`：viewBox 0 0 260 240。五个圆节点按五角形分布：木(--good)、火(--cinnabar)、土(#b8860b 不可用→改用 var(--ink-2))、金(var(--muted))、水(#33658a 不可用→改用 var(--ink))，节点内白字。外环五条实线箭头（相邻，相生，--ink-2，marker 三角），内部五条虚线箭头（隔一，相克，--cinnabar，stroke-dasharray 4 3）。右下角图例两行："—→ 相生""-→ 相克"。
- `HexagramStack`：viewBox 0 0 300 170。左侧上下两组三爻小卦（上卦☲离样式三行、下卦☰乾样式三行，每行圆角矩形，阳爻整条/阴爻两段），中间"+"与"→"符号（--muted），右侧一个六行完整卦；下方小字"上卦 + 下卦 = 六爻卦（例：火天大有）"。爻条颜色 var(--ink)。

- [ ] **Step 2.1: 创建上述 5 个组件**（按规格逐个实现；每个组件 `<script setup>` 里仅 `defineProps({ width: { type: [Number, String], default: ... } })`，模板为纯 SVG）

- [ ] **Step 2.2: 修改 `src/views/LessonsView.vue` 接入 figure 渲染**

script 增加导入：

```js
import { figureMap } from '../components/art/figureMap.js'
```

模板中知识页循环（现第 82-84 行）改为：

```html
      <div v-for="(b, i) in current.content" :key="i" class="block" :class="b.type">
        <component v-if="b.type === 'figure' && figureMap[b.value]" :is="figureMap[b.value]" class="figure-img" />
        <p v-else-if="b.type !== 'figure'">{{ b.type === 'tip' ? '💡 ' + b.value : b.value }}</p>
      </div>
```

样式追加：

```css
.block.figure { display: flex; justify-content: center; padding: 10px 0; }
.figure-img { max-width: 320px; width: 100%; }
```

- [ ] **Step 2.3: 运行 `npx vitest run tests/data.test.js`，预期 PASS（Task 1 的用例转绿）**

- [ ] **Step 2.4: `npm run dev` 目检 l01/l02/l05/l13 知识页配图显示正常**

- [ ] **Step 2.5: 提交**

```bash
git add src/components/art tests/data.test.js src/data/lessons.json src/views/LessonsView.vue
git commit -m "feat: 学堂课程知识信息图（太极/爻/八卦盘/五行环/叠卦）"
```

### Task 3: TrigramIcon 八卦意象图 + 卦详情页头部

**Files:**
- Create: `src/components/art/TrigramIcon.vue`
- Modify: `src/views/HexagramDetailView.vue`

**规格：** props `trigram`（八卦 key：qian/kun/zhen/xun/kan/li/gen/dui），viewBox 0 0 96 96，外框圆角矩形描边 var(--line)、底 var(--paper-2)。8 种意象小画（组件内 v-if/v-else-if 分支或映射渲染）：
- qian 天：三朵层叠云弧 + 右上红日（--cinnabar）
- kun 地：三道起伏地平线 + 两株小草
- zhen 雷：一道折线闪电（--cinnabar）+ 乌云
- xun 风：三条卷曲风纹线
- kan 水：三层波浪线
- li 火：火焰轮廓（--cinnabar）+ 内焰（--paper）
- gen 山：两座三角山峰（前深后浅）
- dui 泽：水面横线 + 三圈涟漪半弧

未知 key 渲染空。

- [ ] **Step 3.1: 创建 `TrigramIcon.vue`**

- [ ] **Step 3.2: 修改 `HexagramDetailView.vue` 头部**：`.head-info` 的 `.head-meta` 之后插入：

```html
        <div class="trigram-icons">
          <span class="ti"><TrigramIcon :trigram="hex.upper" /><i>上卦·{{ upperT.name }}（{{ upperT.nature }}）</i></span>
          <span class="ti"><TrigramIcon :trigram="hex.lower" /><i>下卦·{{ lowerT.name }}（{{ lowerT.nature }}）</i></span>
        </div>
```

script 导入 `import TrigramIcon from '../components/art/TrigramIcon.vue'`；样式追加：

```css
.trigram-icons { display: flex; gap: 14px; margin-top: 10px; }
.ti { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.ti svg { width: 52px; height: 52px; }
.ti i { font-style: normal; font-size: 11px; color: var(--muted); }
```

- [ ] **Step 3.3: 目检 /hexagrams/1（乾天×2）、/hexagrams/12（否：上天下地）、/hexagrams/63（既济：上水下火）**

- [ ] **Step 3.4: 提交** `git add -A; git commit -m "feat: 卦详情页上下卦自然意象图"`

### Task 4: SceneArt 场景插画 + JiugongGrid 九宫方位图（风水页）

**Files:**
- Create: `src/components/art/SceneArt.vue`、`src/components/art/JiugongGrid.vue`
- Modify: `src/views/FengshuiView.vue`、`src/components/MingguaCalc.vue`

**SceneArt 规格：** props `scene`（客厅/卧室/书桌/玄关/厨房/办公位——与 FengshuiView 的 scenes 数组严格一致），viewBox 0 0 320 96 横幅式线描（stroke var(--ink-2)，fill 少量 --paper-2/--cinnabar 点缀）：
- 客厅：沙发 + 茶几 + 挂画；卧室：床 + 床头柜 + 月亮窗；书桌：桌 + 台灯 + 书堆；玄关：门 + 地垫 + 挂衣钩；厨房：灶台 + 锅 + 抽油烟机；办公位：显示器 + 键盘 + 绿植。
未知 scene 渲染空。

**JiugongGrid 规格：** props `lucky`、`unlucky`（`[{kind, dir}]`，dir ∈ 北/南/东/西/东南/西南/东北/西北）。viewBox 0 0 240 240，3×3 宫格（格线 var(--line)）。方位到格子映射（上南下北？——采用现代地图习惯：上北下南，左西右东）：北=上中、东北=右上、东=右中、东南=右下、南=下中、西南=左下、西=左中、西北=左上、中宫显示"中"。每格显示方位字 + 吉凶标注：吉格显示 kind 字样、字色 var(--good)、底 fill #f0f8f4；凶格字色 var(--cinnabar)、底 #fbf0f0；中宫底 var(--paper-2)。组件内建 dir→格子索引映射，props 缺省时渲染空。

- [ ] **Step 4.1: 创建两个组件**

- [ ] **Step 4.2: FengshuiView 接入 SceneArt**：`.tabs` 之后、`.grid` 之前插入：

```html
      <SceneArt :scene="active" class="scene-art" />
```

script 导入组件；样式追加 `.scene-art { width: 100%; max-width: 480px; display: block; margin: 0 auto 14px; }`

- [ ] **Step 4.3: MingguaCalc 接入 JiugongGrid**：`.cols` 之后插入：

```html
      <JiugongGrid :lucky="result.lucky" :unlucky="result.unlucky" class="jiugong" />
```

script 导入 `import JiugongGrid from './art/JiugongGrid.vue'`；样式追加 `.jiugong { width: 240px; margin: 14px auto 0; display: block; }`

- [ ] **Step 4.4: 目检风水页 6 个场景切换、命卦专题计算后九宫图与表格方位一致（抽查坎命：生气东南=右下绿）**

- [ ] **Step 4.5: 提交** `git commit -m "feat: 风水场景插画与命卦九宫方位图"`

### Task 5: CoinFace 铜钱 + CloudPattern 云纹（起卦页）

**Files:**
- Create: `src/components/art/CoinFace.vue`、`src/components/art/CloudPattern.vue`
- Modify: `src/views/DivinationView.vue`

**CoinFace 规格：** props `side`（'字'|'背'，即 divination.js 中 l.coins 数组元素的实际取值——实现前先 `node -e "console.log(require('./src/utils/divination.js'))"` 或读源码确认取值，如为其他字符串则以实际为准）。viewBox 0 0 40 40：外圆（fill var(--paper-2)，描边 var(--ink-2)），中心方孔（描边同色）；"字"面方孔四周四个小字点缀（用 font-size 7 的"乾隆通宝"式样可简化为上下左右四点），"背"面左右两道弧纹。两面底色区分：字面偏亮（--paper），背面偏暗（--paper-2）。
**CloudPattern 规格：** 无 props，viewBox 0 0 400 120，三组回旋云纹线条（stroke var(--line)，fill none），整体 opacity 0.6。

- [ ] **Step 5.1: 读 `src/utils/divination.js` 确认 coins 取值后创建两个组件**

- [ ] **Step 5.2: DivinationView 接入**：`.coins` 区块（现第 37-39 行）改为：

```html
      <div class="coins" v-if="lines.length">
        <span v-for="(l, i) in lines" :key="i" class="coin-row">
          <i class="coin-label">第{{ i + 1 }}爻</i>
          <CoinFace v-for="(c, j) in l.coins" :key="j" :side="c" class="coin-svg" />
          <i class="coin-val">→ {{ l.value }}</i>
        </span>
      </div>
```

`.stage` 开头插入 `<CloudPattern class="stage-cloud" />`；script 导入两组件；样式追加：

```css
.stage { position: relative; overflow: hidden; }
.stage-cloud { position: absolute; top: 6px; left: 0; width: 100%; pointer-events: none; }
.stage > *:not(.stage-cloud) { position: relative; }
.coin-row { display: flex; align-items: center; justify-content: center; gap: 6px; }
.coin-label, .coin-val { font-style: normal; }
.coin-svg { width: 22px; height: 22px; }
```

- [ ] **Step 5.3: 目检起卦页：摇卦动画中铜钱逐行出现、云纹不遮挡按钮**

- [ ] **Step 5.4: 提交** `git commit -m "feat: 起卦页铜钱图形与云纹背景"`

### Task 6: InkHero 水墨横幅 + ModuleArt 模块插画（首页）

**Files:**
- Create: `src/components/art/InkHero.vue`、`src/components/art/ModuleArt.vue`
- Modify: `src/views/HomeView.vue`

**InkHero 规格：** viewBox 0 0 800 140，preserveAspectRatio="xMidYMid slice"。三层远山（fill var(--ink-2)/var(--muted)，opacity .25/.4/.55 由远及近）、朱砂红日（--cinnabar，opacity .85）、两组飞鸟弧线（--ink）、底部一组淡云纹（--line）。
**ModuleArt 规格：** props `kind`（'lessons'|'fengshui'|'divination'|'quiz'），viewBox 0 0 64 64：lessons=摊开书卷+书签红绳；fengshui=罗盘（圆环+指针红）；divination=两枚叠放铜钱；quiz=交叉双令旗（旗面 --cinnabar）。未知 kind 渲染空。

- [ ] **Step 6.1: 创建两个组件**

- [ ] **Step 6.2: HomeView 接入**：`.daily` section 之前插入 `<InkHero class="hero" />`；modules 数组每项增加 `art` 字段（'lessons'/'fengshui'/'divination'/'quiz'），模板 `.m-icon` 一行改为：

```html
        <ModuleArt :kind="m.art" class="m-art" />
```

（emoji `icon` 字段删除）；script 导入两组件；样式追加：

```css
.hero { width: 100%; display: block; border-radius: 14px; margin-bottom: 14px; }
.m-art { width: 44px; height: 44px; }
```

- [ ] **Step 6.3: 目检首页桌面/720px 两档宽度**

- [ ] **Step 6.4: 提交** `git commit -m "feat: 首页水墨横幅与模块入口插画"`

### Task 7: QuizBanner 令旗 + ScrollFrame 卷轴框（答题页）

**Files:**
- Create: `src/components/art/QuizBanner.vue`、`src/components/art/ScrollFrame.vue`
- Modify: `src/views/QuizView.vue`

**QuizBanner 规格：** viewBox 0 0 200 90，交叉两根旗杆（--ink-2）+ 两面三角令旗（--cinnabar，一面写白字"战"font-size 16）+ 底部缎带。
**ScrollFrame 规格：** 含默认 slot 的普通 div 容器组件（非纯 SVG）：上下各一条 SVG 卷轴横木（viewBox 0 0 400 22：圆角横杆 var(--ink-2) + 两端卷轴头圆），中间内容区背景 var(--paper) 左右细描边。模板结构：

```html
<div class="scroll-frame">
  <svg class="rod" viewBox="0 0 400 22" aria-hidden="true"><!-- 横木 --></svg>
  <div class="body"><slot /></div>
  <svg class="rod" viewBox="0 0 400 22" aria-hidden="true"><!-- 横木 --></svg>
</div>
```

- [ ] **Step 7.1: 创建两个组件**

- [ ] **Step 7.2: QuizView 接入**：开始卡片中 `⚔️` 那行（现 78 行）替换为 `<QuizBanner class="banner" />`；结算卡片（现 105-112 行）内容整体包进 `<ScrollFrame>`（.card.center 外壳保留，内层包裹）；script 导入；样式追加 `.banner { width: 170px; margin: 0 auto; display: block; }`

- [ ] **Step 7.3: 目检答题开始页与打完一局的结算页**

- [ ] **Step 7.4: 提交** `git commit -m "feat: 答题页令旗与成绩卷轴装饰"`

### Task 8: InkBrushArt 笔架（统计页）+ CloudDivider 云纹分隔线（全局）

**Files:**
- Create: `src/components/art/InkBrushArt.vue`、`src/components/art/CloudDivider.vue`
- Modify: `src/views/StatsView.vue`、`src/views/HomeView.vue`、`src/views/FengshuiView.vue`

**InkBrushArt 规格：** viewBox 0 0 120 60，山形笔架（--ink-2）+ 斜倚毛笔（笔杆 --ink-2、笔头 --ink、笔头尖一点 --cinnabar）。
**CloudDivider 规格：** viewBox 0 0 400 16，中央一组小回旋云纹 + 左右两侧向外淡出的横线（--line）。

- [ ] **Step 8.1: 创建两个组件**

- [ ] **Step 8.2: StatsView**：`.page-sub` 之后插入 `<InkBrushArt class="brush" />`，样式 `.brush { width: 110px; display: block; margin: 0 auto 12px; }`

- [ ] **Step 8.3: CloudDivider 接入两处**：HomeView `.stats` section 顶部（`<b>我的成就</b>` 之前）；FengshuiView `.section-title`（进阶专题）之前。样式各页 `.cloud-divider { width: 100%; display: block; margin: 4px 0; }`（组件根加 class）

- [ ] **Step 8.4: 目检统计页、首页成就区、风水页专题区**

- [ ] **Step 8.5: 提交** `git commit -m "feat: 统计页笔架装饰与全局云纹分隔线"`

### Task 9: 全量验证

- [ ] **Step 9.1: `npx vitest run`，预期 8 个测试文件全部 PASS**
- [ ] **Step 9.2: `npm run build`，预期构建成功无警告性错误**
- [ ] **Step 9.3: `npm run dev` + 浏览器逐页目检 8 个页面（桌面宽度 + 720px 以下移动宽度），核对规范"各页面改动"清单**
- [ ] **Step 9.4: 如目检发现视觉问题，修复后重跑 Step 9.1-9.2 再提交** `git commit -m "fix: 图文增强视觉微调"`（无问题则跳过）

## Self-Review 结论

- 规范覆盖：16 组件×8 页面全部映射到 Task 1-8；figure 校验测试在 Task 1；错误处理（未知枚举渲染空）写入通用规格 ✅
- 命名一致性：figureMap 的键（taiji/yao/bagua/wuxing/stack）与 lessons.json 插入值、Task 2 组件名一一对应 ✅
- 实况修正：课程为 36 关（非旧规范的 20 关）；场景名以 FengshuiView 实际数组为准（含书桌/玄关）；CoinFace 的 side 取值以 divination.js 实际输出为准（Task 5 首步确认）✅
