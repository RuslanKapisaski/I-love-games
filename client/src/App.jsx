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

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState(null);

  function registerHandler(email, password) {
    if (registeredUsers.some((user) => user.email === email)) {
      throw new Error("Email is taken!");
    }

    const newUser = { email, password };
    setRegisteredUsers((state) => [...state, newUser]);

    //auto login after register
    setUser(newUser);
  }

  function loginHandler(email, password) {
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("No such a user!");
    }

    setUser(user);
  }

  function logoutHandler() {
    setUser(null);
  }

  return (
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
        <Route
          path="/register"
          element={<Register user={user} onRegister={registerHandler} />}
        />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />

        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
