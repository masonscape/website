const processTooltipSyntax = (content: string): string => {
  const tooltipRegex = /:::([\s\S]*?):::\s*\n*\s*([\s\S]*?)\s*:::/g

  const tooltipped = content.replace(tooltipRegex, (_match, tooltipContent, tooltipText) => {
    // This line preserves linebreaks from tooltip text, preventing multiline tooltips from being processed by @nuxt/content before our plugin can deal with them.
    // In MdTooltip.vue, we turn the <br> elements back into \n right before passing them to the markdown parser, so they can be processed as their own individual block of markdown text
    // the quotes also need to be "escaped" (although escaping with a slash didnt work so i had to do it this way) otherise it messes with the syntax of the component
    const sanitizedTooltipText = tooltipText.replace(/\n/g, '<br>').replace(/"/g, '&quot;')
    const cleanedContent = tooltipContent.replace(/\n/g, '<br>').replace(/"/g, '&quot;')
    
    // garbage text is added to allow us to place tooltips directly after text, with no space, without it breaking
    // you need a space before a vue component when using :ElementName syntax (and that syntax is necessary because <ElementName /> breaks in an even worse way). we add the garbage text, which contains a space, and the tooltip gets rendered properly. then, in ContentBody.vue, we remove all the garbage text before it gets passed to the ContentRenderer
    return ` YOU SHOULDNT BE SEEING THIS TEXT PLEASE REPORT IT :MdTooltip{ text="${cleanedContent}" tooltip="${sanitizedTooltipText}"}`
  })

  return tooltipped
}

export { processTooltipSyntax }