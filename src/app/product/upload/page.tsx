"use client";
import UploadProduct from "@/components/UploadProduct";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
export default function page() {
    //@ts-ignore
    const { token } = useAuth();
    console.log(token);
    const router = useRouter();

    return (
        <>
            <UploadProduct token={token && token} />
        </>
    );
}
