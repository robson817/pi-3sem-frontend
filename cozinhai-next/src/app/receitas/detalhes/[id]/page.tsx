'use client'

import { useEffect, useState, useMemo } from 'react' // Importe useMemo
import { useAuth } from '@/components/auth/auth-context'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import axios from 'axios'
import { Star } from 'lucide-react'
import Link from 'next/link'; // Importe Link do next/link

interface Ingredient {
  id: number
  amount: number
}

export default async function ReceitaPage({ params }: { params: { id: string } }) {
  const idReceita = params.id;
  const chaveApi = "d9e89aa107a2446ea222d9c3004ad5ed"; // ligar no .env
  const fetchUrl = `https://api.spoonacular.com/recipes/${idReceita}/information?apiKey=${chaveApi}`;

  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error("Erro ao buscar as receitas");
  }

  const data = await response.json();


  if (data) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />

        <main className="flex flex-col items-center px-6 py-12 gap-8">
          <Image
            src="/images/fullLogo.svg"
            alt="Logo Cozinhaí"
            className="mt-[6rem]"
            width={256}
            height={256}

          />
          <Link href='/receitas' className="strong">{"< Voltar"}</Link>

        <h1 className="text-[#22577A] font-bold text-3xl text-center">{data.title}</h1>

        <Image
          src={data.image}
          alt={data.title}
          width={300}
          height={200}
          className="rounded-2xl border-2 border-[#22577A]"
        />

        <div className="text-[#22577A] text-lg font-medium w-full max-w-2xl flex flex-col gap-3">
          <p><strong>Serve:</strong> {data.servings}</p>
          <p><strong>Tempo de preparo:</strong> {data.readyInMinutes} minutos</p>
        </div>

        <div className="w-full max-w-2xl">
          <h3 className="text-[#22577A] font-bold text-xl mt-6 mb-2">Ingredientes:</h3>
          <ul className="list-disc list-inside text-[#22577A] text-lg font-medium">
            {data.extendedIngredients.map((ing: Ingredient) => (
              <li key={ing.id}>{ing.amount} {ing.unit} {ing.name}</li>
            ))}
          </ul>

          <h3 className="text-[#22577A] font-bold text-xl mt-6 mb-2">Modo de preparo:</h3>
          <div
            className="text-[#22577A] text-lg font-medium whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: data.instructions }}
          />

          <h3 className="text-[#22577A] font-bold text-xl mt-6 mb-2">Avaliações:</h3>
          {reviews.length === 0 ? (
            <p className="text-[#22577A]">Nenhuma avaliação encontrada.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((rev, i) => (
                <li key={i} className="border-b border-gray-200 pb-2">
                  <p className="text-[#22577A] font-medium">Nota: {rev.grade}/5</p>
                  <p className="text-[#22577A]">{rev.comment}</p>
                  {/* ESTE COMPONENTE ESTAVA FALTANDO */}
                  <Stars grade={rev.grade} />
                </li>
              ))}
            </ul>
          )}

          {/* RENDERIZA O FORMULÁRIO APENAS SE AUTENTICADO E AINDA NÃO AVALIOU */}
          {isAuthenticated && !hasUserReviewed ? (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-[#22577A]">Deixe sua avaliação</h4>
              <label className="text-[#22577A] font-medium">
                Nota: {grade}/5
                <StarsEdit grade={grade} onChange={setGrade} />
              </label>
              <textarea
                placeholder="Deixe um comentário..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#22577A] text-white px-4 py-2 rounded hover:bg-[#19495d]"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          ) : (
            // Mensagem se o usuário já avaliou OU não está autenticado
            isAuthenticated && hasUserReviewed && (
              <p className="mt-6 text-[#22577A] font-medium">
                Você já avaliou esta receita.{' '}
                Para editar sua avaliação, acesse <Link href="/avaliacoes" className="text-blue-600 underline hover:text-blue-800">suas avaliações</Link>.
              </p>
            )
          )}
          {/* Se não estiver autenticado e a receita ainda não foi avaliada, não exibe o formulário nem a mensagem de "já avaliou" */}
          {!isAuthenticated && (
             <p className="mt-6 text-[#22577A] font-medium">
                Faça login para avaliar esta receita.
             </p>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}