<template>
  <NuxtLink :to="`/anime/${id}`" class="block">
    <div class="bg-blue-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <!-- Thumbnail with fixed aspect ratio -->
      <div class="w-full aspect-[16/9] overflow-hidden">
        <img
          :src="thumbnail"
          :alt="title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Card content -->
      <div class="p-4">
        <h2
          class="text-lg font-bold text-gray-800 line-clamp-2"
          :title="title"
        >
          {{ title }}
        </h2>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  thumbnail: string
  link: string
}>()
</script>
