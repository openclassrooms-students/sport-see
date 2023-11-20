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
      try {
        const dataPromise = fetchFunction(userId);
        setResource({
          read: () => dataPromise,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [fetchFunction, userId]);

  return resource;
};
