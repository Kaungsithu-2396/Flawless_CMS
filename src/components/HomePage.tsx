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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!preview) {
            setErrorMsg("Please select one file");
        } else {
            setErrorMsg("");
        }
        console.log(itemImage);
        const formData = new FormData();
        formData.append("image", itemImage);
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/home`,
                formData,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res, "home page resp");
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
            <p className="my-4 text-zinc-400 ">
                Suggested image size : 3936x2624
            </p>
            <form
                className=" my-5 flex md:flex-row flex-col justify-start items-start md:items-center gap-6 xl:w-[60%]"
                onSubmit={handleSubmit}
            >
                <br />
                <span className="flex flex-col ">
                    <Input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const fileSize = Math.floor(
                                file.size / (1024 * 1024)
                            );
                            if (fileSize >= 6) {
                                setErrorMsg("file size must be under 6 Mb");
                                return;
                            }
                            //@ts-ignore
                            setPreview(file);
                            setItemImage(file);
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
