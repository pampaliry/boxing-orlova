<script setup lang="ts">
//import { useCms } from '~/composables/useCms'   // ← pridaj
const route = useRoute()
const { getPostBySlug } = useCms()

const { data: post, pending } = await useAsyncData('post', () =>
  getPostBySlug(String(route.params.slug))
)
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <img v-if="post.hero?.url" :src="post.hero.url" :alt="post.hero.alt || post.title" />
    <CmsRichText :html="post.body" />
  </article>
  <p v-else-if="pending">Nacitavam...</p>
  <p v-else>Clanocek sa nenasiel.</p>
</template>
