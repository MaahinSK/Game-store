import React, { useEffect, useState, useMemo } from "react";
import LoadingSpinner from "./LoadingSpinner";
import AppCard from "./AppCard";

export default function AppsPage() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/gamedata.json")
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (query.trim() === "") { setSearching(false); return; }
    setSearching(true);
    const id = setTimeout(() => setSearching(false), 350);
    return () => clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((d) => d.title.toLowerCase().includes(q));
  }, [data, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center">Our All Applications</h2>
      <p className="text-center text-slate-500 mt-1">Explore All Games on the Market developed by us. We code for Millions</p>

      <div className="flex justify-between items-center mt-6">
        <div>({data.length}) Apps Found</div>
        <div className="w-64">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search Apps"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      ) : (
        <>
          {searching && <div className="flex justify-center py-4"><LoadingSpinner text="Searching..." /></div>}

          {filtered.length === 0 ? (
            <div className="text-center py-12">
                
              <p className="text-2xl">No Game found</p>
              <a href="/apps" className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded">Go to All Apps</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {filtered.map((app) => <AppCard key={app.id} app={app} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
