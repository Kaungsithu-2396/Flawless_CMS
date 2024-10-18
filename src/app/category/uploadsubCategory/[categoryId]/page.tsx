"use client";
import UploadSubCategory from "@/components/UploadSubCategory";
import { useEffect } from "react";
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
    const router = useRouter();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, []);
    return (
        <>
            <UploadSubCategory categoryID={categoryId} token={token} />
        </>
    );
}
