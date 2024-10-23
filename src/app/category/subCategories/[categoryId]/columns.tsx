"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { baseURL } from "../../../../../baseURL";

export type Order = {
    _id: string;
    name: string;
};

const handleDelete = async (id: string, token: string) => {
    try {
        const resp = await axios.delete(`${baseURL}/api/subCategory/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("what's wrong", resp);
        alert("delete success");
    } catch (error: any) {
        console.log(error);
        alert(error?.response?.data.message);
    }
};
export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const {
                original: { _id },
            } = row;
            //@ts-ignore
            const token = table?.options?.meta?.token;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <Link href={`/category/subCategories/update/${_id}`}>
                            <DropdownMenuItem>Update</DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                            onClick={() => handleDelete(_id, token)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
