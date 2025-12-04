import { useEffect, useState } from "react";
import { Link } from "react-router";
import Game from "../game/Game";
import useRequest from "../../hooks/useRequest";

export default function Catalog() {
  const { data: games } = useRequest("/data/games", []);

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
