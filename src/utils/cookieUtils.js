// src/utils/cookieUtils.js

/**
 * 쿠키에서 특정 이름의 값을 가져오는 함수
 * @param {string} name - 가져올 쿠키의 이름
 * @returns {string|null} - 쿠키 값 또는 null
 */
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
