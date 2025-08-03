export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  console.log(id)
  return getThought(1)
})