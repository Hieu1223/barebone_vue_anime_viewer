<template>
  <div class="container">
    <div class="grid">
      <div v-for="anime in animes" :key="anime.id">
        <movie-card
          :id="anime.id"
          :title="anime.title"
          :thumbnail="anime.thumbnail"
          :link="anime.link"
          :description="anime.description"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Anime } from '~/models/anime'

const route = useRoute()
const animes = ref<Anime[]>([])

async function fetchAnimes(mode: string) {
  const data = await $fetch<{ data: Anime[] }>('/api/anime', {
    query: { nsfwMode: mode }
  })
  animes.value = data.data
}

// initial fetch
await fetchAnimes((route.query.nsfwMode as string) || 'no-nsfw')

// watch for changes
watch(
  () => route.query.nsfwMode,
  (newMode) => {
    fetchAnimes((newMode as string) || 'no-nsfw')
  },
  { immediate: true }
)
</script>

