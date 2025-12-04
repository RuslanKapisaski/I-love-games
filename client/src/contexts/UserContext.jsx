import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  registerHandler() {},
  loginHandler() {},
  logoutHandler() {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function registerHandler(email, password) {
    const newUser = { email, password };

    fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((err) => alert(err.message));

    // auto login
    setUser(newUser);
  }

  async function loginHandler(email, password) {
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const userData = await response.json();
    setUser(userData);
    return userData;
  }

  function logoutHandler() {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    if (user?.accessToken) {
      options.headers["X-Authorization"] = user.accessToken;
    }

    return fetch("http://localhost:3030/users/logout", options).finally(() =>
      setUser(null)
    );
  }

  const userContextValues = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const contextData = useContext(UserContext);
  return contextData;
}
