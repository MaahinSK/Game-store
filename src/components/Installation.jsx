import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Installation() {
  const [installed, setInstalled] = useState([]);
  const [sortMode, setSortMode] = useState(""); 

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("installedGames") || "[]");
    setInstalled(items);
  }, []);

  function handleUninstall(appId) {
    const app = installed.find((i) => i.id === appId);
    const next = installed.filter((i) => i.id !== appId);
    setInstalled(next);
    localStorage.setItem("installedGames", JSON.stringify(next));
    toast.info(`Uninstalled ${app?.title}`);
  }

  const sorted = [...installed].sort((a, b) => {
    if (!sortMode) return 0;

    function toNumSize(s) {
      if (!s) return 0;
      if (typeof s === "number") return s;
      return parseFloat(s.toString().replace("GB", "").trim()) || 0;
    }

    if (sortMode === "high-low") return toNumSize(b.size) - toNumSize(a.size);
    if (sortMode === "low-high") return toNumSize(a.size) - toNumSize(b.size);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-5xl font-bold">Installation</h2>
      <p className="text-xl mt-2 text-slate-500">Games you installed</p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <label className="mr-2 text-2xl">Sort by:</label>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="high-low">High-Low (size)</option>
            <option value="low-high">Low-High (size)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {sorted.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded shadow">
            No installed apps
          </div>
        ) : (
          sorted.map((app) => (
            <div key={app.id} className="bg-white rounded shadow p-3 flex flex-col">
              <div className="h-40 bg-gray-200 mb-3 overflow-hidden rounded">
                <img
                  src={app.image ? `/${app.image}` : "/app-placeholder.png"}
                  alt={app.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{app.title}</h4>
                <p className="text-sm text-slate-500">{app.companyName}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-slate-600">
                  <span>⭐ {app.ratingAvg || "N/A"}</span>
                  <span>{app.downloads || "0"} downloads</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleUninstall(app.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Uninstall
                </button>
                <div className="text-sm text-slate-600">{app.size} GB</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}