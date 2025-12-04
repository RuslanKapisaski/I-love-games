import { useState } from "react";
import { useParams } from "react-router";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";

export default function CreateComment({ user, onCreate }) {
  // Add Comment ( Only for logged-in users, which is not creators of the current game )
  const { gameId } = useParams();
  const { request } = useRequest();

  async function submitHandler({ comment }) {
    try {
      await request(`/data/comments`, "POST", {
        message: comment,
        gameId,
      });

      onCreate();
    } catch {
      (err) => alert(err.message);
    }
  }

  const { register, formAction } = useForm(submitHandler, {
    comment: "",
  });

  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" action={formAction}>
        <textarea
          {...register("comment")}
          disabled={!user}
          placeholder="Comment......"
        ></textarea>
        <input className="btn submit" type="submit" value="Add Comment" />
      </form>
    </article>
  );
}
