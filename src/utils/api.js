/**
 * 前端 API 封装 - 学习进度同步 + 跨设备同步码
 */

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
const USER_KEY = 'yiyanshe-user-id'

/** 获取或生成匿名用户 ID */
export function getUserId() {
  let id = localStorage.getItem(USER_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(USER_KEY, id)
  }
  return id
}

/** 切换用户 ID（同步码兑换后采纳源设备身份） */
export function setUserId(id) {
  localStorage.setItem(USER_KEY, id)
}

/** 从服务端拉取进度 */
export async function fetchProgress() {
  const userId = getUserId()
  const res = await fetch(`${API_BASE}/progress/${userId}`)
  if (!res.ok) throw new Error(`fetch progress failed: ${res.status}`)
  const json = await res.json()
  return json.exists ? json.data : null
}

/** 保存进度到服务端 */
export async function saveProgress(data) {
  const userId = getUserId()
  const res = await fetch(`${API_BASE}/progress/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`save progress failed: ${res.status}`)
  return res.json()
}

/** 生成一次性同步码（当前设备） */
export async function createSyncCode() {
  const userId = getUserId()
  const res = await fetch(`${API_BASE}/sync/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `create sync code failed: ${res.status}`)
  }
  return res.json() // { code, expiresIn }
}

/** 兑换同步码（新设备），返回源设备 userId */
export async function redeemSyncCode(code) {
  const userId = getUserId()
  const res = await fetch(`${API_BASE}/sync/redeem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code.trim().toUpperCase(), userId }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `redeem sync code failed: ${res.status}`)
  }
  return res.json() // { ok, sourceUserId }
}
