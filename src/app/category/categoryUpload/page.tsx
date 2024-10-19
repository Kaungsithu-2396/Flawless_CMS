import UploadCategory from "@/components/UploadCategory";
import { getToken } from "@/lib/cookie";
export default async function page() {
    const token = await getToken();
    return (
        <>
            <UploadCategory token={token} />
        </>
    );
}
