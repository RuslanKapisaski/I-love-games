import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest(url, initialState) {
  const { user, isAuthenticated } = useContext(UserContext);
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (!url) return;

    request(url)
      .then((result) => setData(result))
      .catch((err) => alert(err.message));
  }, [url]);

  const request = async (url, method = "GET", data = null, config = {}) => {
    let options = {};

    if (method) {
      options.method = method;
    }

    if (data) {
      options.headers = {
        "content-type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    if (config.accessToken || isAuthenticated) {
      options.headers = {
        "X-Authorization": config.accessToken || user.accessToken,
      };
    }

    try {
      const response = await fetch(`${baseUrl}${url}`, options);

      if (!response.ok) {
        throw new Error(
          `Request failed: ${result.message || response.statusText}`
        );
      }

      return response.json();
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  return { request, data, setData };
}
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../contexts/UserContext";

// const baseUrl = "http://localhost:3030";

// export default function useRequest(url, initialState) {
//   const { user, isAuthenticated } = useContext(UserContext);
//   const [data, setData] = useState(initialState);

//   useEffect(() => {
//     if (!url) return;

//     request(url)
//       .then((result) => setData(result))
//       .catch((err) => alert(err.message));
//   }, [url]);

//   const request = async (url, method = "GET", bodyData = null, config = {}) => {
//     const options = {
//       method,
//       headers: {},
//     };

//     // Add authorization header
//     if (config.accessToken || isAuthenticated) {
//       options.headers["X-Authorization"] =
//         config.accessToken || user.accessToken;
//     }

//     // Only attach body for non-GET requests
//     if (method !== "GET" && method !== "HEAD" && bodyData) {
//       options.headers["Content-Type"] = "application/json";
//       options.body = JSON.stringify(bodyData);
//     }

//     try {
//       const response = await fetch(`${baseUrl}${url}`, options);

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || response.statusText);
//       }

//       return response.json();
//     } catch (err) {
//       alert(err.message);
//       throw err;
//     }
//   };

//   return { request, data, setData };
// }
