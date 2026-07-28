<script setup>
import { ref } from 'vue'
import { minggua } from '../utils/minggua'

const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => 1920 + i)
const year = ref(2000)
const gender = ref('male')
const result = ref(null)

function calc() {
  result.value = minggua(year.value, gender.value)
}
</script>

<template>
  <div class="card calc">
    <h3 class="calc-title">🧮 算算你的命卦</h3>
    <div class="form">
      <label>出生年份
        <select v-model="year">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </label>
      <label class="radios">性别
        <label class="radio"><input type="radio" value="male" v-model="gender" /> 男</label>
        <label class="radio"><input type="radio" value="female" v-model="gender" /> 女</label>
      </label>
      <button class="btn" @click="calc">计算</button>
    </div>

    <div v-if="result" class="result">
      <div class="gua-name">{{ result.name }}</div>
      <span class="tag" :class="result.group === '东四命' ? 'tag-good' : 'tag-bad'">{{ result.group }}</span>
      <div class="cols">
        <table>
          <thead><tr><th colspan="2">四吉方</th></tr></thead>
          <tbody>
            <tr v-for="d in result.lucky" :key="d.kind"><td>{{ d.kind }}</td><td>{{ d.dir }}</td></tr>
          </tbody>
        </table>
        <table>
          <thead><tr><th colspan="2">四凶方</th></tr></thead>
          <tbody>
            <tr v-for="d in result.unlucky" :key="d.kind"><td>{{ d.kind }}</td><td>{{ d.dir }}</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="note">按公历年份简化计算，未处理立春分界，仅供娱乐参考</p>
  </div>
</template>

<style scoped>
.calc { margin: 16px 0; }
.calc-title { font-size: 16px; margin-bottom: 12px; }
.form { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 14px; color: var(--ink-2); }
.form select {
  margin-left: 6px; padding: 4px 8px; border: 1px solid var(--line);
  border-radius: 8px; background: #fff; font-size: 14px; color: var(--ink);
}
.radios { display: inline-flex; align-items: center; gap: 10px; }
.radio { cursor: pointer; }
.result { margin-top: 16px; text-align: center; }
.gua-name { font-size: 42px; color: var(--cinnabar); line-height: 1.2; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; text-align: left; }
.cols table { width: 100%; border-collapse: collapse; font-size: 13px; }
.cols th { padding: 6px 10px; background: var(--paper-2); text-align: center; }
.cols td { padding: 5px 10px; border-bottom: 1px solid var(--line); }
.cols table:first-child th { color: var(--good); }
.cols table:last-child th { color: var(--cinnabar); }
.note { margin-top: 12px; font-size: 11px; color: var(--muted); }
@media (max-width: 720px) { .cols { grid-template-columns: 1fr; } }
</style>
