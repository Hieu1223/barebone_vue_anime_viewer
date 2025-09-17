import { supabase } from "../utils/supabase"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from('animes')
    .select('*')
    .range(from, to) // pagination here

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  
  return { data, page, pageSize }
})

