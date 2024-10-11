"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageCollection from "@/components/ImageCollection";
import Image from "next/image";
import axios from "axios";
export default function HomePage({ token }: { token: string | undefined }) {
    const [preview, setPreview] = useState<any>("");
    const [itemImage, setItemImage] = useState<any>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
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
        if (!preview) {
            setErrorMsg("Please select one file");
        } else {
            setErrorMsg("");
        }
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/home`,
                {
                    image: itemImage,
                },
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            console.log(res);
            alert("upload success");
            setPreview("");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <form
                className=" my-5 flex md:flex-row flex-col justify-start items-start md:items-center gap-6 xl:w-[60%]"
                onSubmit={handleSubmit}
            >
                <span className="flex flex-col ">
                    <Input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            //@ts-ignore
                            setPreview(file);
                            transformFile(file);
                            setErrorMsg("");
                        }}
                    />
                    {errorMsg && (
                        <span className="text-red-400 ">{errorMsg}</span>
                    )}
                </span>

                <Button>{loading ? "loading..." : "upload"}</Button>
            </form>
            {preview && (
                //@ts-ignore
                <Image
                    src={URL.createObjectURL(preview)}
                    width={200}
                    height={200}
                    className="my-5 rounded-md"
                />
            )}

            <div className="">
                <h2 className="font-bold">Uploaded Images</h2>
                <ImageCollection token={token} />
            </div>
        </>
    );
}
