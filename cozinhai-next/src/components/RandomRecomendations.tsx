'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import RecomendacaoCard from './RecomendacaoCard'

type RandomRecommendationsProps = {
  number?: number
  title?: string
}

type SpoonRecipe = {
  id: number
  title: string
  image: string
}

export default function RandomRecommendations({
  number = 3,
  title = 'Recomendações Diárias',
}: RandomRecommendationsProps) {
  const [recipes, setRecipes] = useState<SpoonRecipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRandom() {
      try {
        const res = await axios.get<{ recipes: SpoonRecipe[] }>(
          'https://api.spoonacular.com/recipes/random',
          {
            params: {
              apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
              number,
            },
          }
        )
        setRecipes(res.data.recipes)
      } catch (err) {
        console.error('Erro ao buscar receitas aleatórias:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRandom()
  }, [number])

  return (
    <section className="p-4">
      <h2 className="text-[#22577A] font-bold text-xl sm:text-2xl text-center mb-4">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {loading
          ? Array.from({ length: number }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-3xl w-[180px] h-[240px] animate-pulse"
              />
            ))
          : recipes.map((r) => (
              <RecomendacaoCard
                key={r.id}
                image={r.image}
                title={r.title}
                slug={String(r.id)}
              />
            ))}
      </div>
    </section>
  )
}
