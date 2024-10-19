import UpdateSubCategory from "@/components/UpdateSubCategory";
import { getToken } from "@/lib/cookie";

export default async function page({
    params: { categoryID },
}: {
    params: {
        categoryID: number;
    };
}) {
    // const cookie = cookies();
    // const token = cookie.get("token")?.value;
    const token = await getToken();

    return (
        <>
            <UpdateSubCategory categoryID={categoryID} token={token} />
        </>
    );
}
