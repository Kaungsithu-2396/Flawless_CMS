"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { baseURL } from "../../../baseURL";
import React, { useEffect, useState } from "react";
import { Order, columns } from "./columns";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "./data-table";
import axios from "axios";
export default function page() {
    const [data, setData] = useState([]);
    async function getCategory() {
        const resp = await axios.get(`${baseURL}/api/category`);
       
        if (resp.statusText === "OK") {
            setData(resp.data.data);
        } else {
            return ["No subcategory"];
        }
    }
    useEffect(() => {
        getCategory();
    }, []);

    console.log("data", data);
    return (
        <section className="mx-4 ">
            <div className=" flex justify-between">
                <h1 className="font-bold text-xl">Category Collection</h1>
                <Link href="/category/categoryUpload">
                    <Button className=" bg-[#047857] py-5">
                        {" "}
                        <span className="px-2">
                            {" "}
                            <FaPlus />
                        </span>
                        Add Category
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} />
        </section>
    );
}
