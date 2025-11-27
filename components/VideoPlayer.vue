<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

export interface YouTubeVideo {
  url: string
}

const props = defineProps<{
  videos: YouTubeVideo[]
}>()

// Extract YouTube ID
const getYouTubeId = (url: string) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : null
}

// Thumbnail
const getThumbnail = (url: string) => {
  const id = getYouTubeId(url)
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

// Responsive
const cardsPerPage = ref(3)
const updateCardsPerPage = () => {
  const w = window.innerWidth
  if (w < 640) cardsPerPage.value = 1
  else if (w < 1024) cardsPerPage.value = 2
  else cardsPerPage.value = 3
}

onMounted(() => {
  updateCardsPerPage()
  window.addEventListener('resize', updateCardsPerPage)
})

// Pages
const currentPage = ref(0)
const totalPages = computed(() =>
  Math.ceil(props.videos.length / cardsPerPage.value)
)

const goLeft = () => (currentPage.value = Math.max(0, currentPage.value - 1))
const goRight = () =>
  (currentPage.value = Math.min(totalPages.value - 1, currentPage.value + 1))

const translateX = computed(
  () => `translateX(-${currentPage.value * 100}%)`
)

// ACTIVE VIDEO
const activeIndex = ref<number | null>(null)

// HOVER AUTOPLAY
const hovered = ref<number | null>(null)
</script>

<template>
  <div class="carousel-wrapper">

    <!-- LEFT ARROW -->
    <button class="arrow left" @click="goLeft" :disabled="currentPage === 0">
      <v-icon size="38">mdi-chevron-left</v-icon>
    </button>

    <!-- CAROUSEL -->
    <div class="carousel">
      <div class="track" :style="{ transform: translateX }">

        <div 
          v-for="(video, index) in props.videos"
          :key="index"
          class="card"
          :class="{ big: activeIndex === index }"
          @mouseenter="hovered = index"
          @mouseleave="hovered = null"
          @click="activeIndex = index"
        >

          <!-- ALWAYS-MOUNTED HOVER PREVIEW -->
          <iframe
            class="hover-preview"
            :class="{ show: hovered === index && activeIndex !== index }"
            :src="`https://www.youtube.com/embed/${getYouTubeId(video.url)}?autoplay=1&mute=1&controls=0&playsinline=1`"
            allow="autoplay"
          ></iframe>

          <!-- ACTIVE VIDEO -->
          <iframe
            v-if="activeIndex === index"
            class="iframe"
            :src="`https://www.youtube.com/embed/${getYouTubeId(video.url)}?autoplay=1&mute=1&controls=1`"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>

          <!-- THUMBNAIL -->
          <div v-else class="thumb">
            <img :src="getThumbnail(video.url)" loading="lazy" />
            <div class="overlay">
              <v-icon class="play">mdi-play-circle</v-icon>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- RIGHT ARROW -->
    <button class="arrow right" @click="goRight" :disabled="currentPage >= totalPages - 1">
      <v-icon size="38">mdi-chevron-right</v-icon>
    </button>

  </div>
</template>

<style scoped>
/* WRAPPER - fixed arrow alignment */
.carousel-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

/* ARROWS */
.arrow {
  position: absolute;
  z-index: 20;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.75);
  color: white;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow.left { left: -14px; }
.arrow.right { right: -14px; }
.arrow:disabled { opacity: 0.3; cursor: default; }

/* CAROUSEL */
.carousel {
  overflow: hidden;
  width: 100%;
}
.track {
  display: flex;
  transition: transform 0.45s ease;
}

/* CARD */
.card {
  flex: 0 0 calc(100% / 3);
  max-width: 360px;
  padding: 0.5rem;
  aspect-ratio: 16/9;
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
}

.card:hover:not(.big) {
  transform: scale(1.06);
  z-index: 5;
}

/* ACTIVE VIDEO */
.card.big {
  flex-basis: 100%;
  max-width: none;
  transform: scale(1.02);
  z-index: 10;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .card { flex-basis: calc(100% / 2); max-width: none; }
}
@media (max-width: 640px) {
  .card { flex-basis: 100%; max-width: none; }
}

/* THUMBNAIL */
.thumb {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
  display: flex;
  justify-content: center;
  align-items: center;
}
.play {
  color: white;
  font-size: 42px;
}

/* HOVER PREVIEW FIX */
.hover-preview {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease-out;
  z-index: 3;
}
.hover-preview.show {
  opacity: 1;
}

/* ACTIVE IFRAME */
.iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  position: relative;
  z-index: 4;
}
</style>
