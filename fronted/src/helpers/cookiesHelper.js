function addOrUpdateCookie(name, value, daysToExpire = 30) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const existingCookie = getCookie(name);
  if (!existingCookie) {
    document.cookie = `${name}=${value};`;
  } else {
    const currentCookies = document.cookie;
    document.cookie = `${currentCookies}; ${name}=${value};`;
  }
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const res = cookies.filter((cookie) => {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  });
  if (res.length > 0) {
    return res[0];
  }
  return false;
}

export default {
  getCookie,
  addOrUpdateCookie,
};
