<script setup lang="ts">
//import { useCms } from '~/composables/useCms'   // ← pridaj
const { listPosts } = useCms()

const { data: posts, pending, error } = await useAsyncData('posts', () =>
  listPosts({ limit: 3, depth: 1 })
)
</script>

<template>
  <section>
    <h1>Posledne clanky</h1>
    <ul v-if="posts?.docs?.length">
      <li v-for="p in posts.docs" :key="p.id">
        <NuxtLink :to="`/posts/${p.slug}`">{{ p.title }}</NuxtLink>
      </li>
    </ul>
    <p v-else-if="pending">Nacitavam...</p>
    <p v-else-if="error">Nastala chyba: {{ error.message }}</p>
    <p v-else>Nic tu nie je.</p>
    
  </section>
</template>
