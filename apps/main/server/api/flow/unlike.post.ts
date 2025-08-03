export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  removeLike(body.postId)
})