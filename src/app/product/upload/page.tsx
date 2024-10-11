import { cookies } from "next/headers";
import UploadProduct from "@/components/UploadProduct";
export default function page() {
    const cookie = cookies();
    const tokenItem = cookie.get("token");
    const token: string | undefined = tokenItem?.value;
    return (
        <>
            <UploadProduct token={token} />
        </>
    );
}
