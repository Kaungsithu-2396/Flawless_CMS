"use client";
import React, { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { redirect } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "../../../../baseURL";

export default function page({
    params: { productId },
}: {
    params: {
        productId: string;
    };
}) {
    const [productData, setProductData] = useState<any>();
    async function getSepcificProduct() {
        try {
            const productResp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${productId}`
            );

            setProductData(productResp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSepcificProduct();
    }, []);

    const image = productData && productData.productImageCol;
    return (
        <>
            <div className=" m-12   grid grid-cols-1  lg:grid-cols-3 justify-content-center">
                <div className=" ">
                    {productData && <ProductImage images={image} />}
                </div>
                <div className=" flex flex-col gap-6 ">
                    <span>
                        <h1 className="font-bold text-xl">
                            {productData?.name}
                        </h1>
                        <h2 className="text-black/60">
                            {productData?.productCode}
                        </h2>
                    </span>

                    <p className="text-xl font-bold">{productData?.price} ฿</p>
                    <p className="text-xl">Stock : {productData?.stock} Item</p>

                    <span>
                        <h3 className=" font-bold text-xl">Description</h3>
                        <p className=" py-4 text-neutral-500 text-justify ">
                            {productData?.description}
                        </p>
                    </span>
                    <span className="  flex  flex-col gap-5 md:flex-row xl:gap-9">
                        <Link href={`/product/update/${productId}`}>
                            <button className="px-5 py-3 bg-[#228769] hover:font-bold duration-200 delay-200 text-white rounded-md">
                                <span className="flex justify-center items-center gap-3">
                                    Update
                                </span>
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
        </>
    );
}
