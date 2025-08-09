export class TaskRenderer {
  render(tasks) {
    const taskList = document.getElementById('task-list')
    
    if (tasks.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 11l3 3 8-8"/>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.23"/>
            </svg>
          </div>
          <h3>No tasks found</h3>
          <p>Try adjusting your filter or add a new task</p>
        </div>
      `
      return
    }

    taskList.innerHTML = tasks.map(task => this.renderTask(task)).join('')
  }

  renderTask(task) {
    const createdDate = new Date(task.createdAt).toLocaleDateString()
    
    return `
      <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
        <div class="task-content">
          <button class="task-checkbox ${task.completed ? 'checked' : ''}">
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          </button>
          <div class="task-text-container">
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <span class="task-date">${createdDate}</span>
          </div>
        </div>
        <button class="delete-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      </div>
    `
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}