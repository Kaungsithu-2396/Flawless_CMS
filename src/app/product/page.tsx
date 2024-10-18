"use client";
import React, { useEffect, useState } from "react";
import { Order, columns } from "./columns";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function page() {
    const [data, setData] = useState([]);
    const router = useRouter();
    async function getProducts() {
        try {
            const productResp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
            );
            setData(productResp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    });
    useEffect(() => {
        getProducts();
    });

    return (
        <div className="my-8">
            <Link href="/product/upload">
                {" "}
                <Button>
                    {" "}
                    <span className="px-3">
                        <FaPlus />
                    </span>{" "}
                    Upload Product
                </Button>
            </Link>

            <DataTable columns={columns} data={data} token={token} />
        </div>
    );
}
