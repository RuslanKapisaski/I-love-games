import { Route, Routes } from "react-router";

import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import CreateGame from "./components/game-create/CreateGame";
import Register from "./components/register/Register.jsx";

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route path="/games/create" element={<CreateGame />} />
				<Route path="/games/:gameId/details" element={<Details />} />
				<Route path="/register" element={<Register />} />
			</Routes>

			<Footer />
		</>
	);
}

export default App;
