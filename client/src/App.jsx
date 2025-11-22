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

function App() {
  const [user, setUser] = useState(null);

  function authHandler(email) {
    setUser({ email });
  }

  return (
    <>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/games/create" element={<CreateGame />} />
        <Route path="/games/:gameId/details" element={<Details />} />
        <Route
          path="/register"
          element={<Register user={user} onRegister={authHandler} />}
        />
        <Route path="/login" element={<Login onLogin={authHandler} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
