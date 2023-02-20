export function setLocalStorage(key, value) {
  if (key && ('' + value)) {
    if (value.constructor !== String) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
}


export function getLocalStorage(key) {
  const json = localStorage.getItem(key);
  if (json) {
    const output = JSON.parse(json);
    return output;
  }
  localStorage.setItem(key, JSON.stringify({}));
  return {};
}

export function removeLocalStorage(key) {
  if (key) {
    localStorage.removeItem(key);
  }
}

export function deepCopy(data = {}) {
  return JSON.parse(JSON.stringify(data));
}
