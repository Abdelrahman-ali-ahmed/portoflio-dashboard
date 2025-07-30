// src/pages/Data.tsx
import { Link } from "react-router-dom";
import { useData } from "./hooks/useData";

export default function Data() {
  const { dataItems, deleteData, loading } = useData();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Data Items</h1>
        <Link to="/data/add" className="bg-green-500 text-white px-4 py-2 rounded">
          Add New
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title (EN)</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataItems.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.title.eng}</td>
              <td className="p-2 border">{item.category}</td>
              <td className="p-2 border">
                <img src={item.imageUrl} alt="img" className="w-16 h-16 object-cover" />
              </td>
              <td className="p-2 border space-x-2">
                <Link to={`/data/edit/${item.id}`} className="text-blue-600">Edit</Link>
                <button
                  onClick={() => deleteData(item.id)}
                  className="text-red-600"
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
