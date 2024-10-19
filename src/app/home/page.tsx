import HomePage from "@/components/HomePage";
import { getToken } from "../utils/cookie";
export default async function page() {
    const token = await getToken();
    return (
        <>
            <HomePage token={token?.value} />
        </>
    );
}
