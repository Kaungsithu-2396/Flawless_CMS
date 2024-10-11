import HomePage from "@/components/HomePage";
import { cookies } from "next/headers";
export default function page() {
    const cookie = cookies();
    const token: string | undefined = cookie.get("token")?.value;
    return (
        <>
            <HomePage token={token} />
        </>
    );
}
