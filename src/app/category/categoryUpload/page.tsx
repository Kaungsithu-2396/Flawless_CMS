"use client";
import UploadCategory from "@/components/UploadCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";
export default function page() {
    const [token, setToken] = useState<string | null>("");
    const router = useRouter();
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    });
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, []);
    return (
        <>
            <UploadCategory token={token} />
        </>
    );
}
