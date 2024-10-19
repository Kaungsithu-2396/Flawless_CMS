"use client";
import React, { useEffect, useState } from "react";
import { HiBellAlert } from "react-icons/hi2";
import { Order, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
export default function page() {
    const [data, setData] = useState([]);
    const [currentToken, setCurrentToken] = useState<string | null>("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentToken(localStorage.getItem("token"));
        }
    }, [currentToken]);
    async function getData() {
        try {
            if (currentToken) {
                const dataResp = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
                    {
                        headers: {
                            Authorization: ` Bearer ${currentToken}`,
                        },
                    }
                );
                setData(dataResp.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [currentToken]);
    return (
        <section className="mx-4">
            <h1 className="text-3xl flex items-center gap-5">
                <HiBellAlert /> Contact
            </h1>
            {!currentToken ? (
                <h1>Loading...</h1>
            ) : (
                <span>
                    <DataTable
                        columns={columns}
                        data={data}
                        token={currentToken}
                    />
                </span>
            )}
        </section>
    );
}
