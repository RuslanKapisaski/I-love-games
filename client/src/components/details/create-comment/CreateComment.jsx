import { useState } from "react";
import { useParams } from "react-router";

export default function CreateComment({ user, onCreate }) {
  // Add Comment ( Only for logged-in users, which is not creators of the current game )
  const { gameId } = useParams();
  const [comment, setComment] = useState("");

  function changeHandler(e) {
    setComment(e.target.value);
  }

  const commentData = {
    user: user?.email,
    gameId,
    message: comment,
  };

  function submitHandler() {
    fetch(
      `http://localhost:3030/jsonstore/games/comments`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(commentData),
      },

      setComment(" "),
      onCreate()
    ).catch((err) => alert(err));
  }
  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" action={submitHandler}>
        <textarea
          name="comment"
          value={comment}
          onChange={changeHandler}
          disabled={!user}
          placeholder="Comment......"
        ></textarea>
        <input className="btn submit" type="submit" value="Add Comment" />
      </form>
    </article>
  );
}
