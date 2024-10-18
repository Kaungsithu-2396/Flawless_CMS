"use client";
import UpdateCategory from "@/components/UpdateCategory";

import { useAuth } from "../../../../../context/AuthContext";
type props = {
    params: {
        categoryID: string;
    };
};
export default function page({ params: { categoryID } }: props) {
    const { token } = useAuth();
    return (
        <>
            <UpdateCategory categoryID={categoryID} token={token && token} />
        </>
    );
}
