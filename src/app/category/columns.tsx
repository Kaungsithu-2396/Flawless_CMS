"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { baseURL } from "../../../baseURL";

export type Order = {
    _id: string;
    name: string;
};
const handleDelete = async (id: string) => {
    try {
        await axios.delete(`${baseURL}/api/category/${id}`);
        alert("delete success");
    } catch (error) {
        console.log(error);
    }
};
export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "id",
        cell: ({ row }) => {
            return <span>{Number(row.id) + 1}</span>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            console.log("row", row);
            const {
                original: { _id },
            } = row;
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

                        <Link href={`/category/subCategories/${_id}`}>
                            <DropdownMenuItem>
                                View SubCategories
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/category/updateCategory/${_id}`}>
                            <DropdownMenuItem>Update Category</DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem onClick={() => handleDelete(_id)}>
                            {" "}
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
