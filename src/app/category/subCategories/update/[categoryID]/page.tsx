"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { baseURL } from "../../../../../../baseURL";
import axios from "axios";
export default function page({
    params: { categoryID },
}: {
    params: {
        categoryID: number;
    };
}) {
    const [subCategory, setSubCategory] = useState("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.patch(`${baseURL}/api/subCategory/${categoryID}`, {
                name: subCategory,
            });
            alert("update success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className=" mx-4 my-6 text-xl">Update Sub Category</h1>
            <form className="mx-4 " onSubmit={handleSubmit}>
                <h1 className="font-bold my-4">Update Sub-Category</h1>
                <Input
                    placeholder="Enter sub-category"
                    className=" w-[50%] py-6"
                    onChange={(e) => setSubCategory(e.target.value)}
                />
                <Button className="my-4">Update</Button>
            </form>
        </>
    );
}
