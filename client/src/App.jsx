import { Route, Routes } from "react-router";
import { useContext, useState } from "react";

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
import { UserContext } from "./contexts/UserContext.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/games/create" element={<CreateGame />} />
        <Route path="/games/:gameId/details" element={<Details />} />
        <Route path="/games/:gameId/edit" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
