import UploadSubCategory from "@/components/UploadSubCategory";
import { cookies } from "next/headers";
export default function page({
    params: { categoryId },
}: {
    params: {
        categoryId: string;
    };
}) {
    const cookie = cookies();
    const token = cookie.get("token")?.value;
    return (
        <>
            <UploadSubCategory categoryID={categoryId} token={token} />
        </>
    );
}
