import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Nav() {
    return (
        <>
            <nav className="flex cursor-pointer justify-center items-center pt-3">
                <Link href={"/"}>
                    <Image
                        src={"/flawlesslogo.png"}
                        width={200}
                        height={100}
                        alt="logo of Flawless"
                    />
                </Link>
            </nav>
        </>
    );
}
