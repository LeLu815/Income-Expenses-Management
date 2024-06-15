import randomColor from "randomcolor";

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

// 로컬스토리지에 컬러 추가
const COLOR_LIST = "colorList";
const COLOR_COUNT = "colorCount";

// 컬러 리스트 초기화하기
export const initialColor = (moreColorCount = 30) => {
  const currentColorCount = JSON.parse(localStorage.getItem(COLOR_COUNT));
  if (currentColorCount) {
    return;
  } else {
    const randomColorList = randomColor({
      count: moreColorCount,
      format: "rgb",
    });
    localStorage.setItem(COLOR_LIST, JSON.stringify(randomColorList));
    localStorage.setItem(COLOR_COUNT, JSON.stringify(moreColorCount));
  }
};

// 컬러 리스트 추가하기
export const addMoreColor = (moreColorCount = 30) => {
  // 먼저 컬러 카운트가 존재하는지 확인
  const currentColorCount = JSON.parse(localStorage.getItem(COLOR_COUNT));
  // 없으면
  if (!currentColorCount) {
    const randomColorList = randomColor({
      count: moreColorCount,
      format: "rgb",
    });
    localStorage.setItem(COLOR_LIST, JSON.stringify(randomColorList));
    localStorage.setItem(COLOR_COUNT, JSON.stringify(moreColorCount));
  } else {
    const newColorCount = Number(currentColorCount) + Number(moreColorCount);
    const randomColorList = randomColor({
      count: newColorCount,
      format: "rgb",
    });
    localStorage.setItem(COLOR_LIST, JSON.stringify(randomColorList));
    localStorage.setItem(COLOR_COUNT, JSON.stringify(newColorCount));
  }
};

// 컬러 카운트 가져오기
export const getColorCount = () => {
  const colorCount = JSON.parse(localStorage.getItem(COLOR_COUNT));
  return colorCount;
};
// 컬러 리스트 가져오기
export const getColorList = () => {
  const colorList = JSON.parse(localStorage.getItem(COLOR_LIST));
  return colorList;
};
