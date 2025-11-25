import { useEffect, useState } from "react";

export default function useFetch(
  url,
  initialState,
  transformData = (data) => data,
  sortData = (data) => data,
  sliceData = null
) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((responce) => {
        if (!responce.ok) {
          throw new Error(responce.text);
        }
        return responce.json();
      })
      .then((result) => {
        const transformedData = transformData(result);
        const sortedData = sortData(transformedData);
        const finalData =
          sliceData !== null ? sortedData.slice(0, sliceData) : sorted;

        setState(finalData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { state, error, loading };
}
