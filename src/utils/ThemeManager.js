export class ThemeManager {
  constructor() {
    this.storageKey = 'taskflow-theme'
    this.currentTheme = this.getStoredTheme() || 'light'
    this.applyTheme()
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey)
    } catch (error) {
      return null
    }
  }

  saveTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme)
    this.updateThemeToggle()
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.saveTheme(this.currentTheme)
    this.applyTheme()
  }

  updateThemeToggle() {
    const toggle = document.getElementById('theme-toggle')
    if (toggle) {
      toggle.setAttribute('data-theme', this.currentTheme)
    }
  }
}