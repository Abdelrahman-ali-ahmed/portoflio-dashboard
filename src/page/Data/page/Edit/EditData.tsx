// src/pages/EditData.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

const fixedCategories = [
  "Counter",
  "Chairs",
  "Complete Sets",
  "Manager's Desk",
  "Employee Desk",
  "Meeting Table",
  "Catering Table",
  "Workstation",
  "Storage Unit",
];

export default function EditData() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.dark.value);

  const [form, setForm] = useState({
    title: { eng: "", ar: "" },
    content: { eng: "", ar: "" },
    category: "",
    imageUrl: "",
    publicId: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "data", id!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          title: data.title,
          content: data.content || { eng: "", ar: "" },
          category: data.category,
          imageUrl: data.imageUrl,
          publicId: data.publicId,
        });
      }
    };
    fetchData();
  }, [id]);

  const deleteOldImageFromCloudinary = async (publicId: string) => {
    const cloudName = "dfe962gp1";
    const apiKey = "764583652425529";
    const apiSecret = "ruw8RfhA6XdpPKgb3-NiW5hYLvU";
    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

    const generateSHA1 = async (message: string) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hash = await crypto.subtle.digest("SHA-1", data);
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    const signature = await generateSHA1(stringToSign);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: formData,
    });
  };

  const uploadToCloudinary = async (): Promise<{ url: string; public_id: string }> => {
    if (!image) throw new Error("No image selected");

    const formData = new FormData();
    formData.append("file", image);

    const folderPath = `data/${form.category}`;
    const publicId = form.title.eng.trim().replace(/\s+/g, "_");

    formData.append("upload_preset", "unsigned_upload");
    formData.append("folder", folderPath);
    formData.append("public_id", publicId);

    const res = await fetch("https://api.cloudinary.com/v1_1/dfe962gp1/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return {
      url: data.secure_url,
      public_id: data.public_id,
    };
  };

  const inputClass = `border p-2 rounded-md w-full ${
    isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
  }`;

  const handleUpdate = async () => {
    if (!form.title.eng || !form.category) return alert("Please fill all required fields.");

    setLoading(true);
    try {
      const updateData: any = {
        title: form.title,
        content: form.content,
        category: form.category,
        updatedAt: serverTimestamp(),
      };

      if (image) {
        // delete old image from Cloudinary
        if (form.publicId) {
          await deleteOldImageFromCloudinary(form.publicId);
        }

        const uploadRes = await uploadToCloudinary();
        updateData.imageUrl = uploadRes.url;
        updateData.publicId = uploadRes.public_id;
      }

      await updateDoc(doc(db, "data", id!), updateData);
      alert("Data updated successfully");
      navigate(-1);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 duration-300 ${
        isDark ? "bg-[#0f172a] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="bg-white dark:bg-[#1f2937] shadow-md rounded-xl p-4 w-full max-w-3xl mx-auto mb-6 space-y-4 border dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={form.title.eng}
            onChange={(e) =>
              setForm({ ...form, title: { ...form.title, eng: e.target.value } })
            }
            placeholder="Title (English)"
            className={inputClass}
          />
          <input
            type="text"
            value={form.title.ar}
            onChange={(e) =>
              setForm({ ...form, title: { ...form.title, ar: e.target.value } })
            }
            placeholder="Title (Arabic)"
            className={inputClass}
          />

          <textarea
            value={form.content.eng}
            onChange={(e) =>
              setForm({ ...form, content: { ...form.content, eng: e.target.value } })
            }
            placeholder="Content (English)"
            className={`${inputClass} col-span-2 h-24 resize-none`}
          />
          <textarea
            value={form.content.ar}
            onChange={(e) =>
              setForm({ ...form, content: { ...form.content, ar: e.target.value } })
            }
            placeholder="Content (Arabic)"
            className={`${inputClass} col-span-2 h-24 resize-none`}
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          >
            <option value="" disabled>
              Select Category
            </option>
            {fixedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="col-span-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Current"
              className="col-span-2 w-32 h-32 object-cover rounded shadow mx-auto"
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
