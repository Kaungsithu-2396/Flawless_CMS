import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export function middleware(request: NextRequest) {
    const token = cookies().get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && request.nextUrl.pathname === "/") {
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
