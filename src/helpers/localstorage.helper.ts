export function getTokenFormLocalStorage() {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("token");
    const token = data ? JSON.parse(data) : "";

    return token as string;
  }

  return "";
}

export function setTokenToLocalStorage(key: string, token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(token));
  }
}

export function removeTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}
