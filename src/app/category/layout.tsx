import React from "react";
import CategorySVG from "@/components/CategorySVG";
import Link from "next/link";
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Link href="/category">
                <span className="flex my-5  justify-start items-center ">
                    <CategorySVG />
                    <h1 className="font-bold text-2xl">
                        Category Customization
                    </h1>
                </span>
            </Link>

            {children}
        </>
    );
}
