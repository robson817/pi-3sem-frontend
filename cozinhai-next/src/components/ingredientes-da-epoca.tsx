"use client"

import { useState } from "react"
import { MESES_NOMES, getMesAtual } from "@/utils/data-utils"
import IngredientCard from "./IngredientCard"
import { ALIMENTOS_SAZONAIS } from "@/types/alimentos-sazonais"

export default function IngredientesDaEpoca() {
  // Estado para controlar o mês selecionado (começa com o mês atual)
  const [mesSelecionado, setMesSelecionado] = useState<number>(getMesAtual())

  // Filtra os alimentos com base no mês selecionado
  const alimentosDoMes = ALIMENTOS_SAZONAIS.filter((alimento) => alimento.meses.includes(mesSelecionado))

  return (
    <div className="flex flex-col justify-center items-center gap-8 sm:gap-10 my-16 sm:my-24 px-4 w-full">
      <h1 className="text-[#22577A] font-bold text-xl sm:text-2xl text-center">Ingredientes da Época</h1>

      {/* Seletor de mês */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-white bg-[#22577A] rounded-3xl px-4 sm:px-6 py-2 text-center text-sm sm:text-base">
          Mês Selecionado: <strong>{MESES_NOMES[mesSelecionado - 1]}</strong>
        </p>

        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {MESES_NOMES.map((mes, index) => (
            <button
              key={mes}
              onClick={() => setMesSelecionado(index + 1)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                mesSelecionado === index + 1
                  ? "bg-[#22577A] text-white font-medium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {mes}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
        {alimentosDoMes.length > 0 ? (
          alimentosDoMes.map((alimento) => (
            <IngredientCard key={alimento.id} title={alimento.nome} slug={alimento.slug} />
          ))
        ) : (
          <p className="text-gray-500 text-center">Nenhum ingrediente sazonal encontrado para este mês.</p>
        )}
      </div>
    </div>
  )
}
