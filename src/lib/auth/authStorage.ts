import Cookies from "js-cookie";

const TOKEN_KEY = "jwt";

export const getToken = () => {
  return Cookies.get(TOKEN_KEY) ?? null;
};

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "lax",
  });
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};