import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import TrendingGrid from "./TrendingGrid";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/gamedata.json")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-4 py-12">
      
      <section className="text-center py-10">
        <h1 className="text-5xl md:text-5xl font-extrabold text-slate-800">
          We Build <br /> <span className="text-purple-600">Productive</span> Apps
        </h1>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
          At HERO.IO, we craft innovative apps designed to make everyday life
          simpler, smarter, and more exciting.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <a
            className="px-4 py-2 bg-white border rounded shadow inline-flex items-center gap-2"
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaGooglePlay />
            <h3>Google Play</h3>
          </a>

          <a
            className="px-4 py-2 bg-white border rounded shadow inline-flex items-center gap-2"
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noreferrer"
          >
            <FaAppStoreIos />
            <h3>App Store</h3>
          </a>
        </div>

        <div className="mt-15 ">
          <img src="/hero.png" alt="hero" className="mx-auto w-172" />
        </div>
      </section>

      {/* Trusted baner */}
      <section className="mt-0 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-cyan-300 text-white py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold">Trusted By Millions, Built For You</h2>
          <div className="flex items-center justify-around mt-6 text-white">
            <div>
              <div className="text-3xl font-bold">39.6M</div>
              <div className="text-sm">Total Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold">656K</div>
              <div className="text-sm">Total Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold">152+</div>
              <div className="text-sm">Active Apps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending section */}
      <section className="mt-10">
        <h3 className="text-4xl font-semibold text-center">Trending Apps</h3>
        <p className="text-l text-center text-slate-500">Explore All Trending Apps on the Market developed by Passionate Creators</p>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <TrendingGrid items={data.slice(0, 8)} />
        )}

        <div className="flex justify-center mt-6">
          <a href="/apps" className="px-8 py-4 bg-purple-600 text-white rounded">
            Show All
          </a>
        </div>
      </section>
    </div>
  );
}