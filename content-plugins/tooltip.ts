const processTooltipSyntax = (content: string): string => {
  const tooltipRegex = /:::([\s\S]*?):::\s*\n*\s*([\s\S]*?)\s*:::/g

  const tooltipped = content.replace(tooltipRegex, (_match, tooltipContent, tooltipText) => {
    // This line preserves linebreaks from tooltip text, preventing multiline tooltips from being processed by @nuxt/content before our plugin can deal with them.
    // In MdTooltip.vue, we turn the <br> elements back into \n right before passing them to the markdown parser, so they can be processed as their own individual block of markdown
    const sanitizedTooltipText = tooltipText.replace(/\n/g, '<br>')
    const cleanedContent = tooltipContent.replace(/\n/g, '<br>')
    return `:MdTooltip{ text="${cleanedContent}" tooltip="${sanitizedTooltipText}"}`
  })

  console.log(tooltipped)

  return tooltipped
}

export default processTooltipSyntax