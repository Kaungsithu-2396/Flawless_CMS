import UploadSubCategory from "@/components/UploadSubCategory";
import { getToken } from "@/lib/cookie";

export default async function page({
    params: { categoryId },
}: {
    params: {
        categoryId: string;
    };
}) {
    const token = await getToken();

    return (
        <>
            <UploadSubCategory categoryID={categoryId} token={token} />
        </>
    );
}
