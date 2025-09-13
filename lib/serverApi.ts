export async function serverFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T | null> {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    ...options?.headers
  }
  try {
    console.log(headers)
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
      ...options,
      headers,
      credentials: 'include',
      cache: "no-cache",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data from ${url}: ${response.status} - ${errorText}`
      );
    }

    if (response.status === 204) {
      return null;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`An error occurred while fetching ${url}:`, error);
    throw error;
  }
}
