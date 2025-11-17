import { useEffect, useState } from "react";
import { Link } from "react-router";
import Game from "../game/Game";

export default function Catalog() {
  const BASE_URL = "http://localhost:3030/jsonstore/games";
  const [games, setGames] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        setGames(Object.values(result));
      } catch (error) {
        alert(error.message);
      }
    })();
  }, []);

  return (
    <section id="catalog-page">
      <h1>Catalog</h1>
      <div className="catalog-container">
        {games && games.length > 0 ? (
          games.map((game) => <Game key={game._id} {...game} />)
        ) : (
          <h3 className="no-articles">No Added Games Yet</h3>
        )}
      </div>
    </section>
  );
}
