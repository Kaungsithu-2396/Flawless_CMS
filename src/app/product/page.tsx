import React, { useEffect, useState } from "react";
import { Order, columns } from "./columns";
import { FaPlus } from "react-icons/fa";

import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { getToken } from "../utils/cookie";
export default async function page() {
    const token = await getToken();

    async function getProducts() {
        try {
            const productResp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
            );
            return productResp.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    const data = await getProducts();

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
            <DataTable columns={columns} data={data} token={token?.value} />
        </div>
    );
}
