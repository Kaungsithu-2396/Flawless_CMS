import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-8">
            <h1 className="font-bold text-xl">Home page customization</h1>
            {children}
        </div>
    );
}
