import UpdateSubCategory from "@/components/UpdateSubCategory";
import { cookies } from "next/headers";

export default function page({
    params: { categoryID },
}: {
    params: {
        categoryID: number;
    };
}) {
    const cookie = cookies();
    const token = cookie.get("token")?.value;
    return (
        <>
            <UpdateSubCategory categoryID={categoryID} token={token} />
        </>
    );
}
