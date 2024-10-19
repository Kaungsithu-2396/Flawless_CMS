"use client";
import UploadCategory from "@/components/UploadCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
// import { cookies } from "next/headers";
export default function page() {
    const [currentToken, setCurrentToken] = useState<string | null>("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentToken(localStorage.getItem("token"));
        }
    }, [currentToken]);
    const router = useRouter();

    return (
        <>
            {!currentToken ? (
                <h1>Loading..</h1>
            ) : (
                <UploadCategory token={currentToken} />
            )}
        </>
    );
}
