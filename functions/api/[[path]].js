/**
 * Cloudflare Pages Functions - 易研社学习进度 API
 * 路由: /api/* (catch-all)
 *
 * GET  /api/progress/:userId  → 读取进度
 * PUT  /api/progress/:userId  → 保存进度
 * POST /api/sync/create       → 生成一次性同步码
 * POST /api/sync/redeem       → 兑换同步码，共享身份
 */

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function validateProgress(body) {
  if (!body || typeof body !== 'object') return false
  if (typeof body.lingyun !== 'number') return false
  if (!Array.isArray(body.completedLessons)) return false
  if (!Array.isArray(body.badges)) return false
  return true
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  return Array.from(bytes, b => chars[b % chars.length]).join('')
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const method = request.method

  // ─── 同步码接口 ───
  if (pathname === '/api/sync/create' && method === 'POST') {
    let body
    try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }

    const { userId } = body
    if (!userId || typeof userId !== 'string' || userId.length > 64) {
      return json({ error: 'Invalid userId' }, 400)
    }

    const progress = await env.PROGRESS.get(`progress:${userId}`)
    if (!progress) {
      return json({ error: 'No progress found for this user' }, 404)
    }

    const code = generateCode()
    await env.PROGRESS.put(`sync-code:${code}`, JSON.stringify({ userId }), {
      expirationTtl: 300,
    })

    return json({ code, expiresIn: 300 })
  }

  if (pathname === '/api/sync/redeem' && method === 'POST') {
    let body
    try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }

    const { code, userId } = body
    if (!code || typeof code !== 'string') return json({ error: 'Invalid code' }, 400)
    if (!userId || typeof userId !== 'string' || userId.length > 64) {
      return json({ error: 'Invalid userId' }, 400)
    }

    const raw = await env.PROGRESS.get(`sync-code:${code.trim().toUpperCase()}`)
    if (!raw) return json({ error: 'Code expired or invalid' }, 410)

    const { userId: sourceId } = JSON.parse(raw)
    await env.PROGRESS.delete(`sync-code:${code.trim().toUpperCase()}`)

    return json({ ok: true, sourceUserId: sourceId })
  }

  // ─── 进度接口 ───
  const match = pathname.match(/^\/api\/progress\/([\w-]+)$/)
  if (!match) return json({ error: 'Not Found' }, 404)

  const userId = match[1]
  if (userId.length > 64) return json({ error: 'Invalid userId' }, 400)
  const key = `progress:${userId}`

  if (method === 'GET') {
    const raw = await env.PROGRESS.get(key)
    if (!raw) return json({ exists: false, data: null })
    return json({ exists: true, data: JSON.parse(raw) })
  }

  if (method === 'PUT') {
    let body
    try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }

    if (!validateProgress(body)) return json({ error: 'Invalid progress structure' }, 422)

    const { lastUnlocked, synced, ...toSave } = body
    await env.PROGRESS.put(key, JSON.stringify(toSave), { expirationTtl: 86400 * 365 })

    return json({ ok: true })
  }

  return json({ error: 'Method Not Allowed' }, 405)
}
