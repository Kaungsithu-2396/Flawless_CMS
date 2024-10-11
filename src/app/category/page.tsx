import Link from "next/link";
import { Button } from "@/components/ui/button";
import { baseURL } from "../../../baseURL";
import { Order, columns } from "./columns";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "./data-table";
import axios from "axios";
import { cookies } from "next/headers";
export default async function page() {
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
    const cookie = cookies();
    const token: string | undefined = cookie.get("token")?.value;
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
