import UpdateCategory from "@/components/UpdateCategory";
import { cookies } from "next/headers";
type props = {
    params: {
        categoryID: string;
    };
};
export default function page({ params: { categoryID } }: props) {
    const cookie = cookies();
    const token = cookie.get("token")?.value;
    return (
        <>
            <UpdateCategory categoryID={categoryID} token={token} />
        </>
    );
}
