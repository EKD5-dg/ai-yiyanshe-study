<script setup>
import LazyImage from '../LazyImage.vue'

// 课程场景配图：lessons.json 中 type=figure value=photo 时通过 props.src 传入 public 路径
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' }
})
</script>

<template>
  <figure class="photo-figure">
    <LazyImage :src="props.src" :alt="props.alt" />
  </figure>
</template>

<style scoped>
.photo-figure {
  margin: 14px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
}
</style>
