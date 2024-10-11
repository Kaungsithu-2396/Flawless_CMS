"use client";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { table } from "console";

export type Order = {
    _id: string;
    name: string;
    productCode: string;
    price: number;
};

const handleDelete = async (id: string, token: string) => {
    try {
        const resp = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`,
            {
                headers: {
                    Authorization: ` Bearer ${token} `,
                },
            }
        );
        alert("delete success");
    } catch (error: any) {
        alert(error?.response?.data?.message);
    }
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
        cell: ({ row, table }) => {
            const {
                original: { _id },
            } = row;
            //@ts-ignore
            const token = table?.options.meta?.token;
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

                        <span className="px-2 ">
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <DropdownMenu>
                                        <span className="text-sm text-red-400">
                                            delete
                                        </span>
                                    </DropdownMenu>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                handleDelete(_id, token)
                                            }
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </span>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
