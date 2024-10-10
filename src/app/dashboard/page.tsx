import Image from "next/image";
import Link from "next/link";
import { Order, columns } from "./columns";
import { DataTable } from "./data-table";
import { HiBellAlert } from "react-icons/hi2";
import { cookies } from "next/headers";

export default async function Home() {
    const token = cookies().get("token");
    async function getData(): Promise<Order[]> {
        // Fetch data from your API here.
        return [
            {
                id: "728ed52f",
                name: "Kaung Si Thu",
                totalAmount: 100,
                email: "m@example.com",
            },
            {
                id: "728ed52g",
                name: "Min Min Zaw",
                totalAmount: 100,
                email: "sithu@example.com",
            },
            // ...
        ];
    }
    const data = await getData();
    return (
        <section className=" m-7 md:mt-7  md:w-2/3 md:m-auto flex flex-col  gap-6">
            <div className="flex lg:flex-row flex-col justify-between items-center gap-5 ">
                <Link href={"/product"} className="w-full ">
                    <div className=" w-full  text-xl  bg-[#F86939] p-4 flex flex-col justify-center items-center rounded-md ">
                        <h1 className="text-white text-center font-bold my-3 hover:scale-105 duration-200 delay-200  ">
                            Product <br /> Customization
                        </h1>
                        <svg
                            width="79"
                            height="72"
                            viewBox="0 0 66 66"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M33.0312 0.21875L65.125 14.8438V51.4062L33.0312 65.9961L0.9375 51.4062V14.8438L33.0312 0.21875ZM57.1401 16.25L33.0312 5.28125L23.7349 9.5L47.6895 20.5391L57.1401 16.25ZM33.0312 27.2188L42.2119 23.0703L18.2188 12.0312L8.92236 16.25L33.0312 27.2188ZM5.875 19.9062V48.5938L30.5625 59.8438V31.1562L5.875 19.9062ZM35.5 59.8438L60.1875 48.5938V19.9062L35.5 31.1562V59.8438Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                </Link>
                <Link href={"/category"} className="w-full">
                    <div className=" w-full  text-xl  bg-[#228769] p-4 flex flex-col justify-center items-center rounded-md">
                        <h1 className="text-white text-center font-bold my-3 hover:scale-105 duration-200 delay-200  ">
                            Category <br /> Customization
                        </h1>
                        <svg
                            width="83"
                            height="76"
                            viewBox="0 0 83 76"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M58.7916 31.6667C64.5216 31.6667 69.1666 27.4135 69.1666 22.1667C69.1666 16.92 64.5216 12.6667 58.7916 12.6667C53.0617 12.6667 48.4166 16.92 48.4166 22.1667C48.4166 27.4135 53.0617 31.6667 58.7916 31.6667Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M24.2083 63.3335C29.9383 63.3335 34.5833 59.0802 34.5833 53.8335C34.5833 48.5868 29.9383 44.3335 24.2083 44.3335C18.4784 44.3335 13.8333 48.5868 13.8333 53.8335C13.8333 59.0802 18.4784 63.3335 24.2083 63.3335Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M48.4166 44.3334H69.1666V60.1667C69.1666 61.0066 68.8023 61.8121 68.1537 62.4059C67.5052 62.9998 66.6255 63.3334 65.7083 63.3334H51.875C50.9578 63.3334 50.0781 62.9998 49.4296 62.4059C48.781 61.8121 48.4166 61.0066 48.4166 60.1667V44.3334ZM13.8333 12.6667H34.5833V28.5001C34.5833 29.3399 34.219 30.1454 33.5704 30.7393C32.9218 31.3331 32.0422 31.6667 31.125 31.6667H17.2916C16.3744 31.6667 15.4948 31.3331 14.8462 30.7393C14.1977 30.1454 13.8333 29.3399 13.8333 28.5001V12.6667Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </Link>
                <Link href="/contact" className="w-full">
                    <div className=" w-full  text-xl  bg-[#334464] p-4 flex flex-col justify-center items-center rounded-md">
                        <h1 className="text-white text-center font-bold my-3 hover:scale-105 duration-200 delay-200  ">
                            Contact <br /> Alert
                        </h1>
                        <span className="text-2xl text-white m-auto ">
                            <HiBellAlert size={70} />
                        </span>
                    </div>
                </Link>
            </div>
            <div className="">
                <Link href="/home" className="w-full">
                    <div className=" w-full  text-xl  bg-[#00B2FF] p-4 flex flex-col justify-center items-center rounded-md">
                        <h1 className="text-white text-center font-bold my-3 hover:scale-105 duration-200 delay-200  ">
                            Home Page <br /> Customization
                        </h1>
                        <svg
                            width="79"
                            height="72"
                            viewBox="0 0 65 57"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M33.2059 11.2754C33.0168 11.1168 32.7654 11.0283 32.5038 11.0283C32.2422 11.0283 31.9908 11.1168 31.8018 11.2754L8.42969 30.8546C8.33043 30.9379 8.25146 31.038 8.19756 31.1488C8.14367 31.2595 8.11596 31.3788 8.11611 31.4992L8.1123 49.8751C8.1123 50.8199 8.54032 51.726 9.30218 52.3941C10.064 53.0622 11.0974 53.4376 12.1748 53.4376H24.375C24.9137 53.4376 25.4304 53.2499 25.8113 52.9158C26.1922 52.5818 26.4062 52.1287 26.4062 51.6563V36.5157C26.4062 36.2795 26.5133 36.0529 26.7037 35.8859C26.8942 35.7189 27.1525 35.6251 27.4219 35.6251H37.5781C37.8475 35.6251 38.1058 35.7189 38.2963 35.8859C38.4867 36.0529 38.5938 36.2795 38.5938 36.5157V51.6563C38.5938 52.1287 38.8078 52.5818 39.1887 52.9158C39.5696 53.2499 40.0863 53.4376 40.625 53.4376H52.8201C53.8976 53.4376 54.9309 53.0622 55.6927 52.3941C56.4546 51.726 56.8826 50.8199 56.8826 49.8751V31.4992C56.8828 31.3788 56.8551 31.2595 56.8012 31.1488C56.7473 31.038 56.6683 30.9379 56.569 30.8546L33.2059 11.2754Z"
                                fill="black"
                            />
                            <path
                                d="M62.3225 27.1808L52.8264 19.2141V7.125C52.8264 6.65258 52.6124 6.19951 52.2315 5.86547C51.8506 5.53142 51.3339 5.34375 50.7952 5.34375H44.7014C44.1627 5.34375 43.6461 5.53142 43.2651 5.86547C42.8842 6.19951 42.6702 6.65258 42.6702 7.125V10.6875L35.3171 4.52215C34.629 3.91207 33.6057 3.5625 32.5 3.5625C31.398 3.5625 30.3773 3.91207 29.6892 4.52326L2.68632 27.1785C1.89667 27.8465 1.79764 28.9453 2.5162 29.6689C2.69664 29.8516 2.91757 30.0001 3.16556 30.1055C3.41355 30.2109 3.6834 30.271 3.95869 30.282C4.23398 30.2931 4.50896 30.2549 4.76688 30.1698C5.0248 30.0846 5.26027 29.9544 5.45897 29.787L31.8017 7.71281C31.9908 7.55426 32.2422 7.46577 32.5038 7.46577C32.7654 7.46577 33.0168 7.55426 33.2058 7.71281L59.5512 29.787C59.9392 30.1133 60.459 30.2914 60.9966 30.2822C61.5342 30.2731 62.0457 30.0773 62.419 29.738C63.1985 29.0299 63.1338 27.861 62.3225 27.1808Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className=" m-4 font-bold text-xl">Order Detail</div>

            <DataTable columns={columns} data={data} />
        </section>
    );
}
