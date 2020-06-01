export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

export function signIn(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch("/auth/log-in", requestOptions)
    .then((data) => {
      return data.json();
    })
    .then(handleResponse);
}

export function signOut() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      resolve(response.user);
    } else {
      reject(response.error);
    }
  });
}
