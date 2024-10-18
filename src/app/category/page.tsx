"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Order, columns } from "./columns";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "./data-table";
import axios from "axios";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
export default function page() {
    const [data, setData] = useState([]);
    const [token, setToken] = useState<string | null>("");
    const router = useRouter();
    async function getCategory() {
        try {
            const resp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
            );
            setData(resp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);
    useEffect(() => {
        getCategory();
    }, []);

    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, []);
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
            <DataTable columns={columns} data={data} token={token} />
        </section>
    );
}
