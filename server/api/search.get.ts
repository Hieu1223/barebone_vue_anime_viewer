import { supabase } from "../utils/supabase"

export default defineEventHandler(async (event) => {
  const url = new URL(event.node.req.url || '', `http://${event.node.req.headers.host}`)
  const searchTitle = url.searchParams.get('title')
  const mode = url.searchParams.get('nsfwMode')
  if (!searchTitle) return []

  let q = supabase
    .from("animes")
    .select("id, title, thumbnail, description, link, nsfw")
    .ilike("title", `%${searchTitle}%`)
    .limit(20)

  // Apply NSFW mode filter
  if (mode === "only-nsfw") {
    q = q.eq("nsfw", true)
  } else if (mode === "no-nsfw") {
    q = q.eq("nsfw", false)
  }
  // mode === "nsfw" → no filter, return all
  const { data, error } = await q
  

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  return data
})
