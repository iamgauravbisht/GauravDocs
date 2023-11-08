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

const signup_post = async (
  username: string,
  email: string,
  password: string
) => {
  return await fetch("https://docserver-f592a31654e4.herokuapp.com/signup", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const verifyAuth = async () => {
  const jwtValue = getCookie("jwt");

  if (jwtValue !== "") {
    // Use the cookie value
    console.log("Value of myCookie:", jwtValue);
  } else {
    // Cookie not found
    console.log("myCookie not found.");
  }
  return await fetch(
    `https://docserver-f592a31654e4.herokuapp.com/verifyAuth?jwt=${jwtValue}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json());
};

const login_post = async (email: string, password: string) => {
  return await fetch("https://docserver-f592a31654e4.herokuapp.com/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const Me = async () => {
  const jwtValue = getCookie("jwt");

  if (jwtValue !== "") {
    // Use the cookie value
    console.log("Value of myCookie:", jwtValue);
  } else {
    // Cookie not found
    console.log("myCookie not found.");
  }
  return await fetch(
    `https://docserver-f592a31654e4.herokuapp.com/me?jwt=${jwtValue}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => {
    return res.json();
  });
};

export { signup_post, login_post, Me, verifyAuth };
