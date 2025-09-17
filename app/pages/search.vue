<template>
  <div class="max-w-4xl mx-auto p-4 space-y-4">
    <h1 class="text-2xl font-bold">Search Results for "{{ query }}"</h1>

    <ClientOnly>
    <div v-if="results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <MovieCard
        v-for="anime in results"
        :key="anime.id"
        :id="anime.id"
        :title="anime.title"
        :thumbnail="anime.thumbnail"
        :link="anime.link"
        :description="anime.description"
      />
    </div>

    <p v-else class="text-center text-gray-500">No results found.</p>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Anime } from '~/models/anime'

const route = useRoute()
const query = route.query.title as string || ''

// Directly fetch search results via useFetch
const { data } = await useFetch<Anime[]>(`/api/search?title=${encodeURIComponent(query)}`)
const results = data.value || []
</script>
