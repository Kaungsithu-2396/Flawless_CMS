import UploadProduct from "@/components/UploadProduct";
import { getToken } from "@/lib/cookie";
export default async function page() {
    const token = await getToken();
    return (
        <>
            <UploadProduct token={token} />
        </>
    );
}
