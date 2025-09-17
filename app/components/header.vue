<template>
  <header class="flex items-center justify-between p-4 bg-gray-100 shadow-md">
    <!-- Logo / Home button -->
    <NuxtLink to="/" class="text-xl font-bold text-gray-800 hover:text-gray-600">
      Home
    </NuxtLink>

    <!-- Search bar -->
    <div class="flex items-center space-x-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search anime..."
        class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <NuxtLink :to="`/search?title=${encodeURIComponent(searchQuery)}`">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Search
        </button>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
const searchQuery = ref('')
</script>
