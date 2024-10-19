"use client";
import UploadSubCategory from "@/components/UploadSubCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";
export default function page({
    params: { categoryId },
}: {
    params: {
        categoryId: string;
    };
}) {
    // const cookie = cookies();
    // const token = cookie.get("token")?.value;
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
                <UploadSubCategory
                    categoryID={categoryId}
                    token={currentToken}
                />
            )}
        </>
    );
}
