import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <img src="/public/error-404.png" alt="not found" className="mx-auto w-115" />
      <h2 className="text-3xl font-bold mt-6">Page not found</h2>
      <p className="text-slate-600 mt-2 text-xl">The page you are looking for does not exist.</p>
      <div className="mt-6">
        <button onClick={() => nav("/")} className="px-4 py-2 bg-purple-600 text-white rounded">
          Go Back
        </button>
      </div>
    </div>
  );
}
