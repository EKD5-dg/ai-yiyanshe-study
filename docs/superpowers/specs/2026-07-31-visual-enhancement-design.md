# 易研社全站图文增强设计（纯静态手写 SVG）

日期：2026-07-31
状态：已确认

## 背景与目标

易研社当前所有可视化仅靠 emoji、Unicode 卦符和 CSS，页面偏"文字堆砌"。本次目标：为全站 8 个页面增加装饰氛围插画与知识可视化信息图，让页面更生动、概念更易懂。

用户已确认的决策：

1. 内容类型：装饰氛围插画 + 知识信息图两者都要
2. 制作方式：全部手写 SVG 矢量图（不使用 AI 生成位图，不引入任何图片文件）
3. 覆盖范围：全站 8 个页面
4. 交互程度：纯静态插图，不加动画、不可点击
5. 组织方式：每张图一个 Vue 组件，放 `src/components/art/` 目录

## 总体原则

- 所有插画组件统一放 `src/components/art/`，命名为 `XxxFigure.vue` / `XxxArt.vue` 等语义名
- SVG 内联在组件模板中，颜色一律引用现有 CSS 变量（`--paper`、`--ink`、`--ink-2`、`--muted`、`--cinnabar`、`--line` 等），换主题一处生效
- 每个组件接受可选 `size`/`width` prop 控制尺寸，默认适配所在场景
- 不新增 npm 依赖、不新增图片资源、不改构建配置
- 风格基调延续"新中式水墨 + 卡通游戏化"：线条简洁、留白多、朱砂红点缀

## 新增组件清单

| 组件 | 内容 | 使用位置 |
|---|---|---|
| `InkHero.vue` | 水墨横幅：远山层叠、朱砂红日、飞鸟、云纹 | 首页顶部 |
| `ModuleArt.vue` | props `kind`：书卷/罗盘/铜钱/令旗 四种小插画 | 首页四个模块入口卡（替代 emoji） |
| `TaijiFigure.vue` | 太极阴阳图 | 学堂·阴阳概念关卡 |
| `YaoFigure.vue` | 阴爻/阳爻构成示意（一长横 vs 两短横，带标注） | 学堂·爻的概念关卡 |
| `BaguaWheel.vue` | 八卦圆盘图，含卦符与自然意象文字 | 学堂·八卦关卡 |
| `WuxingRing.vue` | 五行相生（外环实线箭头）相克（内五角虚线箭头）环 | 学堂·五行关卡 |
| `HexagramStack.vue` | 上卦 + 下卦叠合成六爻卦的示意图 | 学堂·重卦关卡 |
| `TrigramIcon.vue` | props `trigram`（八卦 key）：天/地/雷/风/水/火/山/泽 8 种自然意象小画 | 卦详情页头部（上卦、下卦各一幅） |
| `SceneArt.vue` | props `scene`：客厅/卧室/厨房/书房/门厅/办公位 6 幅线描场景插画 | 风水页场景区顶部 |
| `JiugongGrid.vue` | 九宫格方位图，props 接收四吉方/四凶方，吉凶以颜色区分（吉=--good，凶=--cinnabar） | 风水命卦专题，配合 MingguaCalc 结果展示 |
| `CoinFace.vue` | 铜钱正面/反面 SVG，props `side` | 起卦页六次掷钱记录（替代纯文字） |
| `CloudPattern.vue` | 淡云纹装饰 | 起卦舞台背景 |
| `QuizBanner.vue` | 擂台令旗装饰插画 | 答题开始页 |
| `ScrollFrame.vue` | 成绩卷轴装饰框（slot 包裹结算内容） | 答题结算页 |
| `InkBrushArt.vue` | 小幅水墨笔架装饰 | 统计页页首 |
| `CloudDivider.vue` | 云纹分隔线（替代纯直线分隔） | 各页面通用 |

共 16 个组件。

## 各页面改动

### 1. 首页 HomeView
- 顶部插入 `InkHero`（每日一卦卡片上方，横幅式）
- 四个模块入口卡：emoji 图标替换为 `ModuleArt`（书卷=学堂、罗盘=风水、铜钱=起卦、令旗=闯关）

### 2. 易经学堂 LessonsView
- `lessons.json` 的 content 块新增类型 `{"type": "figure", "value": "<图名>"}`
- LessonsView 渲染 content 时，`figure` 块按 value 映射到组件：`taiji`→TaijiFigure、`yao`→YaoFigure、`bagua`→BaguaWheel、`wuxing`→WuxingRing、`stack`→HexagramStack
- 映射表定义在独立文件 `src/components/art/figureMap.js`（导出图名→组件的映射对象，供 LessonsView 渲染与数据测试共用）
- 为 8~10 个概念相关关卡插入配图（阴阳、爻、八卦、五行、重卦等），不强行全部 20 关配图；`figure` 块插入在对应知识点文字之后

### 3. 卦详情 HexagramDetailView
- 头部区域在卦名信息旁显示两幅 `TrigramIcon`：上卦意象 + 下卦意象（如"天地否"显示天空图 + 大地图），并标注"上卦·乾（天）"式文字

### 4. 风水 FengshuiView
- 场景 Tab 切换后，卡片区顶部显示当前场景的 `SceneArt` 插画
- 命卦专题（fengshui-topics 中 interactive 专题）：MingguaCalc 计算出结果后，用 `JiugongGrid` 展示四吉方/四凶方方位图

### 5. 趣味起卦 DivinationView
- 六次掷钱记录：每行三枚 `CoinFace`（按正/反显示）替代纯文字
- 起卦舞台背景加 `CloudPattern` 淡云纹（绝对定位、低透明度，不干扰卦象）

### 6. 答题闯关 QuizView
- 开始界面加 `QuizBanner` 令旗装饰
- 结算界面用 `ScrollFrame` 卷轴框包裹成绩内容

### 7. 访客统计 StatsView
- 页首加 `InkBrushArt` 小幅装饰，条形图保持现状

### 8. 全局
- 各页面的分区分隔处按需使用 `CloudDivider`（替换处以不破坏现有布局为前提，逐页酌情使用）

## 数据变更

- `lessons.json`：仅在选中关卡的 content 数组中插入 `figure` 块，不改动现有字段
- 其他 JSON 文件不变

## 错误处理

- `figure` 块的 value 若未在映射表注册，渲染时跳过该块（不报错、不显示空白占位）
- 带 props 的组件（TrigramIcon、SceneArt、CoinFace、ModuleArt）对未知 props 值渲染空（`v-if` 保护），不抛异常

## 测试

- `tests/data.test.js` 新增校验：lessons.json 中所有 `figure` 块的 value 必须存在于图名映射表
- 现有测试全部保持通过（本次改动不触碰 utils 逻辑）
- 手动验收：`npm run dev` 逐页目检 8 个页面在桌面端与移动端宽度下的显示效果

## 明确不做

- 不加动画、不加交互（hover/点击）
- 不引入位图（png/jpg）与 public 目录
- 不重构现有组件与布局结构
- 不给全部 20 个关卡都配图
