export class TaskRenderer {
  constructor() {
    this.container = document.getElementById('itemList');
  }

  render(items, currentView) {
    this.container.innerHTML = '';
    
    if (items.length === 0) {
      this.renderEmptyState(currentView);
      return;
    }

    items.forEach(item => {
      if (item.type === 'task') {
        this.renderTask(item);
      } else if (item.type === 'note') {
        this.renderNote(item);
      }
    });
  }

  renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = `item ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
      <input type="checkbox" class="item-checkbox" ${task.completed ? 'checked' : ''} 
             onchange="window.taskManager.toggleTask(${task.id})">
      <span class="item-text">${this.escapeHtml(task.text)}</span>
      <button class="delete-btn" onclick="window.taskManager.deleteItem(${task.id})">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
      </button>
    `;
    
    this.container.appendChild(taskElement);
  }

  renderNote(note) {
    const noteElement = document.createElement('div');
    const preview = note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content;
    const date = new Date(note.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    noteElement.className = `note-item ${note.expanded ? 'expanded' : ''}`;
    noteElement.innerHTML = `
      <div class="note-header">
        <button class="expand-btn" onclick="window.taskManager.toggleNoteExpansion(${note.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="${note.expanded ? '18,15 12,9 6,15' : '6,9 12,15 18,9'}"></polyline>
          </svg>
        </button>
        <span class="note-date">${date}</span>
        <button class="delete-btn" onclick="window.taskManager.deleteItem(${note.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,2h4a2,2 0 0,1 2,2v2"></path>
          </svg>
        </button>
      </div>
      <div class="note-preview">${this.escapeHtml(preview)}</div>
      <div class="note-content">${this.escapeHtml(note.content)}</div>
    `;
    
    this.container.appendChild(noteElement);
  }

  renderEmptyState(currentView) {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'empty-state';
    
    const message = currentView === 'tasks' 
      ? 'No tasks yet. Add one above to get started!' 
      : 'No notes yet. Write your first note above!';
    
    const icon = currentView === 'tasks' ? '📝' : '📄';
    
    emptyElement.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">All caught up!</p>
        <p style="font-size: 0.9rem;">${message}</p>
      </div>
    `;
    
    this.container.appendChild(emptyElement);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}