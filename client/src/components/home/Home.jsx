import { useEffect, useState } from "react";
import Game from "../game/Game";
import useFetch from "../../hooks/useFetch";

export default function Home() {
  const {
    state: latestGames,
    error,
    loading,
  } = useFetch(
    "http://localhost:3030/jsonstore/games",
    [],
    (data) => Object.values(data),
    (arr) => arr.sort((a, b) => b._createdOn - a._createdOn),
    3
  );

  return (
    <section id="welcome-world">
      <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in </h3>
        <img id="logo-left" src="./public/images/logo.png" alt="logo" />
      </div>

      <div id="home-page">
        <h1>Latest Games</h1>
        <div id="latest-wrap">
          {error && <p className="no-articles">Loading games error:{error}</p>}
          {loading === true ? (
            <p className="no-articles">Loading...</p>
          ) : (
            <div className="home-container">
              {latestGames.length === 0 && (
                <p className="no-articles">No Added Games Yet</p>
              )}

              {latestGames.map((game) => (
                <Game key={game._id} {...game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
