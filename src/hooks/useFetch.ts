import { useEffect, useState } from "react";

type dataType<T> = T | null;
type errorType = Error | null;

interface Params<T> {
  data: dataType<T>;
  error: errorType;
}

export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<dataType<T>>(null);
  const [error, setError] = useState<errorType>(null);
  useEffect(() => {
    let controller = new AbortController();
    const fetchdata = async () => {
      try {
        const res = await fetch(url, controller);
        if (!res.ok) {
          throw new Error("Respuesta invalida");
        }
        const jsonData: dataType<T> = await res.json();
        setData(jsonData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err as Error);
        }
      }
    };

    fetchdata();

    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, error };
};
