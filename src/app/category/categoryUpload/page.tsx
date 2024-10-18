"use client";
import UploadCategory from "@/components/UploadCategory";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";
export default function page() {
    const router = useRouter();
    const token = localStorage.getItem("token");
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
