"use client";
interface subCategoryType {
    _id: string;
    name: string;
    mainCategory: string;
}
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";

export default function UpdateSubCategory({
    categoryID,
    token,
}: {
    categoryID: number;
    token: string | null;
}) {
    const [subCategory, setSubCategory] = useState("");
    const [prevData, setPrevData] = useState<subCategoryType>();
    async function getSubCategoryById() {
        try {
            const resp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/subCategory/find/${categoryID}`,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );

            setPrevData(resp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSubCategoryById();
    }, []);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const resp = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/subCategory/${categoryID}`,
                {
                    name: subCategory,
                },
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            console.log(resp);
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
                    placeholder={prevData && prevData.name}
                    className=" w-[50%] py-6"
                    onChange={(e) => setSubCategory(e.target.value)}
                />
                <Button className="my-4" disabled={subCategory === ""}>
                    Update
                </Button>
            </form>
        </>
    );
}
