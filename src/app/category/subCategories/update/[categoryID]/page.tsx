"use client";
import UpdateSubCategory from "@/components/UpdateSubCategory";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../../context/AuthContext";
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
    const { token } = useAuth();
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, []);
    return (
        <>
            <UpdateSubCategory categoryID={categoryID} token={token && token} />
        </>
    );
}
