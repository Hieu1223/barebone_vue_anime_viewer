import { reactive } from 'vue'

// Enum-like union type
export type ModeType = 'nsfw' | 'no-nsfw' | 'only-nsfw'

export const nsfwMode = reactive({
  value: 'no-nsfw' as ModeType
})
