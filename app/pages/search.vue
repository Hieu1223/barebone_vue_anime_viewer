<template>
  <div class="max-w-4xl mx-auto p-4 space-y-4">
    <h1 class="text-2xl font-bold">Search Results for "{{ title }}"</h1>

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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { nsfwMode } from '~/mode'
import type { Anime } from '~/models/anime'

const route = useRoute()

const title = ref(route.query.title as string || '')
const results = ref<Anime[]>([])

async function fetchResults() {
  if (!title.value) {
    results.value = []
    return
  }
  results.value = await $fetch<Anime[]>(
    `/api/search?title=${encodeURIComponent(title.value)}&nsfwMode=${nsfwMode.value}`
  )
}

// initial fetch
await fetchResults()

// refetch whenever title or nsfwMode changes
watch(
  () => [route.query.title, route.query.nsfwMode],
  ([newTitle]) => {
    title.value = newTitle as string || ''
    fetchResults()
  }
)
</script>
