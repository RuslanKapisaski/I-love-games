import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Edit() {
  const { gameId } = useParams();

  const initialValues = {
    title: "",
    genre: "",
    players: "",
    date: "",
    imageUrl: "",
    summary: "",
  };

  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: [e.target.value] }));
  };

  useEffect(() => {
    fetch(`http://localhost:3030/jsonstore/games/${gameId}`)
      .then((response) => response.json())
      .then((result) => setValues(result))
      .catch((err) => alert(err.message));
  }, [gameId]);

  return (
    //  <!-- add Page ( Only for logged-in users ) -->
    <section id="edit-page">
      <form id="add-new-game">
        <div className="container">
          <h1>Edit Game</h1>

          <div className="form-group-half">
            <label htmlFor="gameName">Game Name:</label>
            <input
              type="text"
              id="gameName"
              name="title"
              value={values.title}
              onChange={changeHandler}
              placeholder="Enter game title..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={values.genre}
              onChange={changeHandler}
              placeholder="Enter game genre..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="activePlayers">Active Players:</label>
            <input
              type="number"
              id="activePlayers"
              name="players"
              value={values.players}
              onChange={changeHandler}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="date"
              id="releaseDate"
              name="date"
              value={values.date}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group-full">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={values.imageUrl}
              onChange={changeHandler}
              placeholder="Enter image URL..."
            />
          </div>

          <div className="form-group-full">
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              rows="5"
              name="summary"
              value={values.summary}
              onChange={changeHandler}
              placeholder="Write a brief summary..."
            ></textarea>
          </div>

          <input className="btn submit" type="submit" value="EDIT GAME" />
        </div>
      </form>
    </section>
  );
}
