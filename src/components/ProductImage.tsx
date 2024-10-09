"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
export default function ProductImage({ images }: { images: string[] }) {
    console.log(images, "imgs");
    const [img1, img2, img3] = images;
    const [itemUrl, setItemUrl] = useState<any>(img1);
    console.log(images, "smth");
    const handleImageUrl = (e: any) => {
        setItemUrl({
            url: e.target.src,
        });
    };
    return (
        <>
            <div className="">
                <img
                    src={itemUrl.url}
                    width={400}
                    height={300}
                    alt="product image"
                    className="w-[300px]"
                />
            </div>

            <div className="my-3 flex justify-start gap-1 items-center">
                {img1 && (
                    <>
                        <img
                            //@ts-ignore
                            src={img1.url}
                            width={90}
                            height={80}
                            alt="Product detail image"
                            className="rounded-md cursor-pointer hover:opacity-50 duration-200 delay-200"
                            onClick={handleImageUrl}
                        />
                    </>
                )}

                {img2 && (
                    <img
                        //@ts-ignore
                        src={img2.url}
                        width={90}
                        height={80}
                        alt="Product detail image  "
                        className="rounded-md cursor-pointer hover:opacity-50 duration-200 delay-200"
                        onClick={handleImageUrl}
                    />
                )}
                {img3 && (
                    <img
                        //@ts-ignore
                        src={img3.url}
                        width={90}
                        height={80}
                        alt="Product detail image  "
                        className="rounded-md cursor-pointer hover:opacity-50 duration-200 delay-200"
                        onClick={handleImageUrl}
                    />
                )}
            </div>
        </>
    );
}
