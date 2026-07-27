<script setup>
const navs = [
  { to: '/', label: '首页', icon: '🏠' },
  { to: '/lessons', label: '学堂', icon: '📖' },
  { to: '/fengshui', label: '风水', icon: '🏮' },
  { to: '/divination', label: '起卦', icon: '🪙' },
  { to: '/quiz', label: '闯关', icon: '⚔️' }
]
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="brand">☯ 易研社</RouterLink>
    <nav class="topnav">
      <RouterLink v-for="n in navs" :key="n.to" :to="n.to">{{ n.label }}</RouterLink>
    </nav>
  </header>
  <RouterView />
  <nav class="tabbar">
    <RouterLink v-for="n in navs" :key="n.to" :to="n.to">
      <span class="tab-icon">{{ n.icon }}</span>
      <span class="tab-label">{{ n.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 22px; border-bottom: 1px solid var(--line); background: var(--paper);
  position: sticky; top: 0; z-index: 10;
}
.brand { font-size: 19px; font-weight: bold; letter-spacing: 1px; }
.topnav { display: flex; gap: 22px; font-size: 15px; color: var(--ink-2); }
.topnav a.router-link-active { color: var(--cinnabar); font-weight: bold; }
.tabbar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 10;
  background: #fff; border-top: 1px solid var(--line);
  justify-content: space-around; padding: 6px 0 8px;
}
.tabbar a { display: flex; flex-direction: column; align-items: center; font-size: 11px; color: var(--muted); }
.tabbar a.router-link-active { color: var(--cinnabar); }
.tab-icon { font-size: 18px; }
@media (max-width: 720px) {
  .topnav { display: none; }
  .tabbar { display: flex; }
}
</style>
