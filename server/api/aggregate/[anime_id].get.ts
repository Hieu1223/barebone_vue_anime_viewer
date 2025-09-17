export default defineEventHandler(async (event) => {
  const animeId = getRouterParam(event, 'anime_id')

  if (!animeId) {
    throw createError({ statusCode: 400, statusMessage: "animeId is required" })
  }


  var res = await supabase
    .from("episodes")
    .select("id,ep_number")
    .eq("anime_id", animeId)
    .order("ep_number", { ascending: true })

  if (res.error) throw createError({ statusCode: 500, statusMessage: res.error.message })

  const episodes = res.data
  

  res = await supabase
    .from('animes')
    .select('*')
    .eq('id', animeId)
    .range(0,1) 
  if (res.error) throw createError({ statusCode: 500, statusMessage: res.error.message })
  
  if(res.data.length == 0) throw Error(`No anime with id ${animeId}`)
  const anime = res.data[0]
  return {anime, episodes }
})
