"use client";
import { useAuth } from "@/context/context";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { token,removeCode,removeToken } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = Cookies.get("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    Cookies.remove("role");
    removeToken()
    setRole(null);
    removeCode();
    router.push("/login");
  };

  return (
    <div className="navbar">
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
            {token && role && (
              <>
                <li>
                  {role === "mentor" ? (
                    <Link href={"/mentor/dashboard"}>Dashboard</Link>
                  ) : (
                    <Link href={"/mentee/dashboard"}>Dashboard</Link>
                  )}
                </li>
                <li>
                  {role === "mentor" ? (
                    <Link href={"/mentor/marketplace"}>Marketplace</Link>
                  ) : (
                    <Link href={"/mentee/marketplace"}>Marketplace</Link>
                  )}
                </li>
              </>
            )}
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
          {token && role && (
            <>
              {role === "mentor" ? (
                <li>
                  <Link href={"/mentor/dashboard"}>Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link href={"/mentee/dashboard"}>Dashboard</Link>
                </li>
              )}
              {role === "mentor" ? (
                <li>
                  <Link href={"/mentor/marketplace"}>Marketplace</Link>
                </li>
              ) : (
                <li>
                  <Link href={"/mentee/marketplace"}>Marketplace</Link>
                </li>
              )}
            </>
          )}
          <li>
            <Link href={"/chat"}>Chat</Link>
          </li>
        </ul>
      </div>

      <div className="space-x-4 navbar-end">
        {token ? (
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
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
