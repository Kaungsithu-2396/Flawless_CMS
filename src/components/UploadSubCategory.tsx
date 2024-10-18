"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadSubCategory({
    categoryID,
    token,
}: {
    categoryID: string;
    token: string | null;
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resp = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/subCategory`,

                {
                    name,
                    categoryID,
                },
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            alert("upload success");
        } catch (error: any) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <h1 className="m-5">
                Upload sub category
                <span className="font-bold text-xl"></span>
            </h1>
            {error && <h1 className="  m-5  text-red-400 ">{error}</h1>}
            <form className="mx-4 " onSubmit={handleSubmit}>
                <h1 className="font-bold my-4">Upload Sub-Category</h1>
                <Input
                    placeholder="Enter category"
                    className=" w-[50%] py-6"
                    onChange={(e) => setName(e.target.value)}
                />
                <Button className="my-4">
                    {loading ? "Loading..." : "upload"}
                </Button>
            </form>
        </>
    );
}
