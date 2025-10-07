import React, { useEffect, useState } from "react";
import AppCard from "./AppCard";

export default function Installation() {
  const [installed, setInstalled] = useState([]);
  const [sortMode, setSortMode] = useState(""); // "", "high-low", "low-high"

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("installedApps") || "[]");
    setInstalled(items);
  }, []);

  function handleUninstall(appId) {
    const next = installed.filter((i) => i.id !== appId);
    setInstalled(next);
    localStorage.setItem("installedApps", JSON.stringify(next));
  }

  const sorted = [...installed].sort((a, b) => {
    if (!sortMode) return 0;
    // sort by downloads number - downloads are string like "9M" or "8.5M", convert heuristically
    function toNum(d) {
      if (!d) return 0;
      if (typeof d === "number") return d;
      const s = String(d).toUpperCase();
      if (s.endsWith("M")) return parseFloat(s.replace("M", "")) * 1_000_000;
      if (s.endsWith("K")) return parseFloat(s.replace("K", "")) * 1_000;
      return parseFloat(s) || 0;
    }
    if (sortMode === "high-low") return toNum(b.downloads) - toNum(a.downloads);
    if (sortMode === "low-high") return toNum(a.downloads) - toNum(b.downloads);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold">Installation</h2>
      <p className="text-sm text-slate-500">Games you installed</p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <label className="mr-2">Sort by:</label>
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">None</option>
            <option value="high-low">High-Low (downloads)</option>
            <option value="low-high">Low-High (downloads)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {sorted.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded shadow">No installed apps</div>
        ) : (
          sorted.map((app) => (
            <div key={app.id} className="bg-white rounded shadow p-3 flex flex-col">
              <div className="h-40 bg-gray-200 mb-3 overflow-hidden rounded">
                <img src={app.image ? `/${app.image}` : "/app-placeholder.png"} alt={app.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{app.title}</h4>
                <p className="text-sm text-slate-500">{app.companyName}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => handleUninstall(app.id)} className="px-3 py-1 bg-red-600 text-white rounded">Uninstall</button>
                <div className="text-sm text-slate-600">{app.size}MB</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
