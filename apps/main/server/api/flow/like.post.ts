export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  addLike(body.postId)
})