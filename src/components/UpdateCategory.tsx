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
    token: string | null;
}) {
    const [data, setData] = useState<any>({});
    const [prevImage, setPrevImage] = useState<any>("");
    const [itemImage, setItemImage] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
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
        if (!file) return;
        if (Math.floor(file.size / (1024 * 1024)) >= 6) {
            setError("Photo must be under 6 MB");
            return;
        } else {
            setError("");
        }
        transformFile(file);
        setItemImage(file);
    };
    const transformFile = (file: any) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPrevImage(reader.result);
            };
        } else {
            setPrevImage("");
        }
    };
    const [category, setCategory] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", category);
        formData.append("image", itemImage);
        formData.append("publicID", categoryImage.public_id);
        setLoading(true);
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${categoryID}`,
                formData,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
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
            <p className="text-red-400">{error}</p>
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
                        src={prevImage}
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
