export interface Theme {
  name: string,
  primary: string,
  secondary: string,
  dark: boolean
}

export const useTheme = () => {
  return useState<null | Theme>('theme', () => null)
}