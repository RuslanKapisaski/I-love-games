import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest(URL, method, data, config = {}) {
  const { user, isAuthenticated } = useContext(UserContext);

  let options = {};

  if (method) {
    options.method = method;
  }

  if (data) {
    options.headers = {
      "content-type": "application/json",
    };
  }

  options.body = JSON.stringify(data);

  if (config.accessToken || isAuthenticated) {
    options.headers = {
      "X-Auhtorization": config.accessToken || user.accessToken,
    };
  }

  fetch(`${baseUrl}${url}`, options)
    .then((responce) => responce.json())
    .then((result) => {
      return result;
    })
    .catch((err) => alert(err.message));
}
