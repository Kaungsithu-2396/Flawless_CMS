import UploadCategory from "@/components/UploadCategory";
import { cookies } from "next/headers";
export default function page() {
    const cookie = cookies();
    const token = cookie.get("token")?.value;
    return (
        <>
            <UploadCategory token={token} />
        </>
    );
}
