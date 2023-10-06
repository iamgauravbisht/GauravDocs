const signup_post = async (
  username: string,
  email: string,
  password: string
) => {
  return await fetch("http://localhost:3000/signup", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const verifyAuth = async () => {
  return await fetch("http://localhost:3000/verifyAuth", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const login_post = async (email: string, password: string) => {
  return await fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const logout = async () => {
  return await fetch("http://localhost:3000/logout", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const Me = async () => {
  return await fetch(`http://localhost:3000/me`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};

export { signup_post, login_post, Me, verifyAuth, logout };
