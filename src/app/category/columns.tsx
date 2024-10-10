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

import axios from "axios";
import { baseURL } from "../../../baseURL";

export type Order = {
    _id: string;
    name: string;
};
const handleDelete = async (id: string) => {
    try {
        const resp = await axios.delete(`${baseURL}/api/category/${id}`);
        console.log(resp);
        alert("delete success");
    } catch (error: any) {
        alert(error?.response?.data?.message);
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
                                            This action cannot be undone. This
                                            will also permanently delete the sub
                                            Categories of this category.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDelete(_id)}
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
