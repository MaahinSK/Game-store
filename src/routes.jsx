import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/HomeHero";
import AppsPage from "./components/AppsPage";
import AppDetails from "./components/AppDetails";
import Installation from "./components/Installation";
import NotFound from "./components/NotFound";
import AppNotFound from "./components/AppNotFound";

export default function RoutesFile() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apps" element={<AppsPage />} />
      <Route path="/apps/:id" element={<AppDetails />} />
      <Route path="/installation" element={<Installation />} />

      <Route path="/app-not-found" element={<AppNotFound />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}