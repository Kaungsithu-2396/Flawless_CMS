import React from "react";
import { cookies } from "next/headers";

export default function useGetCookies(tokenName: string) {
    const cookieStore = cookies();
    const token = cookieStore.get(tokenName);
    return token;
}
