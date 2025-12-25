import { serverFetch } from "@/src/lib/serverApi";

// Image upload(avatar)
export const uploadAvatar = async (
  data: File
): Promise<{ url: string } | null> => {
  const formData = new FormData();
  formData.append("file", data);
  return serverFetch<{ url: string }>(`/upload/avatars`, {
    method: "POST",
    body: formData,
  });
};
