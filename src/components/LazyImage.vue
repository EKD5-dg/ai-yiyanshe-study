<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [Number, String], default: 1024 },
  height: { type: [Number, String], default: 622 },
  // 首屏关键图设 true，其余默认懒加载
  eager: { type: Boolean, default: false }
})

const loaded = ref(false)
</script>

<template>
  <img
    class="lazy-img"
    :class="{ loaded }"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :loading="props.eager ? 'eager' : 'lazy'"
    :fetchpriority="props.eager ? 'high' : 'auto'"
    decoding="async"
    @load="loaded = true"
  />
</template>

<style scoped>
.lazy-img {
  display: block;
  width: 100%;
  height: auto;
  background: var(--paper-2);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.lazy-img.loaded { opacity: 1; }
</style>
