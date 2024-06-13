// 세션 스토리지 저장
export const setDataToSession = (key, value) => {
  const stringified = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringified);
};
// 세션 스토리지 가져오기
export const getDataToSession = (key) => {
  const data = window.sessionStorage.getItem(key);
  return JSON.parse(data);
};

// 로컬 스토리지 저장
export const setDataToLocal = (key, value) => {
  const stringified = JSON.stringify(value);
  window.localStorage.setItem(key, stringified);
};
// 로컬 스토리지 가져오기
export const getDataToLocal = (key) => {
  const data = window.localStorage.getItem(key);
  return JSON.parse(data);
};
