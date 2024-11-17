import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import { db } from "./utils/firebase";

export async function middleware(req) {
    const token = req.cookies.get("token");   
    if (!token && (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/registration"))) {
        return NextResponse.next();
    }

    
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        
        
        const userDoc = req.cookies.get("role");

        const userData = userDoc.value;;
        const { pathname } = req.nextUrl;
        // if(token && pathname.startsWith("/") && userData === "mentor"){
        //     return NextResponse.redirect(new URL("/mentor/dashboard", req.url));
        // }
        // if(token && pathname.startsWith("/") && userData === "mentee"){
        //     return NextResponse.redirect(new URL("/mentee/dashboard", req.url));
        // }
        if (userData=== "mentee" && pathname.startsWith("/mentee")) {
          
            return NextResponse.next();
        } 
        
        if (userData === "mentor" && pathname.startsWith("/mentor")) {
           
            return NextResponse.next();
        }

        // If the user role doesn't match the path, redirect them to the home page
        return NextResponse.redirect(new URL("/", req.url));

    } catch (error) {
        console.error("Authentication error:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/mentor/:path*", "/mentee/:path*"],
};