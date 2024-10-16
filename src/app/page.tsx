"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function page() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { email, password };

        setLoading(true);
        try {
            console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
            const resp = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("success");
            router.push("/dashboard");
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="absolute top-[40%] md:relative md:flex md:justify-center md:items-center xl:h-[70vh] md:h-screen mx-6">
            <form
                action=""
                method="post"
                className="  px-5 py-4 rounded-md"
                onSubmit={handleSubmit}
            >
                <span className="flex justify-center items-center my-5">
                    <label htmlFor="email" className="text-center  font-bold ">
                        LOGIN
                    </label>
                </span>
                <span className="text-red-500 py-5">{error && error}</span>
                <Input
                    placeholder="Email"
                    type="email"
                    size={50}
                    id="email"
                    value={email}
                    className="py-7"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                />
                <Input
                    placeholder="password"
                    type="password"
                    className="my-4 py-7"
                    size={50}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                />

                <span className="w-full">
                    <Button type="submit" className="text-center w-full ">
                        {loading ? "loading..." : "Log In"}
                    </Button>
                </span>
            </form>
        </section>
    );
}
