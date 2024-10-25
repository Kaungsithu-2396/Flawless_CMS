"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { redirect } from "next/navigation";
export default function UploadCategory({ token }: { token: string | null }) {
    const [category, setCategory] = useState<string>("");
    const [itemImage, setItemImage] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [prev, setPrev] = useState<any>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (Math.floor(file.size / (1024 * 1024)) >= 6) {
            setErrorMsg("Photo must be under 6 MB");
            return;
        } else {
            setErrorMsg("");
        }
        transformFile(file);
        setItemImage(file);
    };
    const transformFile = (file: any) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPrev(reader.result);
            };
        } else {
            setPrev("");
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!itemImage || !category) {
            setErrorMsg("incomplete data");
            return;
        }
        const formData = new FormData();
        formData.append("image", itemImage);
        formData.append("name", category);
        setLoading(true);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
                formData,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("upload success");
            redirect("/category");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <form className="mx-4 " onSubmit={handleSubmit}>
                <h1 className="font-bold my-4">Upload Category</h1>
                <h1 className="text-red-500">{errorMsg && errorMsg}</h1>
                <Input
                    placeholder="Enter category"
                    className="  md:w-[50%] py-6"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                    type="file"
                    className=" md:w-[50%]  mt-6"
                    onChange={handleChange}
                />
                <p className=" my-3 text-neutral-400">
                    file must be under 6 MB
                </p>
                <span>
                    {prev && (
                        <Image
                            src={prev}
                            width={200}
                            height={200}
                            alt="product image"
                            className="rounded-md"
                        />
                    )}
                </span>

                <Button type="submit" className="my-4">
                    {loading ? "Loading..." : "upload"}
                </Button>
            </form>
        </>
    );
}
