<script setup>
defineProps({
  badge: { type: Object, required: true },
  unlocked: { type: Boolean, default: false }
})
</script>

<template>
  <div class="badge" :class="{ unlocked }" :title="badge.desc">
    <span class="icon">{{ unlocked ? badge.icon : '🔒' }}</span>
    <span class="name">{{ badge.name }}</span>
  </div>
</template>

<style scoped>
.badge {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 10px 4px; border-radius: 12px; background: var(--paper-2);
  opacity: .45; font-size: 12px; color: var(--ink-2);
}
.badge.unlocked { opacity: 1; background: #fff; border: 1px solid var(--line); box-shadow: 0 2px 0 var(--card-shadow); }
.icon { font-size: 22px; }
</style>
