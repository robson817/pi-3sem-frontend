"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"

export default function LoginPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

    const validateEmail = (email: string) => {
        if (!email) return "Email não pode ser vazio"
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(email)) return "Email inválido"
        return ""
    }

    const validatePassword = (password: string) => {
        if (!password) return "Senha não pode ser vazia"
        return ""
    }

    // Validações de senha em tempo real
    const passwordRequirements = [
        { id: "length", label: "Mínimo de 8 caracteres", test: (p: string) => p.length >= 8 },
        { id: "uppercase", label: "Letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
        { id: "lowercase", label: "Letra minúscula", test: (p: string) => /[a-z]/.test(p) },
        { id: "number", label: "Número", test: (p: string) => /\d/.test(p) },
        { id: "special", label: "Caractere especial (!@#$%^&*)", test: (p: string) => /[!@#$%^&*]/.test(p) },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validação básica para o login
        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)

        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError,
            })
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            await login(email, password)
            router.push("/home")
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : "Usuário ou senha inválidos",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EDF2F4] via-white to-[#EDF2F4] flex flex-col items-center justify-center p-4">
            {/* Background decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#57CC99]/20 to-[#22577A]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#22577A]/20 to-[#57CC99]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <Link href="/home" className="inline-block hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/images/fullLogo.svg"
                            alt="CozinhAI Logo"
                            width={160}
                            height={80}
                            className="mx-auto mb-6"
                            priority
                        />
                    </Link>
                    <h1
                        className="text-4xl font-bold bg-gradient-to-r from-[#22577A] to-[#57CC99] bg-clip-text text-transparent mb-3"
                        style={{ fontFamily: "DaCherry" }}
                    >
                        Bem-vindo de volta!
                    </h1>
                    <p className="text-gray-600 text-lg" style={{ fontFamily: "Alexandria" }}>
                        Acesse sua conta para salvar suas receitas favoritas
                    </p>
                </div>

                {/* Card principal */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-6">
                    {errors.general && (
                        <div className="bg-red-50/80 backdrop-blur border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 animate-in slide-in-from-top duration-300">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-[#22577A]"
                                style={{ fontFamily: "Alexandria" }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 border-2 rounded-2xl bg-white/50 backdrop-blur focus:ring-2 focus:ring-[#57CC99] focus:border-[#57CC99] transition-all duration-300 ${errors.email ? "border-red-400" : "border-gray-200 hover:border-[#57CC99]/50"
                                    }`}
                                placeholder="seu@email.com"
                                style={{ fontFamily: "Alexandria" }}
                            />
                            {errors.email && (
                                <p
                                    className="text-sm text-red-600 animate-in slide-in-from-left duration-300"
                                    style={{ fontFamily: "Alexandria" }}
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-[#22577A]"
                                style={{ fontFamily: "Alexandria" }}
                            >
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setShowPasswordRequirements(true)}
                                    onBlur={() => setShowPasswordRequirements(false)}
                                    className={`w-full px-4 py-3 pr-12 border-2 rounded-2xl bg-white/50 backdrop-blur focus:ring-2 focus:ring-[#57CC99] focus:border-[#57CC99] transition-all duration-300 ${errors.password ? "border-red-400" : "border-gray-200 hover:border-[#57CC99]/50"
                                        }`}
                                    placeholder="••••••••"
                                    style={{ fontFamily: "Alexandria" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#22577A] transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p
                                    className="text-sm text-red-600 animate-in slide-in-from-left duration-300"
                                    style={{ fontFamily: "Alexandria" }}
                                >
                                    {errors.password}
                                </p>
                            )}

                            {/* Feedback em tempo real dos requisitos da senha */}
                            {showPasswordRequirements && password && (
                                <div className="mt-4 p-4 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur rounded-2xl border border-gray-200/50 animate-in slide-in-from-top duration-300">
                                    <p className="text-sm font-semibold text-[#22577A] mb-3" style={{ fontFamily: "Alexandria" }}>
                                        Requisitos da senha:
                                    </p>
                                    <ul className="space-y-2">
                                        {passwordRequirements.map((req) => (
                                            <li key={req.id} className="flex items-center text-sm transition-all duration-200">
                                                <div className={`mr-3 p-1 rounded-full ${req.test(password) ? "bg-green-100" : "bg-gray-100"}`}>
                                                    {req.test(password) ? (
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-gray-400" />
                                                    )}
                                                </div>
                                                <span
                                                    className={req.test(password) ? "text-green-700 font-medium" : "text-gray-500"}
                                                    style={{ fontFamily: "Alexandria" }}
                                                >
                                                    {req.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#22577A] focus:ring-[#57CC99] border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-3 block text-sm text-gray-700"
                                    style={{ fontFamily: "Alexandria" }}
                                >
                                    Lembrar-me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-[#22577A] hover:text-[#57CC99] transition-colors duration-200"
                                    style={{ fontFamily: "Alexandria" }}
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-[#22577A] to-[#57CC99] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#57CC99]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            style={{ fontFamily: "Alexandria" }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Entrando...
                                </div>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </form>
                </div>

                {/* Links de navegação */}
                <div className="text-center space-y-4">
                    <Link
                        href="/home"
                        className="block text-gray-600 hover:text-[#22577A] transition-colors duration-200 font-medium"
                        style={{ fontFamily: "Alexandria" }}
                    >
                        Continuar sem fazer login →
                    </Link>

                    <p className="text-gray-600" style={{ fontFamily: "Alexandria" }}>
                        Não tem uma conta?{" "}
                        <Link
                            href="/cadastro"
                            className="font-semibold text-[#22577A] hover:text-[#57CC99] transition-colors duration-200"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
