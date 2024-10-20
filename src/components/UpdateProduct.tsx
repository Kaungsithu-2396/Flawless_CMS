"use client";
import Compressor from "compressorjs";
import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { productForm } from "../../types";
export default function UpdateProduct({
    productID,
    token,
}: {
    productID: string;
    token: string | null;
}) {
    const [dropDownValue, setDropDownValue] = useState<string>("");
    const [preview, setPreview] = useState<FileList | null>();
    const [categoryData, setCategoryData] = useState<any>();
    const [subCategoryData, setsubCategoryData] = useState<any>();
    const [subCategory, setsubCategory] = useState([]);
    const [subCatData, setSubCateData] = useState("");
    const [prevData, setPrevData] = useState<any>({});
    const [prevDataImage, setPrevDataImage] = useState<any>();
    const [category, setcategory] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
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
    async function getSpecificProduct() {
        try {
            const productResp = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${productID}`
            );
            setPrevDataImage(productResp.data.data.productImageCol);
            setPrevData(productResp.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSpecificProduct();
        getAllCategories();
        getAllSubCategories();
    }, []);
    const { productImageCol } = prevData;
    const transformFiles = (files: FileList) => {
        const fileArray = Array.from(files);
        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImages((prevImages) => [
                    ...prevImages,
                    reader.result as string,
                ]); // Add each image to the array
            };
        });
    };
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
    const maxFiles = 3;
    const validateFiles = (files: any) => {
        if (files.length > maxFiles) {
            setError("productImage", {
                type: "manual",
                message: `You can upload a maximum of ${maxFiles} images.`,
            });
            return false;
        }
        return true;
    };
    const onSubmit: SubmitHandler<productForm> = async (data) => {
        const publicIDCol = prevDataImage.map((el: any) => el.publicID);
        const { name, description, price, productCode, stock, productImage } =
            data;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", String(price));
        formData.append("productCode", productCode);
        formData.append("stock", String(stock));
        formData.append("category", category);
        formData.append("subCategory", subCatData);
        formData.append("publicID", JSON.stringify(publicIDCol));

        setLoading(true);
        const compressorPromises = Array.from(preview ? preview : []).map(
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
            const updateResp = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${productID}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );

            alert("update succes");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className="mx-8">
                <h2 className="my-4 font-bold">Update Product</h2>
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
                                placeholder={prevData?.name}
                                className="my-3"
                                {...register("name")}
                            />
                        </span>

                        <span>
                            <label htmlFor="price">Price</label>
                            <Input
                                placeholder={prevData?.price}
                                type="Number"
                                id="price"
                                className="my-3"
                                {...register("price")}
                            />
                        </span>

                        <span>
                            <label htmlFor="pc">Product Code</label>
                            <Input
                                placeholder={prevData?.productCode}
                                className="my-3"
                                id="pc"
                                {...register("productCode")}
                            />
                        </span>

                        <span>
                            <label htmlFor="stock">Stock</label>
                            <Input
                                placeholder={prevData?.stock}
                                type="number"
                                id="stock"
                                className="my-3"
                                {...register("stock")}
                            />
                        </span>

                        <span>
                            <label htmlFor="">Description</label>
                            <Textarea
                                placeholder={prevData?.description}
                                className="my-3"
                                {...register("description")}
                            />
                        </span>

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

                        <span>
                            <label htmlFor="">Sub Category</label>
                            <div className="my-2">
                                <Select
                                    disabled={
                                        dropDownValue == "" ? true : false
                                    }
                                    onValueChange={(data) =>
                                        setSubCateData(data)
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

                        <span>
                            <label htmlFor="">Product Image</label>
                            <br />
                            <Input
                                {...register("productImage", {
                                    validate: (files) => validateFiles(files),
                                })}
                                className="my-3"
                                type="file"
                                multiple
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    //@ts-ignore
                                    const files = Array.from(e.target.files);
                                    if (files.length > 3) {
                                        alert("Image count must be under 3");
                                        //@ts-ignore
                                        setPreview([]);
                                    } else {
                                        //@ts-ignore
                                        setPreview(files);
                                        //@ts-ignore
                                        transformFiles(files);
                                    }
                                }}
                            />
                        </span>

                        <span className="flex flex-col md:flex-row gap-8">
                            {/* <img
                                                  src={el.url}
                                                  alt="image for product"
                                                  className=" xl:w-[100px] xl:h-[100px] rounded-md"
                                              /> */}
                            {/* {preview
                                ? fileListsArray?.map((el: any) => {
                                      return (
                                          <img
                                              className="w-[200px] "
                                              src={URL.createObjectURL(el)}
                                          />
                                      );
                                  })
                                : prevDataImage?.map((el: any, index: Key) => {
                                      return (
                                          <Image
                                              key={index}
                                              src={el.url}
                                              width={200}
                                              height={200}
                                              alt={el.url}
                                              className="rounded-md"
                                          />
                                      );
                                  })} */}
                            {preview
                                ? fileListsArray?.map((el: any) => {
                                      return (
                                          <img
                                              className="w-[200px] "
                                              src={URL.createObjectURL(el)}
                                          />
                                      );
                                  })
                                : productImageCol?.map((el: any) => {
                                      return (
                                          <img
                                              src={el.url}
                                              width={200}
                                              height={200}
                                              alt="product image"
                                          />
                                      );
                                  })}
                            {/* {!preview &&
                                prevData &&
                                prevData.productImageCol.map((el: any) => {
                                    return (
                                        <img
                                            src={el.url}
                                            width={200}
                                            height={200}
                                            alt="product image"
                                        />
                                    );
                                })} */}
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
