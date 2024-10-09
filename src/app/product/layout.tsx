import React from "react";
import ProductSVG from "@/components/ProductSVG";
import Link from "next/link";
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="mx-7">
            <Link href={"/product"}>
                <span className="flex gap-3  justify-start items-center ">
                    {" "}
                    <ProductSVG />{" "}
                    <span className="text-xl font-bold">
                        Product Customization
                    </span>
                </span>
            </Link>

            {children}
        </section>
    );
}
