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
console.log("nice");
export type Order = {
    id: string;
    name: string;
    email: string;
    totalAmount: number;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">total</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount"));
            const formatted = new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const {
                original: { id },
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
                        <Link href={`/detail/${id}`}>
                            <DropdownMenuItem>View detail</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
