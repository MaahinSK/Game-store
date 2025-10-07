import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/gamedata.json")
      .then((r) => r.json())
      .then((json) => {
        const found = json.find((x) => String(x.id) === String(id));
        if (!found) {
          // navigate to app not found page (keep user inside app)
          navigate("/app-not-found", { replace: true });
          return;
        }
        setApp(found);

        // check installed
        const installedList = JSON.parse(localStorage.getItem("installedApps") || "[]");
        setInstalled(installedList.some((i) => i.id === found.id));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  function handleInstall() {
    const installedList = JSON.parse(localStorage.getItem("installedApps") || "[]");
    if (!installed) {
      installedList.push(app);
      localStorage.setItem("installedApps", JSON.stringify(installedList));
      setInstalled(true);
      toast.success(`downloaded ${app.title}`);
    } else {
      // do nothing, or optionally uninstall here
    }
  }

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (!app) return null;

  // prepare ratings data for chart
  const chartData = app.ratings.map((r) => ({ name: r.name, value: r.count }));
  const COLORS = ["#f43f5e", "#fb923c", "#facc15", "#60a5fa", "#7c3aed"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex gap-8">
        <div className="w-1/3">
          <img src={app.image ? `/${app.image}` : "/app-placeholder.png"} alt={app.title} className="rounded shadow" />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold">{app.title}</h2>
          <p className="text-sm text-slate-500">Developed by {app.companyName}</p>

          <div className="mt-4 flex gap-3 items-center">
            <div className="text-lg font-semibold">{app.ratingAvg} ★</div>
            <div className="text-sm text-slate-600">{app.reviews} reviews</div>
            <div className="text-sm text-slate-600">• {app.downloads} downloads</div>
          </div>

          <p className="mt-4 text-slate-700">{app.description}</p>

          <div className="mt-6 flex gap-4 items-center">
            <button
              onClick={handleInstall}
              className={`px-4 py-2 rounded font-semibold ${installed ? "bg-green-600 text-white" : "bg-purple-600 text-white"}`}
            >
              {installed ? "Installed" : `Install Now • ${app.size}MB`}
            </button>

            <button onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Back</button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded shadow p-6">
        <h3 className="font-semibold">Ratings breakdown</h3>
        <div style={{ height: 220 }} className="mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
