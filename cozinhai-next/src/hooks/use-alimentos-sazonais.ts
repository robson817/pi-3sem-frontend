"use client"

import { useMemo } from "react"
import { ALIMENTOS_SAZONAIS } from "@/types/alimentos-sazonais"
import { getMesAtual } from "@/utils/data-utils"

export function useAlimentosSazonais(mesSelecionado?: number) {
  const mesAtual = getMesAtual()
  const mes = mesSelecionado || mesAtual

  const alimentosDoMes = useMemo(() => {
    return ALIMENTOS_SAZONAIS.filter((alimento) => alimento.meses.includes(mes))
  }, [mes])

  return {
    alimentosDoMes,
    mesAtual,
  }
}
