import { useState, useEffect } from "react";

const useFetchData = <T>(
  fetchFunction: (userId: number) => Promise<T>,
  userId: number | null
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    if (!userId) {
      setError(new Error("Erreur lors de la récupération de l'identifiant"));
      return {
        data: null,
        isLoading: false,
        error: new Error("Erreur lors de la récupération de l'identifiant"),
      };
    }

    try {
      const result = await fetchFunction(userId);
      setData(result);
    } catch (e: any) {
      setIsLoading(false);
      setError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
