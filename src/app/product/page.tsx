import React from "react";
import { Order, columns } from "./columns";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import axios from "axios";
import { baseURL } from "../../../baseURL";
export default async function page() {
    async function getProducts() {
        try {
            const productResp = await axios.get(`${baseURL}/api/product`);
            return productResp.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const data = (await getProducts()) || [];
    const token = cookies().get("token");

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
