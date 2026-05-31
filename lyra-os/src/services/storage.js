export function loadSetting(key, fallback = null) {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

export function saveSetting(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
