import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Order, columns } from "./columns";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "./data-table";
import axios from "axios";
import { getToken } from "../utils/cookie";

export default async function page() {
    const token = await getToken();
    async function getCategory() {
        try {
            const resp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
            );
            return resp.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const data = await getCategory();

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
            <DataTable columns={columns} data={data} token={token?.value} />
        </section>
    );
}
