export function setLocalStorage(key, value) {
  if (key && ('' + value)) {
    if (value.constructor !== String) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
}


export function getLocalStorage(key) {
  let item = localStorage.getItem(key);
  if (item) {
    try {
      JSON.parse(item)
    } catch (e) {
      return item;
    }
  }
  return item && JSON.parse(item);
}

export function removeLocalStorage(key) {
  if (key) {
    localStorage.removeItem(key);
  }
}

export function deepCopy(data = {}) {
  return JSON.parse(JSON.stringify(data));
}
