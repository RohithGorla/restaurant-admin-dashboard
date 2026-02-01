import { useEffect, useState } from "react";
import api from "../api/axios";
import useDebounce from "../hooks/useDebounce";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const url = debouncedSearch
      ? `/menu/search?q=${debouncedSearch}`
      : "/menu";

    api.get(url).then(res => setMenu(res.data));
  }, [debouncedSearch]);

  const toggleAvailability = async (id) => {
    setMenu(menu =>
      menu.map(item =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
    await api.patch(`/menu/${id}/availability`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">📋 Menu Management</h2>

      <input
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
        placeholder="Search menu..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="space-y-3">
        {menu.map(item => (
          <div
            key={item._id}
            className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} • {item.category}
              </p>
            </div>

            <button
              onClick={() => toggleAvailability(item._id)}
              className={`px-3 py-1 rounded text-sm text-white transition ${
                item.isAvailable
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
