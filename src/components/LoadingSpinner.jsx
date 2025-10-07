import React from "react";

export default function LoadingSpinner({ size = 6, text = "Loading...Dhorjo Dhoren" }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent w-${size} h-${size}`}
        style={{ width: `${size * 8}px`, height: `${size * 8}px` }}
      />
      <span className="text-3xl text-bold text-slate-600">{text}</span>
    </div>
  );
}
