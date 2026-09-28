<script setup>
import { ref } from 'vue'
import { useProgressStore } from '../stores/progress'
import { createSyncCode, redeemSyncCode, setUserId, saveProgress } from '../utils/api'

const store = useProgressStore()

// 服务端英文错误 → 中文提示
const ERROR_ZH = {
  'No progress found for this user': '服务器上还没有你的进度，请重试一次',
  'Code expired or invalid': '同步码已过期或不存在，请在旧设备重新生成',
  'Invalid code': '同步码格式不对，请检查后重试',
  'Invalid userId': '设备标识异常，请刷新页面后重试'
}
function zh(message, fallback) {
  return ERROR_ZH[message] || fallback
}

// ─── 生成同步码 ───
const generatedCode = ref('')
const codeExpiry = ref(0)
const creating = ref(false)
const createError = ref('')

async function handleCreate() {
  creating.value = true
  createError.value = ''
  generatedCode.value = ''
  try {
    // 先把当前进度上传服务端，确保新设备兑换后能拉到数据
    await saveProgress(store.$state)
    const res = await createSyncCode()
    generatedCode.value = res.code
    codeExpiry.value = Date.now() + res.expiresIn * 1000
  } catch (e) {
    createError.value = zh(e.message, '生成失败，请检查网络后重试')
  } finally {
    creating.value = false
  }
}

// ─── 兑换同步码 ───
const inputCode = ref('')
const redeeming = ref(false)
const redeemError = ref('')
const redeemOk = ref(false)

async function handleRedeem() {
  if (!inputCode.value.trim()) return
  redeeming.value = true
  redeemError.value = ''
  redeemOk.value = false
  try {
    const res = await redeemSyncCode(inputCode.value)
    // 切换身份为源设备
    setUserId(res.sourceUserId)
    // 重新从服务端拉取进度
    await store.syncFromServer()
    redeemOk.value = true
    inputCode.value = ''
  } catch (e) {
    redeemError.value = zh(e.message, '同步失败，请检查同步码后重试')
  } finally {
    redeeming.value = false
  }
}
</script>

<template>
  <div class="sync-panel">
    <details class="sync-details">
      <summary class="sync-summary">🔄 跨设备同步</summary>
      <div class="sync-body">
        <!-- 生成码 -->
        <div class="sync-section">
          <p class="sync-hint">在另一台设备输入此码，即可共享学习进度</p>
          <button class="btn" :disabled="creating" @click="handleCreate">
            {{ creating ? '生成中...' : '生成同步码' }}
          </button>
          <div v-if="generatedCode" class="code-display">
            <span class="code-text">{{ generatedCode }}</span>
            <span class="code-expire">5 分钟内有效，仅可使用一次</span>
          </div>
          <p v-if="createError" class="error">{{ createError }}</p>
        </div>

        <hr class="sync-divider" />

        <!-- 兑换码 -->
        <div class="sync-section">
          <p class="sync-hint">在新设备？输入旧设备生成的同步码</p>
          <div class="redeem-row">
            <input
              v-model="inputCode"
              class="code-input"
              placeholder="输入 8 位同步码"
              maxlength="8"
              @keyup.enter="handleRedeem"
            />
            <button class="btn" :disabled="redeeming || !inputCode.trim()" @click="handleRedeem">
              {{ redeeming ? '同步中...' : '同步' }}
            </button>
          </div>
          <p v-if="redeemOk" class="success">✅ 同步成功！此设备已与源设备共享进度</p>
          <p v-if="redeemError" class="error">{{ redeemError }}</p>
        </div>
      </div>
    </details>
  </div>
</template>

<style scoped>
.sync-panel { margin-top: 14px; }
.sync-details { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.sync-summary {
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: var(--paper);
  user-select: none;
}
.sync-body { padding: 12px 14px; }
.sync-section { display: flex; flex-direction: column; gap: 8px; }
.sync-hint { font-size: 12px; color: var(--muted); margin: 0; }
.sync-divider { border: none; border-top: 1px dashed var(--line); margin: 12px 0; }
.btn {
  align-self: flex-start;
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background: var(--cinnabar);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: opacity .2s;
}
.btn:disabled { opacity: .5; cursor: not-allowed; }
.code-display { display: flex; flex-direction: column; gap: 2px; }
.code-text {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 6px;
  color: var(--ink);
  font-family: 'Courier New', monospace;
}
.code-expire { font-size: 11px; color: var(--muted); }
.redeem-row { display: flex; gap: 8px; }
.code-input {
  flex: 1;
  max-width: 160px;
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 15px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
}
.error { font-size: 12px; color: var(--cinnabar); margin: 0; }
.success { font-size: 12px; color: var(--good); margin: 0; }
</style>
