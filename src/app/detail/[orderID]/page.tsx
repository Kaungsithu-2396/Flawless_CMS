import React from "react";
import Link from "next/link";
import axios from "axios";
import { getToken } from "@/lib/cookie";
export default async function page({
    params: { orderID },
}: {
    params: { orderID: string };
}) {
    const token = await getToken();
    async function getOrderDetail() {
        try {
            const resp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${orderID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return resp.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    const {
        name,
        email,
        phone,
        address,
        zipCode,
        installmentPlan,
        lineId,
        order,
        message,
    } = await getOrderDetail();
    const orderItem = order.map((el: any) => el.price * el.count);
    
    const total = orderItem.reduce((acc: any, val: any) => {
        return acc + val;
    }, 0);

    return (
        <>
            <div className="w-screen my-3 bg-[#353839] text-white p-5">
                <h1 className="">
                    <Link href={"/"}>Home </Link> /{" "}
                    <span className="font-bold">Order</span>
                </h1>
            </div>
            <section className=" w-2/3 m-auto ">
                <h1 className="text-xl my-4 font-bold text-center md:text-left ">
                    Order Detail
                </h1>
                <div className="hidden md:block">
                    <div className="flex   justify-center items-stretch w-full m-auto  gap-8 md:gap-10">
                        <div className=" flex flex-col items-stretch justify-stretch">
                            <p className="  my-9">Name </p>
                            <p className="  mb-9">Email</p>
                            <p className="  mb-9">Phone</p>
                            <p className="  mb-9">Installment</p>
                            <p className="  mb-9">Zip Code</p>
                            <p className="  mb-9">Line ID</p>
                            <p className="  mb-9">Message</p>
                            <p className="  mb-9">Total Price</p>
                            <p className="  mb-9">Order</p>
                            <p className="   mb-9">Address</p>
                        </div>
                        <div className="">
                            {[...Array(10)].map((el) => {
                                return <p className="my-9">:</p>;
                            })}
                        </div>
                        <div className="font-bold">
                            <p className=" my-9">{name}</p>
                            <p className=" my-9">{email}</p>
                            <p className=" my-9">{phone}</p>
                            <p className=" my-9">
                                {installmentPlan ? "yes" : "no"}
                            </p>

                            <p className=" my-9">{zipCode}</p>
                            <p className=" my-9">{lineId}</p>
                            <p className=" my-9">
                                {" "}
                                {message ? message : "nothing"}
                            </p>

                            <p className=" my-9 ">{total} B</p>
                            <p className="  md:my-9   ">
                                {order.map((el: any) => {
                                    return (
                                        <>
                                            {el.name} ({el.productCode}) x{" "}
                                            {el.count} ,<br />
                                        </>
                                    );
                                })}
                            </p>
                            <p className=" my-9  md:w-full   overflow-scroll">
                                {address}
                                {zipCode}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:hidden block my-5">
                    <div className="flex flex-col justify-center items-start gap-4">
                        <span className="flex justify-start items-center">
                            <h1 className="mx-3 mr-5">Name </h1>{" "}
                            <h1 className="font-bold">Kaung Si Thu</h1>
                        </span>
                        <span className="flex  items-center">
                            <h1 className="mx-3 mr-5">Email </h1>{" "}
                            <h1 className="font-bold"> Sithu@gmail.com</h1>
                        </span>{" "}
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5">Phone </h1>{" "}
                            <h1 className="font-bold">0632819191</h1>
                        </span>{" "}
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5 ">Installment </h1>{" "}
                            <h1 className="font-bold">Yes</h1>
                        </span>
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5">ZipCode </h1>{" "}
                            <h1 className="font-bold">10213</h1>
                        </span>
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5">LineID </h1>{" "}
                            <h1 className="font-bold">@flawless</h1>
                        </span>
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5">Message </h1>{" "}
                            <h1 className="font-bold">nice</h1>
                        </span>
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5">Price </h1>{" "}
                            <h1 className="font-bold">1000 B</h1>
                        </span>
                        <span className="flex justify-around items-center">
                            <h1 className="mx-3 mr-5">Order </h1>{" "}
                            <h1 className="font-bold">Diamond Ring(129101)</h1>
                        </span>
                        <span className="flex justif-around item-center">
                            <h1 className=" mx-3  mr-5">Address </h1>
                            <h1 className=" font-bold">
                                119 Mahesak, Suriya Wong, Bang Rak, Bangkok
                                10500
                            </h1>
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}
