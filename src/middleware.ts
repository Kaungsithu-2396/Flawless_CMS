import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
    const token = getCookie("token");
    console.log(token, "token");
    const isOnLoginPage = request.nextUrl.pathname === "/";
    const isOnDashboardPage = request.nextUrl.pathname === "/dashboard";

    if (!token && !isOnLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && isOnLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/category/:path*",
        "/contact/:path*",
        "/dashboard/:path*",
        "/detail/:path*",
        "/product/:path*",
    ],
};
