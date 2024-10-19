"use server";
import { cookies } from "next/headers";
export async function setToken(token: string) {
    const expires = new Date(Date.now() + 9000 * 1000);
    cookies().set("token", token, { httpOnly: true, path: "/" });
}
export async function getToken() {
    const session = cookies().get("token")?.value;
    if (!session) {
        return null;
    }
    return session;
}
