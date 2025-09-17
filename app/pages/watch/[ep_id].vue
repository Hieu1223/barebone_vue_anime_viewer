<template>
  <div v-if="episode" class="max-w-3xl mx-auto p-6 space-y-6">
    <!-- Episode title -->
    <h1 class="text-2xl font-bold text-gray-800">
      Episode {{ episode.ep_number }}
    </h1>

    <!-- Navigation -->
    <div class="flex justify-between space-x-4">
      <NuxtLink
        v-if="episode.prev_ep"
        :to="`/watch/${episode.prev_ep}`"
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      >
        ← Previous
      </NuxtLink>
      <div></div>
      <NuxtLink
        v-if="episode.next_ep"
        :to="`/watch/${episode.next_ep}`"
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      >
        Next →
      </NuxtLink>
    </div>

    <!-- Mirrors -->
    <div v-if="mirrors" class="space-y-2">
      <h2 class="text-lg font-semibold text-gray-700">Mirrors</h2>
      <ul class="list-disc list-inside space-y-1">
        <li 
          v-for="(url, name) in mirrors" 
          :key="name"
          class="flex items-center space-x-2"
        >
          <button
            class="text-blue-600 hover:underline"
            @click="activeMirror = url"
          >
            {{ name }}
          </button>
          <span v-if="activeMirror === url" class="text-green-600">(Active)</span>
        </li>
      </ul>
    </div>

    <!-- Watch Now button -->
    <div v-if="activeMirror" class="mt-4">
      <a 
        :href="activeMirror" 
        target="_blank" 
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Watch Now
      </a>
    </div>

    <!-- Embedded player -->
    <div v-if="activeMirror" class="mt-6">
      <iframe 
        :src="activeMirror" 
        class="w-full h-96 rounded border"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Debug info -->
    <pre class="bg-gray-100 p-4 rounded">{{ episode }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Episode } from '~/models/episode'

const route = useRoute()
const id = route.params.ep_id as string

// Fetch episode
const { data } = await useFetch<{ data: Episode }>(`/api/episode/${id}`)
const episode = data.value?.data

// Parse mirrors
const mirrors = episode 
  ? JSON.parse(episode.mirrors) as Record<string, string> 
  : null

let activeMirror = ref<string | undefined>("")

if (mirrors) {
  const keys = Object.keys(mirrors)
  if (keys.length > 0) {
    const firstKey = keys[0] as keyof typeof mirrors
    activeMirror.value = mirrors[firstKey]
  }
}
</script>
