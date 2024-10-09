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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Order = {
    _id: string;
    name: string;
    productCode: string;
    price: number;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "productCode",
        header: "Product Code",
    },
    {
        accessorKey: "price",
        header: "Price",
    },

    {
        id: "actions",
        cell: ({ row }) => {
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

                        <Link href={`/product/${_id}`}>
                            <DropdownMenuItem>View Product</DropdownMenuItem>
                        </Link>
                        <Link href={`/product/update/${_id}`}>
                            <DropdownMenuItem>Update Product</DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
