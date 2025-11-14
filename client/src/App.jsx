import { Route, Routes } from "react-router";

import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Games from "./components/games/Games";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
