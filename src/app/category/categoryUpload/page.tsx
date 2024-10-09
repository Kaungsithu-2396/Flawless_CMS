"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { RiH1 } from "react-icons/ri";
import { baseURL } from "../../../../baseURL";
import { redirect } from "next/navigation";
export default function page() {
    const [category, setCategory] = useState<string>();
    const [itemImage, setItemImage] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/api/category`, {
                name: category,
                categoryImage: itemImage,
            });
            alert("upload success");
            redirect("/category");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <form className="mx-4 " onSubmit={handleSubmit}>
                <h1 className="font-bold my-4">Upload Category</h1>
                <Input
                    placeholder="Enter category"
                    className="  md:w-[50%] py-6"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                    type="file"
                    className=" md:w-[50%]  my-6"
                    onChange={handleChange}
                />
                <span>
                    {itemImage && (
                        <Image
                            src={itemImage}
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
