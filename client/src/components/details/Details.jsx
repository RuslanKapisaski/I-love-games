import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import DetailsComment from "./details-comments/DetailsComment";
import CreateComment from "./create-comment/CreateComment";
import { useUserContext } from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";

export default function Details() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { gameId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const { request } = useRequest();
  const { data: game } = useRequest(`/data/games/${gameId}`, {});

  function refreshHandler() {
    setRefresh((state) => !state);
  }

  async function deleteHandler() {
    const isConfirmed = confirm(
      `Are you sure you want to delete ${game.title}`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await request(`/data/games/${gameId}`, "DELETE");

      navigate("/catalog");
    } catch (err) {
      alert(`Unable to delete ${game.title}`, err.message);
    }
  }

  {
    return (
      <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">
          <div className="header-and-image">
            <img className="game-img" src={game.imageUrl} alt={game.title} />
            <div className="meta-info">
              <h1 className="game-name">{game.title}</h1>
              <p className="data-row">
                <span className="label">Genre:</span>
                <span className="value">{game.genre}</span>
              </p>
              <p className="data-row">
                <span className="label">Active Players:</span>
                <span className="value">{game.players}</span>
              </p>
              <p className="data-row">
                <span className="label">Release Date:</span>
                <span className="value">{game.date}</span>
              </p>
            </div>
            <div className="summary-section">
              <h2>Summary:</h2>
              <p className="text-summary">{game.summary}</p>
            </div>
          </div>
          {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
          {/* {game._ownerId === game._id && ( */}
          <div className="buttons">
            <Link to={`/games/${gameId}/edit`} className="button">
              Edit
            </Link>
            <a className="button" onClick={deleteHandler}>
              Delete
            </a>
          </div>
        </div>

        <DetailsComment refresh={refresh} />
        {user && <CreateComment user={user} onCreate={refreshHandler} />}
      </section>
    );
  }
}
