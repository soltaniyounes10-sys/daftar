export class TaskStorage {
  static STORAGE_KEY = 'taskflow-items';

  static loadItems() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading items from storage:', error);
      return [];
    }
  }

  static saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to storage:', error);
    }
  }

  static clearItems() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing items from storage:', error);
    }
  }

  static exportItems() {
    const items = this.loadItems();
    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  static importItems(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const items = JSON.parse(e.target.result);
          this.saveItems(items);
          resolve(items);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
}