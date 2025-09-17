import { supabase } from "../utils/supabase"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log(query)
  const page = parseInt(query.page as string) || 1
  const mode = query.nsfwMode as string | undefined ?? "no-nsfw"
  const pageSize = parseInt(query.pageSize as string) || 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let q = supabase.from("animes").select("*")

  // mode filter
  if (mode === "only-nsfw") {
    q = q.eq("nsfw", true)
  } else if (mode === "no-nsfw") {
    q = q.eq("nsfw", false)
  }
  // mode === "nsfw" → no filter (allow both)

  const { data, error } = await q.range(from, to) // pagination

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  return { data, page, pageSize }
})
