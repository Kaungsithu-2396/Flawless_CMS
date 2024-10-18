"use client";
import UploadCategory from "@/components/UploadCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
// import { cookies } from "next/headers";
export default function page() {
    const { token } = useAuth();
    const router = useRouter();

    return (
        <>
            <UploadCategory token={token && token} />
        </>
    );
}
