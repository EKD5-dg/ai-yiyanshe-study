<!-- 成绩卷轴装饰框：上下卷轴横木夹住 slot 内容 -->
<template>
  <div class="scroll-frame">
    <svg class="rod" viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="7" width="372" height="8" rx="4" fill="var(--ink-2)" />
      <circle cx="10" cy="11" r="8" fill="var(--muted)" />
      <circle cx="390" cy="11" r="8" fill="var(--muted)" />
      <circle cx="10" cy="11" r="3" fill="var(--paper-2)" />
      <circle cx="390" cy="11" r="3" fill="var(--paper-2)" />
    </svg>
    <div class="body"><slot /></div>
    <svg class="rod" viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="7" width="372" height="8" rx="4" fill="var(--ink-2)" />
      <circle cx="10" cy="11" r="8" fill="var(--muted)" />
      <circle cx="390" cy="11" r="8" fill="var(--muted)" />
      <circle cx="10" cy="11" r="3" fill="var(--paper-2)" />
      <circle cx="390" cy="11" r="3" fill="var(--paper-2)" />
    </svg>
  </div>
</template>

<style scoped>
.scroll-frame { max-width: 420px; margin: 0 auto; }
.rod { display: block; width: 100%; height: 22px; }
.body {
  background: var(--paper); border-left: 1px solid var(--line); border-right: 1px solid var(--line);
  margin: 0 8px; padding: 16px 12px;
}
</style>
