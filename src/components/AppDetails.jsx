import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    fetch("/gamedata.json")
      .then((res) => res.json())
      .then((data) => {
        const foundApp = data.find((item) => item.id === parseInt(id));
        if (foundApp) {
          setAppData(foundApp);
          const installedGames = JSON.parse(localStorage.getItem("installedGames")) || [];
          setInstalled(installedGames.some((g) => g.id === foundApp.id));
        } else {
          navigate("/app-not-found");
        }
      });
  }, [id, navigate]);

  const handleInstall = () => {
    const installedGames = JSON.parse(localStorage.getItem("installedGames")) || [];

    if (installed) {
      // Uninstall
      const updated = installedGames.filter((g) => g.id !== appData.id);
      localStorage.setItem("installedGames", JSON.stringify(updated));
      setInstalled(false);
      toast.info(`Uninstalled ${appData.title}`);
    } else {
      // Install
      installedGames.push(appData);
      localStorage.setItem("installedGames", JSON.stringify(installedGames));
      setInstalled(true);
      toast.success(`Downloaded ${appData.title}`);
    }
  };

  if (!appData) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={appData.image}
          alt={appData.title}
          className="w-40 h-40 rounded-lg object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{appData.title}</h1>
          <p className=" text-blue-600 text-l mt-1">Developed by {appData.companyName}</p>
          <p className="mt-2 text-gray-700 max-w-md">{appData.description}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-gray-700">
            <span>⭐ {appData.ratingAvg} / 5</span>
            <span>📥 {appData.downloads} downloads</span>
            <span>🧍 {appData.reviews} reviews</span>
          </div>

          <button
            onClick={handleInstall}
            className={`mt-6 px-6 py-2 rounded-lg font-semibold text-white transition-all ${
              installed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {installed ? "Installed" : "Install Now"} ({appData.size} GB)
          </button>
        </div>
      </div>

      {/* Ratings Chrt */}
      <div className="mt-10 bg-white p-4 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ratings Breakdown</h2>
        <div className="w-full h-94">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={appData.ratings}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FF8811" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
