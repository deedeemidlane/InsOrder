export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return "";
}

export function removeToken(): void {
  localStorage.removeItem("token");
}
