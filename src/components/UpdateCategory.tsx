"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

import Image from "next/image";
export default function UpdateCategory({
    categoryID,
    token,
}: {
    categoryID: string;
    token: string | undefined;
}) {
    const [data, setData] = useState<any>({});
    const [itemImage, setItemImage] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(false);
    async function getImageURL() {
        try {
            const resp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${categoryID}`,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            setData(resp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getImageURL();
    }, []);
    const { name, categoryImage } = data;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        transformFile(file);
    };
    const transformFile = (file: any) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setItemImage(reader.result);
            };
        } else {
            setItemImage("");
        }
    };
    const [category, setCategory] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${categoryID}`,
                {
                    name: category,
                    image: itemImage || "",
                    publicID: categoryImage.publicId,
                },
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            alert("category update success");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form className="mx-4 " onSubmit={handleSubmit}>
                <h1 className="font-bold my-4">Update Category</h1>
                <Input
                    placeholder={name}
                    className=" xl:w-[50%] py-6"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                    type="file"
                    className=" xl:w-[50%] my-5"
                    onChange={handleChange}
                />
                {!itemImage ? (
                    <Image
                        src={categoryImage?.url}
                        width={300}
                        height={300}
                        alt="product image"
                    />
                ) : (
                    <Image
                        src={itemImage}
                        width={300}
                        height={300}
                        alt="product image"
                    />
                )}

                <Button className="my-4">
                    {loading ? "loading..." : "update"}
                </Button>
            </form>
        </div>
    );
}
