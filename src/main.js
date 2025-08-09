import './style.css'
import { TaskManager } from './components/TaskManager.js'
import { ThemeManager } from './utils/ThemeManager.js'

// Initialize theme
const themeManager = new ThemeManager()

// Initialize the app
const app = document.querySelector('#app')
const taskManager = new TaskManager()

app.innerHTML = `
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3 8-8"/>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.23"/>
            </svg>
          </div>
          <h1 class="app-title">TaskFlow</h1>
        </div>
        <button class="theme-toggle" id="theme-toggle">
          <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>
    
    <main class="main-content">
      <div class="task-container">
        <div class="task-input-section">
          <div class="input-group">
            <input 
              type="text" 
              id="task-input" 
              placeholder="What needs to be done?" 
              class="task-input"
            />
            <button id="add-task" class="add-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Task
            </button>
          </div>
        </div>
        
        <div class="task-stats">
          <div class="stat-item">
            <span class="stat-number" id="total-tasks">0</span>
            <span class="stat-label">Total</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="completed-tasks">0</span>
            <span class="stat-label">Completed</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="pending-tasks">0</span>
            <span class="stat-label">Pending</span>
          </div>
        </div>
        
        <div class="filter-tabs">
          <button class="filter-tab active" data-filter="all">All</button>
          <button class="filter-tab" data-filter="pending">Pending</button>
          <button class="filter-tab" data-filter="completed">Completed</button>
        </div>
        
        <div class="task-list" id="task-list">
          <div class="empty-state">
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 11l3 3 8-8"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.23"/>
              </svg>
            </div>
            <h3>No tasks yet</h3>
            <p>Add your first task to get started with TaskFlow</p>
          </div>
        </div>
      </div>
    </main>
  </div>
`

// Initialize task manager
taskManager.init()

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle')
themeToggle.addEventListener('click', () => {
  themeManager.toggleTheme()
})