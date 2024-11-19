"use client";
import { useAuth } from "@/context/context";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Navbar() {
  const role = Cookies.get("role");
  const { token } = useAuth();

  return (
    <div className="navbar bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              {role === "mentor" ? (
                <Link href={"/mentor/dashboard"}>Dashboard</Link>
              ) : role === "mentee" ? (
                <Link href={"/mentee/dashboard"}>Dashboard</Link>
              ) : null}
            </li>
            <li>
              {role === "mentor" ? (
                <Link href={"/mentor/marketplace"}>Marketplace</Link>
              ) : role === "mentee" ? (
                <Link href={"/mentee/marketplace"}>Marketplace</Link>
              ) : null}
            </li>
          </ul>
        </div>
        <Link href={"/"} className="text-xl font-bold btn btn-ghost">
          Skill Path
        </Link>
      </div>

      
      <div className="hidden navbar-center lg:flex">
        <ul className="space-x-4 menu menu-horizontal">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {role === "mentor" ? (
            <li>
              <Link href={"/mentor/dashboard"}>Dashboard</Link>
            </li>
          ) : role === "mentee" ? (
            <li>
              <Link href={"/mentee/dashboard"}>Dashboard</Link>
            </li>
          ) : null}
          {role === "mentor" ? (
            <li>
              <Link href={"/mentor/marketplace"}>Marketplace</Link>
            </li>
          ) : role === "mentee" ? (
            <li>
              <Link href={"/mentee/marketplace"}>Marketplace</Link>
            </li>
          ) : null}
          <li>
            <Link href={"/chat"}>Chat</Link>
          </li>
        </ul>
      </div>

     
      <div className="space-x-4 navbar-end">
        {token ? (
          <>
            <Link href={"/logout"} className="btn btn-outline btn-error">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href={"/login"} className="btn btn-primary">
              Login
            </Link>
            <Link href={"/registration"} className="btn btn-secondary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
