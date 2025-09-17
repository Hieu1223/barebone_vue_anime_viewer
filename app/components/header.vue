<template>
  <header class="flex items-center justify-between p-4 bg-gray-100 shadow-md">
    <!-- Logo / Home button -->
    <button
      @click="goHome"
      class="text-xl font-bold text-gray-800 hover:text-gray-600"
    >
      Home
    </button>

    <!-- Search bar -->
    <div class="flex items-center space-x-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search anime..."
        class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        @keyup.enter="doSearch"
      />
      <button
        @click="doSearch"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    <!-- NSFW mode dropdown -->
    <div class="flex items-center space-x-2">
      <label class="text-gray-700">Mode</label>
      <select
        v-model="nsfwMode.value"
        class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="no-nsfw">No NSFW</option>
        <option value="nsfw">NSFW + SFW</option>
        <option value="only-nsfw">Only NSFW</option>
      </select>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { nsfwMode } from '~/mode'

const searchQuery = ref('')
const router = useRouter()
const route = useRoute()
const goHome = () => {
  router.push({
    path: '/',
    query: { nsfwMode: nsfwMode.value }
  })
}

const doSearch = () => {
  router.push({
    path: '/search',
    query: { 
      title: searchQuery.value,
      nsfwMode: nsfwMode.value.toString(),
    }
  })
}

watch(nsfwMode, (newMode) => {
  router.push({
    path: route.path, // stay on current page
    query: { 
      ...route.query,
      nsfwMode: newMode.value.toString()
    }
  })
})
</script>
