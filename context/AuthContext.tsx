"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create the AuthContext
const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check if running in the client
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
            setLoading(false); // Finished checking for the token
        }
    }, []);

    useEffect(() => {
        if (!loading && !token) {
            router.push("/"); // Redirect to login if no token
        }
    }, [loading, token, router]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
            {/* Render children only when loading is complete */}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
