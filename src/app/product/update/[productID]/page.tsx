"use client";

import UpdateProduct from "@/components/UpdateProduct";
export default function page({
    params: { productID },
}: {
    params: {
        productID: string;
    };
}) {
    const token = localStorage.getItem("token");
    // const cookie = cookies();
    // const token: string | undefined = cookie.get("token")?.value;
    return (
        <>
            <UpdateProduct productID={productID} token={token} />
        </>
    );
}
