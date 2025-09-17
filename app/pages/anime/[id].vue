<template>
  <div>
    <h1 v-if="anime">{{ anime.title }}</h1>
    <img v-if="anime" :src="anime.thumbnail" alt="" />
    <p v-if="anime">{{ anime.description }}</p>
    <a v-if="anime" :href="anime.link" target="_blank">Watch</a>
  </div>

  <div v-if="episodes.length">
      <h2>Episodes</h2>
      <ul>
        <li v-for="ep in episodes" :key="ep.id.toString()">
          <nuxt-link :to="`/watch/${ep.id}`">
          Episode {{ ep.ep_number }}
          </nuxt-link>
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Anime } from '~/models/anime'
import type { Episode } from '~/models/episode'

const route = useRoute()
const id = route.params.id as string


const { data} = await useFetch(`/api/aggregate/${id}`)

const p = data.value as {anime:Anime, episodes: {ep_number: number, id: number}[]}

const anime = p.anime
const episodes = p.episodes
</script>
