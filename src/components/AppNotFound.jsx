import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppNotFound() {
  const nav = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <img src="/App-Error.png" alt="app not found" className="mx-auto w-114" />
      <h2 className="text-3xl font-bold mt-6">App not found</h2>
      <p className="text-slate-600 mt-2 text-xl">The app you tried to access was not found.</p>
      <div className="mt-6">
        <button onClick={() => nav("/apps")} className="px-4 py-2 bg-purple-600 text-white rounded">
          Go Back
        </button>
      </div>
    </div>
  );
}
