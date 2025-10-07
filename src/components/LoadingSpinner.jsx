import React from "react";

export default function LoadingSpinner({ size = 6, text = "Loading..." }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent w-${size} h-${size}`}
        style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      />
      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}
