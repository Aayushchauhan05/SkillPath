"use client";
import Link from "next/link";

export default function Navbar() {
  return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link href={""}>Item 1</Link></li>
        <li>
          <Link href={""}>Parent</Link>
          <ul className="p-2">
            <li><Link href={""}>Submenu 1</Link></li>
            <li><Link href={""}>Submenu 2</Link></li>
          </ul>
        </li>
        <li><Link href={""}>Item 3</Link></li>
      </ul>
    </div>
    <Link href={"/"} className="text-xl btn btn-ghost">Skill Path</Link>
  </div>
  <div className="hidden navbar-center lg:flex">
    <ul className="px-1 menu menu-horizontal">
    <li><Link href={"/login"}> Login</Link></li>
            <li><Link href={"/registration"}>Register</Link></li>
            <li><Link href={"/mentor/dashboard"}>Mentor</Link></li>
            <li><Link href={"/mentee/dashboard"}>mentee</Link></li>
            <li><Link href={"/marketplace"}>marketplace</Link></li>
            <li><Link href={""}>chat</Link></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><Link href={"/login"}> Login</Link></li>
            <li><Link href={"/registration"}>Register</Link></li>
            <li><Link href={"/mentor/dashboard"}>Mentor</Link></li>
            <li><Link href={"/mentee/dashboard"}>mentee</Link></li>
            <li><Link href={"/mentee/marketplace"}>marketplace</Link></li>
            <li><Link href={""}>chat</Link></li>
          </ul>
        </details>
      </li>
      <li><Link href={""}>Item 3</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link href={"/logout"} className="btn">Logout</Link>
  </div>
</div>


  );
}
