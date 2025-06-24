export const MESES_NOMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export const ESTACOES = {
  1: "Verão",
  2: "Verão",
  3: "Outono",
  4: "Outono",
  5: "Outono",
  6: "Inverno",
  7: "Inverno",
  8: "Inverno",
  9: "Primavera",
  10: "Primavera",
  11: "Primavera",
  12: "Verão",
}

export function getMesAtual(): number {
  return new Date().getMonth() + 1 // getMonth() retorna 0-11, então +1 para 1-12
}

export function getNomeMesAtual(): string {
  const mesAtual = getMesAtual()
  return MESES_NOMES[mesAtual - 1]
}

export function getEstacaoAtual(): string {
  const mesAtual = getMesAtual()
  return ESTACOES[mesAtual as keyof typeof ESTACOES]
}
