"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Verificar se há um token no localStorage
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")

            if (token) {
                const savedUser = localStorage.getItem("user")
                if (savedUser) {
                    setUser(JSON.parse(savedUser))
                }
            }

            setIsLoading(false)
        }
    }, [])

    const login = async (email: string, password: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "https://pi-3sem-backend.onrender.com"}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Falha na autenticação");
        }

        const jwt = data.access_token.access_token;
        const userObj = data.user;

        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
    };


    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
