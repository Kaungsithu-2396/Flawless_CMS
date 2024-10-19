"use client";
import UploadProduct from "@/components/UploadProduct";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
export default function page() {
    const [currentToken, setCurrentToken] = useState<string | null>("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentToken(localStorage.getItem("token"));
        }
    }, [currentToken]);

    return (
        <>
            {!currentToken ? (
                <h1>Loading...</h1>
            ) : (
                <UploadProduct token={currentToken} />
            )}
        </>
    );
}
