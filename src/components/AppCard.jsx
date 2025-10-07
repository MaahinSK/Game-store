import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function AppCard({ app }) {
  return (
    <div className="bg-white rounded shadow p-3 hover:shadow-lg transition">
      <Link to={`/apps/${app.id}`}>
        <div className="h-80 bg-gray-200 rounded mb-3 overflow-hidden flex items-center justify-center">
          <img src={app.image ? `/${app.image}` : "/app-placeholder.png"} alt={app.title} className="object-cover h-full w-full" />
        </div>
        <h4 className="font-semibold text-slate-800 text-m">{app.title}</h4>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-s bg-green-50 text-green-600 px-2 py-1 rounded">⬇ {app.downloads}</span>
          <span className="text-s bg-orange-50 text-orange-600 px-2 py-1 rounded flex "><FaStar className="mt-1 mr-1"/> {app.ratingAvg}</span>
        </div>
      </Link>
    </div>
  );
}
