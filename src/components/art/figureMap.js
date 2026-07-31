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
