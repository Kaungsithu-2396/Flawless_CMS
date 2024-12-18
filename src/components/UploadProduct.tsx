"use client";
import Compressor from "compressorjs";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { productForm } from "../../types";
import axios from "axios";

export default function UploadProduct({ token }: { token: string | null }) {
    const maxFileSize = 19;
    const [dropDownValue, setDropDownValue] = useState<string>("");
    const [preview, setPreview] = useState<FileList | null>();
    const [categoryData, setCategoryData] = useState<any>();
    const [productImages, setProductImages] = useState([]);
    const [subCategoryData, setsubCategoryData] = useState<any>();
    const [subCategory, setsubCategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
    const [category, setcategory] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState("");

    const [loading, setLoading] = useState<boolean>(false);
    async function getAllCategories() {
        try {
            const categories = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
            );
            setCategoryData(categories.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getAllSubCategories() {
        try {
            const allSubCategories = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/subCategory`
            );
            setsubCategoryData(allSubCategories.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCategories();
        getAllSubCategories();
    }, []);
    // const transformFiles = (files: FileList) => {
    //     const fileArray = Array.from(files); // Convert FileList to an array
    //     fileArray.forEach((file) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //     });
    // };
    const data = categoryData || [];
    const dropDownHandler = async (value: string) => {
        setDropDownValue(value);
        const [id, category] = value.split(",");
        setcategory(category);

        //@ts-ignore
        const SubCategory = subCategoryData || [];
        const selectedSubCategory = SubCategory?.filter(
            (el: any) => el.mainCategory === id
        );

        setsubCategory(selectedSubCategory || []);
    };
    const fileListsArray = preview && Array.from(preview);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<productForm>();
    console.log(errors);

    const onSubmit: SubmitHandler<productForm> = async (data) => {
        const { name, description, price, productCode, stock, productImage } =
            data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", String(price));
        formData.append("productCode", productCode);
        formData.append("stock", String(stock));
        formData.append("category", category);
        formData.append("subCategory", selectedSubCategory);
        setLoading(true);
        // console.log(alert(preview?.length));
        //compress image size
        //@ts-ignore
        const compressorPromises = Array.from(preview)?.map(
            (image) =>
                new Promise((resolve, reject) => {
                    //@ts-ignore
                    new Compressor(image, {
                        quality: 0.6,
                        success: (compressedImg) => {
                            //@ts-ignore
                            resolve({ compressedImg, name: image?.name });
                        },
                        error: (err) => {
                            reject(err);
                        },
                    });
                })
        );

        const compressedImages = await Promise.all(compressorPromises);

        //@ts-ignore
        compressedImages.forEach(({ compressedImg, name }) => {
            formData.append("images", compressedImg, name);
        });

        try {
            const uploadResp = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );

            alert("upload succes");
        } catch (error: any) {
            setErrorMsg(error?.response?.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className="mx-8">
                <h2 className="my-4 font-bold">Add Product</h2>
                <span className="text-red-500">{errorMsg}</span>
                <form
                    action=""
                    className="flex flex-col xl:flex-row justify-center items-start lg:my-9 xl:my-0 md:gap-5"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <div className=" w-full">
                        <span>
                            <label htmlFor="">Name</label>
                            <Input
                                placeholder="Name"
                                className="my-3"
                                {...register("name", {
                                    required: "please provide the name",
                                })}
                            />
                        </span>
                        {errors?.name?.type === "required" && (
                            <p className="text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                        <span>
                            <label htmlFor="price">Price</label>
                            <Input
                                placeholder="price"
                                type="Number"
                                id="price"
                                className="my-3"
                                {...register("price", {
                                    required: "please provide the price",
                                })}
                            />
                        </span>
                        {errors?.price?.type === "required" && (
                            <p className="text-red-400">
                                {errors.price.message}
                            </p>
                        )}
                        <span>
                            <label htmlFor="pc">Product Code</label>
                            <Input
                                placeholder="product code"
                                className="my-3"
                                id="pc"
                                {...register("productCode", {
                                    required: "please provide the product code",
                                })}
                            />
                        </span>
                        {errors?.productCode?.type === "required" && (
                            <p className="text-red-400">
                                {errors.productCode.message}
                            </p>
                        )}
                        <span>
                            <label htmlFor="stock">Stock</label>
                            <Input
                                placeholder="Stock"
                                type="number"
                                id="stock"
                                className="my-3"
                                {...register("stock", {
                                    required: "please provide the valid stock",
                                })}
                            />
                        </span>
                        {errors?.stock?.type === "required" && (
                            <p className="text-red-400">
                                {errors.stock.message}
                            </p>
                        )}
                        <span>
                            <label htmlFor="">Description</label>
                            <Textarea
                                placeholder="Description"
                                className="my-3"
                                {...register("description", {
                                    required: "please provide the description",
                                })}
                            />
                        </span>
                        {errors?.description?.type === "required" && (
                            <p className="text-red-400">
                                {errors.description.message}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className=" hidden xl:block w-full text-center my-5"
                        >
                            {loading ? "loading.." : "submit"}
                        </Button>
                    </div>

                    <span className="w-full">
                        <span>
                            <label htmlFor="">Category</label>
                            <div className="my-2">
                                <Select onValueChange={dropDownHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.map((el: any) => {
                                            return (
                                                <SelectItem
                                                    key={el.id}
                                                    value={String(
                                                        el._id + "," + el.name
                                                    )}
                                                >
                                                    {el.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </span>
                        {category ? (
                            ""
                        ) : (
                            <h1 className="text-red-400">
                                Don't forget to choose the category
                            </h1>
                        )}

                        <span>
                            <label htmlFor="">Sub Category</label>
                            <div className="my-2">
                                <Select
                                    disabled={
                                        dropDownValue == "" ? true : false
                                    }
                                    onValueChange={(data) =>
                                        setSelectedSubCategory(data)
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subCategory.map((el: any) => {
                                            return (
                                                <SelectItem
                                                    key={el.id}
                                                    value={el.name}
                                                >
                                                    {el.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </span>
                        {subCategory.length > 0 ? (
                            ""
                        ) : (
                            <h1 className="text-red-400">
                                Don't forget to choose the sub category
                            </h1>
                        )}

                        <span>
                            <label htmlFor="">Product Image</label>
                            <br />
                            <Input
                                {...register("productImage", {
                                    required: "please select file",
                                    // validate: (files) => validateFiles(files),
                                })}
                                className="my-3"
                                type="file"
                                multiple
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    //@ts-ignore
                                    const files = Array.from(e.target.files);
                                    const fileSize = files
                                        .map((el) => el.size)
                                        .reduce((acc, el) => acc + el, 0);
                                    const size = Math.ceil(
                                        fileSize / (1024 * 1024)
                                    );

                                    if (files.length > 3) {
                                        alert("Image count must be under 3");
                                        //@ts-ignore
                                        setPreview([]);
                                    } else if (files.length < 2) {
                                        alert("image must be at least 2");
                                        //@ts-ignore
                                        setPreview([]);
                                    } else if (size >= maxFileSize) {
                                        alert(
                                            `image size must be under ${maxFileSize} MB`
                                        );
                                        //@ts-ignore
                                        setPreview([]);
                                    } else {
                                        //@ts-ignore
                                        setPreview(files);
                                        // //@ts-ignore
                                        // transformFiles(e.target.files);
                                    }
                                }}
                            />
                        </span>
                        {errors?.productImage?.type === "required" && (
                            <p className="text-red-400">
                                {errors.productImage.message}
                            </p>
                        )}
                        <span className="flex flex-col md:flex-row gap-8">
                            {fileListsArray?.map((el: any) => {
                                return (
                                    <img
                                        className="w-[200px] "
                                        src={URL.createObjectURL(el)}
                                    />
                                );
                            })}
                        </span>
                    </span>
                    <Button
                        type="submit"
                        className=" xl:hidden block w-full text-center my-5"
                    >
                        {loading ? "loading..." : "submit"}
                    </Button>
                </form>
            </section>
        </>
    );
}
