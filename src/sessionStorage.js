const getItem = (key) => {
  const value = sessionStorage.getItem(key)
  return value === null ? [] : JSON.parse(value)
}

const setItem = (key, value) => {
  if(!value) return;
  sessionStorage.setItem(key, JSON.stringify(value))
}

export { getItem, setItem }