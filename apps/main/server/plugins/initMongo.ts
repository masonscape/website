
export default defineNitroPlugin(async (nitroApp) => {
  await getDb()
  await initFlowCache()

  nitroApp.hooks.hook('close', async () => {
    closeDb()
  })
})