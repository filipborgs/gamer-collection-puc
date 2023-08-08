
export class LocalStorageAdapter {
  set(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  clear() {
    localStorage.clear()
  }
}
