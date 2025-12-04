import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";

export default function CreateGame() {
  const navigate = useNavigate();
  const { request } = useRequest();
  async function createGameHandler(values) {
    const data = values;

    data.players = Number(data.players);

    try {
      const newGame = request("/data/games", "POST", data);
      navigate("/catalog");
    } catch (err) {
      throw new Error(err.message);

      alert(`Unable to create new game`, err.message);
    }
  }

  const { register, formAction } = useForm(createGameHandler, {
    title: "",
    genre: "",
    players: 0,
    date: "",
    imageUrl: "",
    summary: "",
  });
  return (
    //  <!-- add Page ( Only for logged-in users ) -->
    <section id="add-page">
      <form id="add-new-game" action={formAction}>
        <div className="container">
          <h1>Add New Game</h1>

          <div className="form-group-half">
            <label htmlFor="gameName">Game Name:</label>
            <input
              type="text"
              id="gameName"
              {...register("title")}
              placeholder="Enter game title..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              {...register("genre")}
              placeholder="Enter game genre..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="activePlayers">Active Players:</label>
            <input
              type="number"
              id="activePlayers"
              {...register("players")}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="releaseDate">Release Date:</label>
            <input type="date" id="releaseDate" name="date" />
          </div>

          <div className="form-group-full">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              {...register("imageUrl")}
              placeholder="Enter image URL..."
            />
          </div>

          <div className="form-group-full">
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              rows="5"
              {...register("summary")}
              placeholder="Write a brief summary..."
            ></textarea>
          </div>

          <input className="btn submit" type="submit" value="ADD GAME" />
        </div>
      </form>
    </section>
  );
}
