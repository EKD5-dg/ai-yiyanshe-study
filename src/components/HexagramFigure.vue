<script setup>
defineProps({
  bits: { type: Array, required: true },       // 自下而上 0/1
  changing: { type: Array, default: () => [] } // 变爻下标（0=初爻）
})
</script>

<template>
  <div class="hex">
    <div v-for="i in [5, 4, 3, 2, 1, 0]" :key="i" class="line" :class="{ changing: changing.includes(i) }">
      <span v-if="bits[i]" class="seg"></span>
      <template v-else>
        <span class="seg"></span>
        <span class="seg"></span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.hex { display: inline-flex; flex-direction: column; gap: 7px; }
.line { display: flex; gap: 10px; width: 88px; height: 11px; }
.seg { flex: 1; background: var(--ink); border-radius: 2px; }
.line.changing .seg { background: var(--cinnabar); }
</style>
