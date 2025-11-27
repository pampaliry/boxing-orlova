<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface YouTubeVideo {
  url: string
}

const props = defineProps<{
  videos: YouTubeVideo[]
}>()

// Extract YouTube ID from URL
const getYouTubeId = (url: string) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : null
}

// Thumbnail
const getThumbnail = (url: string) => {
  const id = getYouTubeId(url)
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

// Modal
const activeIndex = ref<number | null>(null)
const closeModal = () => (activeIndex.value = null)

// ESC close
onMounted(() => {
  const esc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
  }
  window.addEventListener('keydown', esc)

  onBeforeUnmount(() => window.removeEventListener('keydown', esc))
})

// Hover preview
const hovered = ref<number | null>(null)
</script>

<template>
  <div class="gallery-wrapper">
    <div class="gallery">

      <div
        v-for="(video, index) in props.videos"
        :key="index"
        class="thumb-card"
        @mouseenter="hovered = index"
        @mouseleave="hovered = null"
        @click="activeIndex = index"
      >
        <!-- Thumbnail -->
        <img
          v-if="hovered !== index"
          :src="getThumbnail(video.url)"
          loading="lazy"
          class="thumb-img"
        />

        <!-- Hover autoplay preview (always mounted) -->
        <iframe
          v-show="hovered === index"
          class="hover-preview"
          :src="`https://www.youtube.com/embed/${getYouTubeId(video.url)}?autoplay=1&mute=1&controls=0&playsinline=1`"
          allow="autoplay"
        ></iframe>

        <div class="thumb-overlay" v-if="hovered !== index">
          <v-icon class="play-icon">mdi-play-circle</v-icon>
        </div>
      </div>

    </div>

    <!-- FULLSCREEN MODAL -->
    <div v-if="activeIndex !== null" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <iframe
          class="modal-video"
          :src="`https://www.youtube.com/embed/${getYouTubeId(props.videos[activeIndex].url)}?autoplay=1&mute=1&controls=1`"
          allow="autoplay; encrypted-media; fullscreen"
          allowfullscreen
        ></iframe>

        <button class="close-btn" @click="closeModal">
          <v-icon size="32">mdi-close</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* GRID */
.gallery-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.4rem;
  width: 100%;
  max-width: 1400px;
  padding: 0 1rem;
}

/* CARD */
.thumb-card {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  transition: transform 0.25s ease;
}
.thumb-card:hover {
  transform: scale(1.05);
}

/* Thumbnail */
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hover Preview */
.hover-preview {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  opacity: 0;
  animation: fadeIn 0.2s forwards ease-out;
}
@keyframes fadeIn {
  to { opacity: 1; }
}

/* Overlay */
.thumb-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
}
.play-icon {
  font-size: 54px;
  color: white;
}

/* MODAL */
.modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
}

.modal-video {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}

/* Close BTN */
.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
