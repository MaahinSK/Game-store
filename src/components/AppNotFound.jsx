import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppNotFound() {
  const nav = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <img src="/error-app.png" alt="app not found" className="mx-auto w-64" />
      <h2 className="text-2xl font-bold mt-6">App not found</h2>
      <p className="text-slate-600 mt-2">The app you tried to access was not found.</p>
      <div className="mt-6">
        <button onClick={() => nav("/apps")} className="px-4 py-2 bg-purple-600 text-white rounded">
          Go Back
        </button>
      </div>
    </div>
  );
}
