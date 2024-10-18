"use client";

import UpdateProduct from "@/components/UpdateProduct";
import { useAuth } from "../../../../../context/AuthContext";
export default function page({
    params: { productID },
}: {
    params: {
        productID: string;
    };
}) {
    const { token } = useAuth();
    // const cookie = cookies();
    // const token: string | undefined = cookie.get("token")?.value;
    return (
        <>
            <UpdateProduct productID={productID} token={token && token} />
        </>
    );
}
