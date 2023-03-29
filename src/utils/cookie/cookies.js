import Cookies from "universal-cookie";

const setCookie = (name, value) => {
  const cookies = new Cookies();
  let d = new Date();
  d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);

  cookies.set(name, value, { path: "/", expires: d });
};

const getCookie = (name) => {
  const cookies = new Cookies();
  return cookies.get(name);
};

const clearCookie = (name) => {
  const cookies = new Cookies();
  cookies.remove(name, { path: "/" });
};

export { setCookie, getCookie, clearCookie };
