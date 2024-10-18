"use client";
import UpdateSubCategory from "@/components/UpdateSubCategory";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";

export default function page({
    params: { categoryID },
}: {
    params: {
        categoryID: number;
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
            <UpdateSubCategory categoryID={categoryID} token={token} />
        </>
    );
}
