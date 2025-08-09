import { TaskStorage } from '../utils/TaskStorage.js'
import { TaskRenderer } from './TaskRenderer.js'

export class TaskManager {
  constructor() {
    this.storage = new TaskStorage()
    this.renderer = new TaskRenderer()
    this.tasks = []
    this.currentFilter = 'all'
  }

  init() {
    this.loadTasks()
    this.bindEvents()
    this.render()
  }

  loadTasks() {
    this.tasks = this.storage.getTasks()
  }

  bindEvents() {
    const taskInput = document.getElementById('task-input')
    const addButton = document.getElementById('add-task')
    const taskList = document.getElementById('task-list')
    const filterTabs = document.querySelectorAll('.filter-tab')

    // Add task events
    addButton.addEventListener('click', () => this.addTask())
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask()
    })

    // Task list events (delegation)
    taskList.addEventListener('click', (e) => {
      const taskItem = e.target.closest('.task-item')
      if (!taskItem) return

      const taskId = parseInt(taskItem.dataset.taskId)

      if (e.target.closest('.task-checkbox')) {
        this.toggleTask(taskId)
      } else if (e.target.closest('.delete-button')) {
        this.deleteTask(taskId)
      }
    })

    // Filter events
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.setFilter(tab.dataset.filter)
        this.updateFilterTabs(tab)
      })
    })
  }

  addTask() {
    const input = document.getElementById('task-input')
    const text = input.value.trim()

    if (!text) return

    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }

    this.tasks.unshift(task)
    this.storage.saveTasks(this.tasks)
    input.value = ''
    this.render()

    // Add animation class
    setTimeout(() => {
      const newTaskElement = document.querySelector(`[data-task-id="${task.id}"]`)
      if (newTaskElement) {
        newTaskElement.classList.add('task-added')
      }
    }, 50)
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.storage.saveTasks(this.tasks)
      this.render()
    }
  }

  deleteTask(id) {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`)
    if (taskElement) {
      taskElement.classList.add('task-removing')
      setTimeout(() => {
        this.tasks = this.tasks.filter(t => t.id !== id)
        this.storage.saveTasks(this.tasks)
        this.render()
      }, 300)
    }
  }

  setFilter(filter) {
    this.currentFilter = filter
    this.render()
  }

  updateFilterTabs(activeTab) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.remove('active')
    })
    activeTab.classList.add('active')
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'completed':
        return this.tasks.filter(task => task.completed)
      case 'pending':
        return this.tasks.filter(task => !task.completed)
      default:
        return this.tasks
    }
  }

  updateStats() {
    const total = this.tasks.length
    const completed = this.tasks.filter(t => t.completed).length
    const pending = total - completed

    document.getElementById('total-tasks').textContent = total
    document.getElementById('completed-tasks').textContent = completed
    document.getElementById('pending-tasks').textContent = pending
  }

  render() {
    const filteredTasks = this.getFilteredTasks()
    this.renderer.render(filteredTasks)
    this.updateStats()
  }
}