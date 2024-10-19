"use client";
import UpdateCategory from "@/components/UpdateCategory";

import { useAuth } from "../../../../../context/AuthContext";
type props = {
    params: {
        categoryID: string;
    };
};
export default function page({ params: { categoryID } }: props) {
    const { token, loading } = useAuth();
    return (
        <>
            {loading ? (
                <h1>loading...</h1>
            ) : (
                <UpdateCategory categoryID={categoryID} token={token} />
            )}
        </>
    );
}
