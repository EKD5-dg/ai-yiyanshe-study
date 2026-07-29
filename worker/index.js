/**
 * Cloudflare Worker - 易研社学习进度 API
 * 
 * GET  /api/progress/:userId  → 读取进度
 * PUT  /api/progress/:userId  → 保存进度
 * POST /api/sync/create       → 生成一次性同步码
 * POST /api/sync/redeem       → 兑换同步码，共享身份
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

function validateProgress(body) {
  if (!body || typeof body !== 'object') return false
  if (typeof body.lingyun !== 'number') return false
  if (!Array.isArray(body.completedLessons)) return false
  if (!Array.isArray(body.badges)) return false
  return true
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const { pathname } = url

    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    // ─── 同步码接口 ───
    if (pathname === '/api/sync/create' && request.method === 'POST') {
      return handleSyncCreate(request, env)
    }
    if (pathname === '/api/sync/redeem' && request.method === 'POST') {
      return handleSyncRedeem(request, env)
    }

    // ─── 进度接口 ───
    const match = pathname.match(/^\/api\/progress\/([\w-]+)$/)
    if (!match) {
      return json({ error: 'Not Found' }, 404)
    }

    const userId = match[1]
    const key = `progress:${userId}`

    if (userId.length > 64) {
      return json({ error: 'Invalid userId' }, 400)
    }

    if (request.method === 'GET') {
      const raw = await env.PROGRESS.get(key)
      if (!raw) {
        return json({ exists: false, data: null })
      }
      return json({ exists: true, data: JSON.parse(raw) })
    }

    if (request.method === 'PUT') {
      let body
      try {
        body = await request.json()
      } catch {
        return json({ error: 'Invalid JSON' }, 400)
      }

      if (!validateProgress(body)) {
        return json({ error: 'Invalid progress structure' }, 422)
      }

      const { lastUnlocked, ...toSave } = body

      await env.PROGRESS.put(key, JSON.stringify(toSave), {
        expirationTtl: 86400 * 365,
      })

      return json({ ok: true })
    }

    return json({ error: 'Method Not Allowed' }, 405)
  },
}

/** 生成 8 位随机同步码 */
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 去掉易混淆的 0O1I
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  return Array.from(bytes, b => chars[b % chars.length]).join('')
}

/** POST /api/sync/create { userId } → 生成码，5分钟有效 */
async function handleSyncCreate(request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { userId } = body
  if (!userId || typeof userId !== 'string' || userId.length > 64) {
    return json({ error: 'Invalid userId' }, 400)
  }

  // 确认该用户有进度数据
  const progress = await env.PROGRESS.get(`progress:${userId}`)
  if (!progress) {
    return json({ error: 'No progress found for this user' }, 404)
  }

  const code = generateCode()
  await env.PROGRESS.put(`sync-code:${code}`, JSON.stringify({ userId }), {
    expirationTtl: 300, // 5 分钟过期
  })

  return json({ code, expiresIn: 300 })
}

/** POST /api/sync/redeem { code, userId } → 新设备采纳源设备身份 */
async function handleSyncRedeem(request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { code, userId } = body
  if (!code || typeof code !== 'string') {
    return json({ error: 'Invalid code' }, 400)
  }
  if (!userId || typeof userId !== 'string' || userId.length > 64) {
    return json({ error: 'Invalid userId' }, 400)
  }

  const raw = await env.PROGRESS.get(`sync-code:${code}`)
  if (!raw) {
    return json({ error: 'Code expired or invalid' }, 410)
  }

  const { userId: sourceId } = JSON.parse(raw)

  // 一次性：立即删除码
  await env.PROGRESS.delete(`sync-code:${code}`)

  // 返回源设备 userId，前端将切换身份
  return json({ ok: true, sourceUserId: sourceId })
}
