"use client";

import { useState } from "react";
import { serverFetch } from "./serverApi";

const promiseCache = new Map<string, Promise<any>>();

function fetchData<T>(key: string, fetcher: () => Promise<T>): T {
  if (promiseCache.has(key)) {
    throw promiseCache.get(key);
  }

  const promise = fetcher()
    .then((data) => {
      promiseCache.delete(key);
      return data;
    })
    .catch((error) => {
      promiseCache.delete(key);
      throw error;
    });

  promiseCache.set(key, promise);
  throw promise;
}

export function useQuery<T>(key: string, fetcher: () => Promise<T>): T {
  return fetchData(key, fetcher);
}

export function useMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async <T>(
    url: string,
    options: RequestInit
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await serverFetch<T>(url, options);
      return data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, mutate };
}
