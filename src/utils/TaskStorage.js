export class TaskStorage {
  constructor() {
    this.storageKey = 'taskflow-tasks'
  }

  getTasks() {
    try {
      const tasks = localStorage.getItem(this.storageKey)
      return tasks ? JSON.parse(tasks) : []
    } catch (error) {
      console.error('Error loading tasks:', error)
      return []
    }
  }

  saveTasks(tasks) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks))
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }

  clearTasks() {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.error('Error clearing tasks:', error)
    }
  }
}