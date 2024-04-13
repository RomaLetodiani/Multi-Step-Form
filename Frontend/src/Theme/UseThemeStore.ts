import { create } from 'zustand'

const useThemeStore = create<{ theme: string; setTheme: (state: string) => void }>((set) => {
  // Detect user's preferred color scheme (light or dark)
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches

  return {
    theme: localStorage.getItem('theme') || (prefersDarkScheme ? 'dark' : 'light'), // Initial theme based on user's preferred color scheme
    setTheme: (newTheme) => {
      set(() => ({ theme: newTheme }))
      localStorage.setItem('theme', newTheme) // Persist to local storage
    },
  }
})

export default useThemeStore
