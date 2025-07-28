// hooks/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File, imageName?: string) => {
  const formData = new FormData();
  formData.append("file", file);
   formData.append("upload_preset", "unsigned_upload");
  if (imageName) {
    formData.append("public_id", `customer/${imageName}`);
  }

  const res = await fetch("https://api.cloudinary.com/v1_1/dfe962gp1/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Upload failed");

  return data.secure_url;
};
