import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function DetailsComment({ refresh }) {
  // Display paragraph: If there are no games in the database

  const { gameId } = useParams();
  const [gameComments, setGameComments] = useState("");

  useEffect(() => {
    fetch("http://localhost:3030/jsonstore/games/comments")
      .then((response) => response.json())
      .then((result) => {
        const currComents = Object.values(result).filter(
          (comment) => comment.gameId === gameId
        );
        setGameComments(currComents);
      })
      .catch((err) => alert(err.message));
  }, [gameId, refresh]);

  return (
    <>
      {gameComments.length > 0 ? (
        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            {gameComments.map((comment) => (
              <li key={comment._id} className="comment">
                <p>
                  {comment.user.email} : {comment.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-comment">No comments.</p>
      )}
    </>
  );
}
