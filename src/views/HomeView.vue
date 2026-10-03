<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import BadgeItem from '../components/BadgeItem.vue'
import DisclaimerBar from '../components/DisclaimerBar.vue'
import PageLayout from '../components/PageLayout.vue'
import ModuleArt from '../components/art/ModuleArt.vue'
import CloudDivider from '../components/art/CloudDivider.vue'
import LazyImage from '../components/LazyImage.vue'
import badges from '../data/badges.json'
import lessons from '../data/lessons.json'

const store = useProgressStore()
const lessonPct = computed(() => Math.round(store.completedLessons.length / lessons.length * 100))

const modules = [
  { to: '/lessons', art: 'lessons', title: '易经学堂', sub: () => `已学 ${store.completedLessons.length}/${lessons.length} 关` },
  { to: '/fengshui', art: 'fengshui', title: '风水小知识', sub: () => `已读 ${store.readFengshui.length} 条` },
  { to: '/divination', art: 'divination', title: '趣味起卦', sub: () => '摇一摇铜钱' },
  { to: '/quiz', art: 'quiz', title: '答题闯关', sub: () => `最高连击 ×${store.quizBest.combo}` }
]
</script>

<template>
  <PageLayout layout="rail" mobile-rail>
    <LazyImage
      class="photo-hero"
      src="/images/taichi-landscape.webp"
      alt="太极山水意境图"
      :eager="true"
    />

    <section class="modules">
      <RouterLink v-for="m in modules" :key="m.to" :to="m.to" class="card module">
        <ModuleArt :kind="m.art" class="m-art" />
        <b>{{ m.title }}</b>
        <span class="m-sub">{{ m.sub() }}</span>
        <div v-if="m.to === '/lessons'" class="progress-track">
          <div class="progress-fill" :style="{ width: lessonPct + '%' }"></div>
        </div>
      </RouterLink>
    </section>

    <section class="card badges">
      <CloudDivider />
      <b>我的成就</b>
      <div class="badge-wall">
        <BadgeItem v-for="b in badges" :key="b.id" :badge="b" :unlocked="store.badges.includes(b.id)" />
      </div>
    </section>

    <DisclaimerBar />
  </PageLayout>
</template>

<style scoped>
.photo-hero {
  width: 100%;
  max-width: 620px;
  border-radius: 14px;
  margin: 0 auto 14px;
  border: 1px solid var(--line);
  overflow: hidden;
}
.modules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 14px; }
.module { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.m-art { width: 44px; height: 44px; }
.m-sub { font-size: 12px; color: var(--muted); }
.module .progress-track { width: 100%; }
.badges { margin-top: 14px; }
.badge-wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(86px, 1fr)); gap: 8px; margin-top: 10px; }
@media (max-width: 720px) {
  .modules { grid-template-columns: 1fr 1fr; }
}
</style>
