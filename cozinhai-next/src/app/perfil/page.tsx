"use client"

import { useAuth } from "@/components/auth/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Pencil, Lock, Trash2, CheckCircle, XCircle } from "lucide-react"

export default function PerfilPage() {
    const { user, isAuthenticated, setUser, isLoading } = useAuth()
    const router = useRouter()

    const [showNameModal, setShowNameModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [showDeactivateModal, setShowDeactivateModal] = useState(false)

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newName, setNewName] = useState(user?.name || "")
    const [feedback, setFeedback] = useState("")
    const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">("")

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pi-3sem-backend.onrender.com"

    useEffect(() => {
        setNewName(user?.name || "")
    }, [user])

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/home/login")
        }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#EDF2F4] via-white to-[#EDF2F4] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#22577A]/30 border-t-[#22577A] rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    const handleUpdateName = async () => {
        if (!newName.trim()) {
            setFeedback("O nome é obrigatório")
            setFeedbackType("error")
            return
        }
        if (newName.length < 3 || newName.length > 30) {
            setFeedback("O nome deve ter entre 3 e 30 caracteres")
            setFeedbackType("error")
            return
        }

        try {
            const res = await fetch(`${API_URL}/user/${user?.id}/name`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name: newName }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || "Erro ao atualizar nome")
            }

            const updatedUser = { ...user!, name: newName }
            setUser(updatedUser)
            localStorage.setItem("user", JSON.stringify(updatedUser))
            setFeedback("Nome atualizado com sucesso")
            setFeedbackType("success")
            setShowNameModal(false)
        } catch (error) {
            setFeedback((error as Error).message)
            setFeedbackType("error")
        }
    }

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            setFeedback("Preencha todos os campos")
            setFeedbackType("error")
            return
        }

        try {
            const res = await fetch(`${API_URL}/user/${user?.id}/password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || "Erro ao alterar senha")
            }

            setFeedback("Senha alterada com sucesso")
            setFeedbackType("success")
            setShowPasswordModal(false)
            setCurrentPassword("")
            setNewPassword("")
        } catch (error) {
            setFeedback((error as Error).message)
            setFeedbackType("error")
        }
    }

    const handleDeactivateAccount = async () => {
        try {
            const res = await fetch(`${API_URL}/user/${user?.id}/deactivate`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || "Erro ao desativar conta")
            }

            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUser(null)

            window.location.href = "/";
        } catch (error) {
            setFeedback((error as Error).message)
            setFeedbackType("error")
            setShowDeactivateModal(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EDF2F4] via-white to-[#EDF2F4] pt-20 pb-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#57CC99]/20 to-[#22577A]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#22577A]/20 to-[#57CC99]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-2xl mx-auto px-4 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/home" className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors duration-200">
                        <ArrowLeft className="w-5 h-5 text-[#22577A]" />
                    </Link>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#22577A] to-[#57CC99] bg-clip-text text-transparent" style={{ fontFamily: "DaCherry" }}>
                        Meu Perfil
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-6">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 bg-gradient-to-r from-[#22577A] to-[#57CC99] rounded-full flex items-center justify-center mb-4">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#22577A] mb-2" style={{ fontFamily: "Alexandria" }}>
                            {user?.name}
                        </h2>
                        <p className="text-gray-600" style={{ fontFamily: "Alexandria" }}>
                            {user?.email}
                        </p>
                    </div>

                    {feedback && (
                        <div className={`flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm font-semibold ${feedbackType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {feedbackType === "success" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {feedback}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        <button onClick={() => setShowNameModal(true)} className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur border border-[#22577A]/20 text-[#22577A] font-semibold px-4 py-3 rounded-2xl shadow hover:bg-[#EDF2F4] hover:scale-[1.02] transition-transform duration-200" style={{ fontFamily: "Alexandria" }}>
                            <Pencil className="w-5 h-5" /> Editar Nome
                        </button>
                        <button onClick={() => setShowPasswordModal(true)} className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur border border-[#22577A]/20 text-[#22577A] font-semibold px-4 py-3 rounded-2xl shadow hover:bg-[#EDF2F4] hover:scale-[1.02] transition-transform duration-200" style={{ fontFamily: "Alexandria" }}>
                            <Lock className="w-5 h-5" /> Alterar Senha
                        </button>
                        <button onClick={() => setShowDeactivateModal(true)} className="flex items-center justify-center gap-2 bg-red-100 text-red-700 font-semibold px-4 py-3 rounded-2xl shadow hover:bg-red-200 hover:scale-[1.02] transition-transform duration-200" style={{ fontFamily: "Alexandria" }}>
                            <Trash2 className="w-5 h-5" /> Desativar Conta
                        </button>
                    </div>

                    {/* Modal Editar Nome */}
                    {showNameModal && (
                        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
                                <h2 className="text-lg font-semibold text-[#22577A] mb-4">Editar Nome</h2>
                                <input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#57CC99]"
                                />
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowNameModal(false)} className="text-sm text-gray-500 hover:underline">Cancelar</button>
                                    <button onClick={handleUpdateName} className="bg-[#57CC99] hover:bg-[#45b587] text-white px-4 py-2 rounded shadow hover:shadow-md transition duration-200">
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal Alterar Senha */}
                    {showPasswordModal && (
                        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
                                <h2 className="text-lg font-semibold text-[#22577A] mb-4">Alterar Senha</h2>
                                <input
                                    type="password"
                                    placeholder="Senha atual"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#57CC99]"
                                />
                                <input
                                    type="password"
                                    placeholder="Nova senha"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#57CC99]"
                                />
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowPasswordModal(false)} className="text-sm text-gray-500 hover:underline">Cancelar</button>
                                    <button onClick={handleChangePassword} className="bg-[#57CC99] hover:bg-[#45b587] text-white px-4 py-2 rounded shadow hover:shadow-md transition duration-200">
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal Desativar Conta */}
                    {showDeactivateModal && (
                        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
                                <h2 className="text-lg font-semibold text-red-600 mb-4">Desativar Conta</h2>
                                <p className="text-gray-700 mb-4">Tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.</p>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowDeactivateModal(false)} className="text-sm text-gray-500 hover:underline">Cancelar</button>
                                    <button onClick={handleDeactivateAccount} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow hover:shadow-md transition duration-200">
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
