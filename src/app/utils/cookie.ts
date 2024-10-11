"use server";
import { cookies } from "next/headers";
export async function getToken() {
    const session = cookies().get("token");
    if (!session) return null;
    return session;
}
