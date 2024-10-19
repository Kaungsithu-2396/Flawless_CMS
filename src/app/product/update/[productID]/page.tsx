import UpdateProduct from "@/components/UpdateProduct";
import { getToken } from "@/lib/cookie";
export default async function page({
    params: { productID },
}: {
    params: {
        productID: string;
    };
}) {
    const token = await getToken();
    return (
        <>
            <UpdateProduct productID={productID} token={token} />
        </>
    );
}
