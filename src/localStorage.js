const getItem = (key) => {
  const value = localStorage.getItem(key)
  return value === null ? [] : JSON.parse(value)
}

const setItem = (key, value) => {
  if(!value) return;
  localStorage.setItem(key, JSON.stringify(value))
}

export { getItem, setItem }