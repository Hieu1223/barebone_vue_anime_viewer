
export default defineEventHandler(async (event) => {
  // Get the query parameter safely
  const query = getQuery(event)
  const searchTitle = query.title


  if (!searchTitle) return []

  const { data, error } = await supabase
    .from('animes')
    .select('id, title, thumbnail, description, link')
    .ilike('title', `%${searchTitle}%`) // search for similar titles
    .limit(20)

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  return data
})