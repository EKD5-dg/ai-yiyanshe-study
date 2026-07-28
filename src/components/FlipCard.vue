<script setup>
import { ref } from 'vue'
const emit = defineEmits(['open'])
const flipped = ref(false)
let opened = false
function toggle() {
  flipped.value = !flipped.value
  if (flipped.value && !opened) {
    opened = true
    emit('open')
  }
}
</script>

<template>
  <div class="flip" :class="{ flipped }" @click="toggle">
    <div class="face front"><slot name="front" /></div>
    <div class="face back"><slot name="back" /></div>
  </div>
</template>

<style scoped>
.flip { position: relative; perspective: 900px; cursor: pointer; min-height: 150px; }
.face {
  position: absolute; inset: 0; backface-visibility: hidden; transition: transform .5s;
  background: #fff; border: 1px solid var(--line); border-radius: 14px;
  padding: 14px; box-shadow: 0 3px 0 var(--card-shadow);
}
.front { transform: rotateY(0); }
.back { transform: rotateY(180deg); overflow: auto; font-size: 13px; color: var(--ink-2); }
.flipped .front { transform: rotateY(-180deg); }
.flipped .back { transform: rotateY(0); }
</style>
