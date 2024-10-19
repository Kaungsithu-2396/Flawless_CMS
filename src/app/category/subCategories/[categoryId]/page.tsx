import { DataTable } from "./data-table";
import { Order, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { getToken } from "@/lib/cookie";
export default async function page({
    params: { categoryId },
}: {
    params: { categoryId: number };
}) {
    const token = await getToken();
    async function getData() {
        try {
            const resp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/subCategory/${categoryId}`,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            return resp.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    async function getCategoryById() {
        const resp = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${categoryId}`,
            {
                headers: {
                    Authorization: ` Bearer ${token}`,
                },
            }
        );

        if (resp.statusText === "OK") {
            return resp.data.data;
        } else {
            return [];
        }
    }
    const data = await getData();
    const mainCategory = await getCategoryById();
    return (
        <>
            <section className="mx-5">
                <span className="flex justify-between items-center">
                    <h1>
                        Sub Categories for{" "}
                        <span className="text-xl font-bold">
                            "{mainCategory.name.toUpperCase()}"
                        </span>
                    </h1>
                    <h1>
                        <Link
                            href={`/category/uploadsubCategory/${categoryId}`}
                        >
                            <Button>
                                {" "}
                                <FaPlus /> Add SubCateogries
                            </Button>
                        </Link>
                    </h1>
                </span>
                <DataTable columns={columns} data={data} token={token} />
            </section>
        </>
    );
}
