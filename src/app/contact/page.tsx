import React from "react";
import { HiBellAlert } from "react-icons/hi2";
import { Order, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
export default async function page() {
    async function getData() {
        try {
            const dataResp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`
            );
            return dataResp.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    const data = await getData();
    return (
        <section className="mx-4">
            <h1 className="text-3xl flex items-center gap-5">
                <HiBellAlert /> Contact
            </h1>
            <span>
                <DataTable columns={columns} data={data} />
            </span>
        </section>
    );
}
