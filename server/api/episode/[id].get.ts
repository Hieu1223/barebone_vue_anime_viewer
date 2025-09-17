export default defineEventHandler(async (event) => {
  const episodeId = getRouterParam(event, "id");

  if (!episodeId) {
    throw createError({
      statusCode: 400,
      statusMessage: "animeId is required",
    });
  }

  const res = await supabase
    .from("episodes")
    .select("*")
    .eq("id", episodeId)
    .order("ep_number", { ascending: true });

  if (res.error)
    throw createError({ statusCode: 500, statusMessage: res.error.message });
  if (res.data.length == 0)
    throw Error(`Cant find episode with id ${episodeId}`);
  const data = res.data[0];
  return { data };
});
