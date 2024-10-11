import { cookies } from "next/headers";
import UpdateProduct from "@/components/UpdateProduct";
import ProductImage from "@/components/ProductImage";

export default function page({
    params: { productID },
}: {
    params: {
        productID: string;
    };
}) {
    const cookie = cookies();
    const token: string | undefined = cookie.get("token")?.value;
    return (
        <>
            <UpdateProduct productID={productID} token={token} />
        </>
    );
}
