import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
          <NavLink to="/" className="font-bold text-lg text-slate-700">
            HERO.IO
          </NavLink>
        </div>

        <nav className="flex gap-6 items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-purple-600 font-semibold" : "text-slate-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/apps"
            className={({ isActive }) =>
              isActive ? "text-purple-600 font-semibold" : "text-slate-600"
            }
          >
            Apps
          </NavLink>

          <NavLink
            to="/installation"
            className={({ isActive }) =>
              isActive ? "text-purple-600 font-semibold" : "text-slate-600"
            }
          >
            Installation
          </NavLink>
        </nav>

        <div>
          <a
            href="https://github.com/MaahinSK"
            className="px-4 py-2  rounded-md bg-gradient-to-r from-purple-500 to-violet-400 text-white font-semibold shadow flex"
          ><FaGithubSquare className="size-6 mr-2"/>
            Contribute
          </a>
        </div>
      </div>
    </header>
  );
}
