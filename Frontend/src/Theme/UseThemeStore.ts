import { create } from 'zustand'

const useThemeStore = create<{ theme: string; setTheme: (state: string) => void }>((set) => ({
  theme: localStorage.getItem('theme') || 'light', // Initial theme
  setTheme: (newTheme) => {
    set(() => ({ theme: newTheme }))
    localStorage.setItem('theme', newTheme) // Persist to local storage
  },
}))

export default useThemeStore
