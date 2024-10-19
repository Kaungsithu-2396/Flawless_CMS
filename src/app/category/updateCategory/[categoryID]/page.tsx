import UpdateCategory from "@/components/UpdateCategory";
import { getToken } from "@/lib/cookie";
type props = {
    params: {
        categoryID: string;
    };
};
export default async function page({ params: { categoryID } }: props) {
    const token = await getToken();
    return (
        <>
            <UpdateCategory categoryID={categoryID} token={token} />
        </>
    );
}
