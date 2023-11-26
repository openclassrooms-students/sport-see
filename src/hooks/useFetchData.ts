// import { useState, useEffect } from "react";

// const useFetchData = <T>(
//   fetchFunction: (userId: number) => Promise<T>,
//   userId: number | null
// ) => {
//   const [data, setData] = useState<T | null>(null);

//   const fetchData = async () => {
//     if (!userId) {
//       throw new Error("Erreur lors de la récupération de l'identifiant");
//     }
//     try {
//       const result = await fetchFunction(userId);
//       setData(result);
//     } catch (e) {
//       throw e;
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [userId]);

//   return data;
// };

// export default useFetchData;



import { useState, useEffect } from "react";

const useFetchData = <T>(
  fetchFunction: (userId: number) => Promise<T>,
  userId: number | null
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    if (!userId) {
      throw new Error("Erreur lors de la récupération de l'identifiant");
    }
    try {
      const result = await fetchFunction(userId);
      setData(result);
    } catch (e) {
      throw e;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (isLoading) {
    throw new Promise((resolve) => {});
  }

  return data;
};

export default useFetchData;
