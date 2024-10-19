"use client";
import { useState, useEffect } from "react";
import UpdateProduct from "@/components/UpdateProduct";
import { useAuth } from "../../../../../context/AuthContext";
export default function page({
    params: { productID },
}: {
    params: {
        productID: string;
    };
}) {
    const [currentToken, setCurrentToken] = useState<string | null>("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentToken(localStorage.getItem("token"));
        }
    }, [currentToken]);
    // const cookie = cookies();
    // const token: string | undefined = cookie.get("token")?.value;
    return (
        <>
            {!currentToken ? (
                <h1>Loading...</h1>
            ) : (
                <UpdateProduct productID={productID} token={currentToken} />
            )}
        </>
    );
}
