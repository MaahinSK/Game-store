import React from "react";
import AppCard from "./AppCard";

export default function TrendingGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {items.map((it) => (
        <AppCard key={it.id} app={it} />
      ))}
    </div>
  );
}