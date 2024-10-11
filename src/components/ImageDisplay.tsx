"use client";
type props = {
    image: {
        _id: string;
        image: {
            url: string;
            publicID: string;
        };
    };
    id: string;
    token: string | undefined;
};
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import axios from "axios";
import { baseURL } from "../../baseURL";
export default function ImageDisplay({ image, id, token }: props) {
    const deleteHandler = async (_id: string, publicID: string) => {
        try {
            const delResp = await axios.delete(`${baseURL}/api/home/${_id}`, {
                headers: {
                    Authorization: ` Bearer ${token}`,
                },
            });
            alert("Delete success");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="relative ">
                <Image
                    src={image.image.url}
                    width={400}
                    height={200}
                    alt="Product image"
                    className="rounded-md"
                />
                <div
                    className={`  absolute top-0 w-full h-full cursor-pointer `}
                >
                    <Button
                        className=" opacity-0 h-full hover:opacity-100 hover:text-red-400 duration-300 delay-200 hover:underline underline-offset-2 flex justify-center items-center right-0  w-full m-auto "
                        onClick={() =>
                            deleteHandler(image._id, image.image.publicID)
                        }
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}
