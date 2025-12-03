import { Route, Routes } from "react-router";
import { useState } from "react";

import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import CreateGame from "./components/game-create/CreateGame";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Logout from "./components/logout/Logout.jsx";
import Edit from "./components/edit/Edit.jsx";
import UserContext from "./contexts/UserContext.js";

function App() {
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
      .then((responce) => responce.json())
      .then((result) => setUser(result))
      .catch((err) => alert(err.message));

    //auto login after register
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
    setUser(null);
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
      <>
        <Header user={user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/games/create" element={<CreateGame />} />
          <Route
            path="/games/:gameId/details"
            element={<Details user={user} />}
          />
          <Route path="/games/:gameId/edit" element={<Edit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer />
      </>
    </UserContext.Provider>
  );
}

export default App;
