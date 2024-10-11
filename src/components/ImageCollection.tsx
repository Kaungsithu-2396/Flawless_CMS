"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";
import { baseURL } from "../../baseURL";
import axios from "axios";

export default function ImageCollection({
    token,
}: {
    token: string | undefined;
}) {
    const [images, setImages] = useState([]);
    async function getAllHomePageImages() {
        try {
            const resp = await axios.get(`${baseURL}/api/home`);
            setImages(resp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllHomePageImages();
    }, []);

    return (
        <section className="flex md:flex-row flex-col gap-5 my-8">
            {images.map((el: any) => {
                return <ImageDisplay image={el} id={el._id} token={token} />;
            })}
        </section>
    );
}
