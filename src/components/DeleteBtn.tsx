import React from "react";
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
import { getToken } from "@/app/utils/cookie";
import { cookies } from "next/headers";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
const handleDelete = async (id: string) => {
    try {
        const resp = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`
        );
        console.log(resp);
        alert("delete success");
    } catch (error: any) {
        alert(error?.response?.data?.message);
    }
};
export default async function DeleteBtn({ id }: { id: string }) {
    const token = await getToken();
    console.log(token, "tokenlist");
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <DropdownMenu>
                        <span className="text-sm text-red-400">delete</span>
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
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(id)}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
