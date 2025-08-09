import { TaskStorage } from '../utils/TaskStorage.js';
import { TaskRenderer } from './TaskRenderer.js';
import { ThemeManager } from '../utils/ThemeManager.js';

export class TaskManager {
  constructor() {
    this.items = TaskStorage.loadItems();
    this.currentFilter = 'all';
    this.currentView = 'tasks'; // 'tasks' or 'notes'
    this.renderer = new TaskRenderer();
    this.themeManager = new ThemeManager();
    
    this.init();
  }

  init() {
    this.setupViewToggle();
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const taskInput = document.getElementById('itemInput');
    const noteTextarea = document.getElementById('noteTextarea');
    const addButton = document.getElementById('addButton');
    const addNoteButton = document.getElementById('addNoteButton');
    const filterButtons = document.querySelectorAll('.filter-btn');

    taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    noteTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) this.addNote();
    });

    addButton.addEventListener('click', () => {
      this.addTask();
    });

    addNoteButton.addEventListener('click', () => {
      this.addNote();
    });

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.updateFilterButtons();
        this.render();
      });
    });
  }

  setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = btn.dataset.view;
        this.updateViewButtons();
        this.updateInputArea();
        this.render();
      });
    });
  }

  updateViewButtons() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === this.currentView);
    });
  }

  updateInputArea() {
    const taskInputGroup = document.getElementById('taskInputGroup');
    const noteInputGroup = document.getElementById('noteInputGroup');
    const taskStats = document.getElementById('taskStats');
    const noteStats = document.getElementById('noteStats');

    if (this.currentView === 'tasks') {
      taskInputGroup.classList.remove('hidden');
      noteInputGroup.classList.add('hidden');
      taskStats.classList.remove('hidden');
      noteStats.classList.add('hidden');
    } else {
      taskInputGroup.classList.add('hidden');
      noteInputGroup.classList.remove('hidden');
      taskStats.classList.add('hidden');
      noteStats.classList.remove('hidden');
    }
  }

  addTask() {
    const input = document.getElementById('itemInput');
    const text = input.value.trim();
    
    if (text) {
      const task = {
        id: Date.now(),
        text,
        completed: false,
        type: 'task',
        createdAt: new Date().toISOString()
      };
      
      this.items.unshift(task);
      TaskStorage.saveItems(this.items);
      input.value = '';
      this.render();
    }
  }

  addNote() {
    const textarea = document.getElementById('noteTextarea');
    const content = textarea.value.trim();
    
    if (content) {
      const note = {
        id: Date.now(),
        content,
        type: 'note',
        createdAt: new Date().toISOString(),
        expanded: false
      };
      
      this.items.unshift(note);
      TaskStorage.saveItems(this.items);
      textarea.value = '';
      this.render();
    }
  }

  toggleTask(id) {
    const item = this.items.find(item => item.id === id);
    if (item && item.type === 'task') {
      item.completed = !item.completed;
      TaskStorage.saveItems(this.items);
      this.render();
    }
  }

  deleteItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    TaskStorage.saveItems(this.items);
    this.render();
  }

  toggleNoteExpansion(id) {
    const item = this.items.find(item => item.id === id);
    if (item && item.type === 'note') {
      item.expanded = !item.expanded;
      this.render();
    }
  }

  updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
    });
  }

  getFilteredItems() {
    let items = this.items.filter(item => item.type === this.currentView.slice(0, -1)); // 'tasks' -> 'task'
    
    if (this.currentView === 'tasks') {
      switch (this.currentFilter) {
        case 'pending':
          return items.filter(item => !item.completed);
        case 'completed':
          return items.filter(item => item.completed);
        default:
          return items;
      }
    }
    
    return items;
  }

  updateStats() {
    if (this.currentView === 'tasks') {
      const tasks = this.items.filter(item => item.type === 'task');
      const completed = tasks.filter(task => task.completed).length;
      const pending = tasks.length - completed;

      document.getElementById('totalTasks').textContent = tasks.length;
      document.getElementById('completedTasks').textContent = completed;
      document.getElementById('pendingTasks').textContent = pending;
    } else {
      const notes = this.items.filter(item => item.type === 'note');
      const totalWords = notes.reduce((sum, note) => {
        return sum + note.content.split(/\s+/).filter(word => word.length > 0).length;
      }, 0);

      document.getElementById('totalNotes').textContent = notes.length;
      document.getElementById('totalWords').textContent = totalWords;
    }
  }

  render() {
    const filteredItems = this.getFilteredItems();
    this.renderer.render(filteredItems, this.currentView);
    this.updateStats();
    this.updateFilterButtons();
    this.updateViewButtons();
    this.updateInputArea();
  }
}