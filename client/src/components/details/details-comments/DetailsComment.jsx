import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";

export default function DetailsComment({ refresh }) {
  // Display paragraph: If there are no games in the database

  const { gameId } = useParams();

  const urlParams = new URLSearchParams({
    where: `gameId="${gameId}"`,
    load: "author=_ownerId:users",
  });

  const { data: comments } = useRequest(
    `/data/comments?${urlParams.toString()}`,
    []
  );

  return (
    <>
      {comments.length > 0 ? (
        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id} className="comment">
                <p>
                  {comment.author.email} : {comment.message}
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
