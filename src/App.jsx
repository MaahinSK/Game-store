import React from "react";
import { ToastContainer } from "react-toastify";
import RoutesFile from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <RoutesFile />
      </main>

      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
