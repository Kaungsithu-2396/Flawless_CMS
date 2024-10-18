"use client";
import UploadProduct from "@/components/UploadProduct";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function page() {
    const router = useRouter();
    const token: string | null = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, []);

    return (
        <>
            <UploadProduct token={token} />
        </>
    );
}
