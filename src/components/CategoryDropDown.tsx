import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const data = [
    {
        id: 1,
        name: "Ring",
    },
    {
        id: 2,
        name: "Bracelets",
    },
];
export default function CategoryDropDown({ id }: { id: string }) {
    console.log(id);
    return (
        <>
            <Select disabled={id == "" ? true : false}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    {data.map((el) => {
                        return (
                            <SelectItem key={el.id} value={el.name}>
                                {el.name}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </>
    );
}
