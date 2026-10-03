import { describe, it, expect } from 'vitest'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import HomeView from '../src/views/HomeView.vue'

const KICKER = '每 日 一 卦'

async function renderWithRail() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: HomeView }]
  })
  await router.push('/')
  const app = createApp({ render: () => h(HomeView) })
  app.use(createPinia())
  app.use(router)
  app.mount(root)
  const html = root.innerHTML
  app.unmount()
  root.remove()
  return html
}

describe('每日一卦归属', () => {
  it('左栏渲染后，整页只出现一次每日一卦', async () => {
    const html = await renderWithRail()
    const hits = html.split(KICKER).length - 1
    expect(hits).toBe(1)
  })

  it('每日一卦由左栏承载，而非首页正文', async () => {
    const html = await renderWithRail()
    const rail = html.indexOf('class="rail"')
    const kicker = html.indexOf(KICKER)
    expect(rail).toBeGreaterThanOrEqual(0)
    expect(kicker).toBeGreaterThan(rail)
  })
})
