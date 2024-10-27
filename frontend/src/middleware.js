import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import { db } from "./utils/firebase";

export async function middleware(req) {
    const token = req.cookies.get("token");
    const userDoc = req.cookies.get("role");
    const userData = userDoc ? userDoc.value : null;
    const { pathname } = req.nextUrl;

    if (!token && (pathname.startsWith("/login") || pathname.startsWith("/registration"))) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && userData) {
        if (userData === "mentee" && pathname.startsWith("/mentee")) {
            return NextResponse.next();
        } else if (userData === "mentor" && pathname.startsWith("/mentor")) {
            return NextResponse.next();
        }
    } else {
        const protectedRoutes = ["/mentor", "/mentee"];
        if (protectedRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/mentor/:path*", "/mentee/:path*"],
};
