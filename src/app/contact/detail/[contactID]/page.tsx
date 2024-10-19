"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function page({
    params: { contactID },
}: {
    params: {
        contactID: number;
    };
}) {
    const [contactData, setContactData] = useState<any>({});
    const [currentToken, setCurrentToken] = useState<string | null>("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentToken(localStorage.getItem("token"));
        }
    }, [currentToken]);

    async function getDetailContact() {
        try {
            if (currentToken) {
                const contactDetailResp = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact/${contactID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${currentToken}`,
                        },
                    }
                );
                setContactData(contactDetailResp.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDetailContact();
    }, [currentToken]);

    return (
        <>
            {!currentToken ? (
                <h1>Loading ...</h1>
            ) : (
                <>
                    <div className="w-screen my-3 bg-[#353839] text-white p-5">
                        <h1 className="">
                            <Link href={"/"}>Home </Link> /{" "}
                            <span className="font-bold">Contact</span>
                        </h1>
                    </div>
                    <section className=" w-2/3 m-auto ">
                        <h1 className="text-xl my-4 font-bold text-center md:text-left ">
                            Contact Detail
                        </h1>
                        <div className="hidden md:block">
                            <div className="flex   justify-center items-stretch w-full m-auto  gap-8 md:gap-10">
                                <div className=" flex flex-col items-stretch justify-stretch">
                                    <p className="  my-9">Name </p>
                                    <p className="  mb-9">Email</p>
                                    <p className="  mb-9">Phone</p>
                                    <p className="  mb-9">Message</p>
                                </div>
                                <div className="">
                                    {[...Array(4)].map((el) => {
                                        return <p className="my-9">:</p>;
                                    })}
                                </div>
                                <div className="font-bold">
                                    <p className=" my-9">{contactData.name}</p>
                                    <p className=" my-9">{contactData.email}</p>
                                    <p className=" my-9">
                                        {contactData.phoneNumber}
                                    </p>
                                    <p className=" my-9">
                                        {contactData.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="md:hidden block my-5">
                            <div className="flex flex-col justify-center items-start gap-4">
                                <span className="flex justify-start items-center">
                                    <h1 className="mx-3 mr-5">Name </h1>{" "}
                                    <h1 className="font-bold">
                                        {contactData.name}
                                    </h1>
                                </span>
                                <span className="flex  items-center">
                                    <h1 className="mx-3 mr-5">Email </h1>{" "}
                                    <h1 className="font-bold">
                                        {" "}
                                        {contactData.email}
                                    </h1>
                                </span>{" "}
                                <span className="flex justify-around items-center">
                                    <h1 className="mx-3 mr-5">Phone </h1>{" "}
                                    <h1 className="font-bold">
                                        {contactData.phoneNumber}
                                    </h1>
                                </span>{" "}
                                <span className="flex justify-around items-center">
                                    <h1 className="mx-3 mr-5 ">Message </h1>{" "}
                                    <h1 className="font-bold">
                                        {contactData.message}
                                    </h1>
                                </span>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
