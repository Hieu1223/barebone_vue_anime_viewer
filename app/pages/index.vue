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
import { ref, onMounted } from 'vue'
import type { Anime } from '~/models/anime'


const animes = ref<Anime[]>([])

onMounted(async () => {
  const res = await fetch('/api/anime')
  const data = await res.json()
  animes.value = data.data
})
</script>
