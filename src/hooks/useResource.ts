import { useEffect, useState } from "react";

export type Resource<T> = {
  read: () => Promise<T>;
};

export const useResource = <T>(
  fetchFunction: (userId: number) => Promise<T>,
  userId: number
): Resource<T> | null => {
  const [resource, setResource] = useState<Resource<T> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if(!userId) throw "Erreur lors de la récupération de l'identifiant de l'utilisateur";
      try {
        const dataPromise = fetchFunction(userId);
        setResource({
          read: () => dataPromise,
        });
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [fetchFunction, userId]);

  return resource;
};
