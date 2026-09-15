<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { castLine, interpret } from '../utils/divination'
import HexagramFigure from '../components/HexagramFigure.vue'
import CoinFace from '../components/art/CoinFace.vue'
import CloudPattern from '../components/art/CloudPattern.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'

const lines = ref([])        // 已掷出的爻（自下而上）
const casting = ref(false)
const result = ref(null)

const bits = computed(() => lines.value.map(l => (l.yang ? 1 : 0)))
const changing = computed(() => lines.value.map((l, i) => (l.changing ? i : -1)).filter(i => i >= 0))

let timer = null
function start() {
  lines.value = []
  result.value = null
  casting.value = true
  clearInterval(timer)
  timer = setInterval(() => {
    lines.value.push(castLine())
    if (lines.value.length === 6) {
      clearInterval(timer)
      timer = null
      casting.value = false
      result.value = interpret(lines.value)
    }
  }, 500)
}
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="page">
    <h1 class="page-title">🪙 趣味起卦</h1>
    <p class="page-sub">三枚铜钱摇六次，看看今天掷出什么卦</p>

    <div class="stage card">
      <CloudPattern class="stage-cloud" />
      <HexagramFigure v-if="lines.length" :bits="bits" :changing="changing" />
      <p v-else class="placeholder-text">卦象将在这里自下而上生长</p>
      <div class="coins" v-if="lines.length">
        <span v-for="(l, i) in lines" :key="i" class="coin-row">
          <i class="coin-label">第{{ i + 1 }}爻</i>
          <CoinFace v-for="(c, j) in l.coins" :key="j" :side="c" class="coin-svg" />
          <i class="coin-val">→ {{ l.value }}</i>
        </span>
      </div>
      <button class="btn" :disabled="casting" @click="start">{{ casting ? '摇卦中…' : lines.length ? '再摇一次' : '摇铜钱 🪙' }}</button>
    </div>

    <div v-if="result" class="reading">
      <div class="card">
        <div class="card-head">
          <h3>本卦 · {{ result.origin.fullName }} {{ result.origin.symbol }}</h3>
          <RouterLink :to="'/hexagrams/' + result.origin.id" class="link">查看百科 →</RouterLink>
        </div>
        <p class="guaci">{{ result.origin.guaci }}</p>
        <p>{{ result.origin.plain }}</p>
        <p class="fun">💡 {{ result.origin.fun }}</p>
      </div>
      <div v-if="result.changed" class="card">
        <div class="card-head">
          <h3>变卦 · {{ result.changed.fullName }} {{ result.changed.symbol }}</h3>
          <RouterLink :to="'/hexagrams/' + result.changed.id" class="link">查看百科 →</RouterLink>
        </div>
        <p class="sub">有 {{ result.changingIdx.length }} 个变爻（红色），事情可能向这个方向发展：</p>
        <p>{{ result.changed.plain }}</p>
      </div>
      <div v-else class="card"><p class="sub">无变爻，卦象稳定，参照本卦即可。</p></div>
    </div>

    <DisclaimerBar />
  </div>
</template>

<style scoped>
.stage { position: relative; overflow: hidden; text-align: center; padding: 26px; }
.stage-cloud { position: absolute; top: 6px; left: 0; width: 100%; pointer-events: none; }
.stage > *:not(.stage-cloud) { position: relative; }
.placeholder-text { color: var(--muted); font-size: 13px; }
.coins { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--muted); margin: 12px 0; }
.coin-row { display: flex; align-items: center; justify-content: center; gap: 6px; }
.coin-label, .coin-val { font-style: normal; }
.coin-svg { width: 22px; height: 22px; flex: none; }
.stage .btn { margin-top: 10px; }
.reading { display: grid; gap: 12px; margin-top: 14px; }
.guaci { color: var(--ink-2); font-size: 14px; margin: 4px 0; }
.fun { color: var(--cinnabar); font-size: 13px; margin-top: 6px; }
.sub { font-size: 13px; color: var(--muted); }
.card-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; }
.link { font-size: 13px; color: var(--cinnabar); }
</style>
