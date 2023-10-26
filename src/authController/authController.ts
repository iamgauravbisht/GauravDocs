function getCookie(cookieName: string) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}
const jwtValue = getCookie("jwt");

if (jwtValue !== "") {
  // Use the cookie value
  console.log("Value of myCookie:", jwtValue);
} else {
  // Cookie not found
  console.log("myCookie not found.");
}

const signup_post = async (
  username: string,
  email: string,
  password: string
) => {
  return await fetch("https://docserver-ecsy.onrender.com/signup", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const verifyAuth = async () => {
  return await fetch(
    `https://docserver-ecsy.onrender.com/verifyAuth?jwt=${jwtValue}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json());
};

const login_post = async (email: string, password: string) => {
  return await fetch("https://docserver-ecsy.onrender.com/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const logout = async () => {
  return await fetch("https://docserver-ecsy.onrender.com/logout", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const Me = async () => {
  return await fetch(`https://docserver-ecsy.onrender.com/me?jwt=${jwtValue}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
};

export { signup_post, login_post, Me, verifyAuth, logout };
