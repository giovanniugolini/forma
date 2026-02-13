import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { QuizScore } from '../types/quiz'
import type { Json } from '../lib/supabase/types'

// Tipo per i risultati dal database
interface QuizResultDB {
  id: string
  quiz_id: string
  user_id: string | null
  score: number
  max_score: number
  percentage: number
  answers: Json
  time_spent: number | null
  completed_at: string
}

// ============================================
// SALVATAGGIO RISULTATO
// ============================================

interface UseSaveQuizResultReturn {
  save: (params: {
    quizId: string
    score: QuizScore
    answers: Record<string, string | number | null>
    timeSpent?: number
  }) => Promise<QuizResultDB | null>
  loading: boolean
  error: string | null
}

export function useSaveQuizResult(): UseSaveQuizResultReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async ({
    quizId,
    score,
    answers,
    timeSpent
  }: {
    quizId: string
    score: QuizScore
    answers: Record<string, string | number | null>
    timeSpent?: number
  }): Promise<QuizResultDB | null> => {
    setLoading(true)
    setError(null)

    // Ottieni user corrente
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error: err } = await supabase
      .from('quiz_results')
      .insert({
        quiz_id: quizId,
        user_id: user?.id || null,
        score: score.totalPoints,
        max_score: score.maxPoints,
        answers: answers as unknown as Json,
        time_spent: timeSpent || null
      })
      .select()
      .single()

    setLoading(false)

    if (err) {
      setError(err.message)
      return null
    }

    return data
  }

  return { save, loading, error }
}

// ============================================
// CRONOLOGIA RISULTATI UTENTE
// ============================================

interface UseUserQuizResultsReturn {
  results: QuizResultDB[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useUserQuizResults(userId: string | undefined): UseUserQuizResultsReturn {
  const [results, setResults] = useState<QuizResultDB[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResults = useCallback(async () => {
    if (!userId) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (err) {
      setError(err.message)
      setResults([])
    } else {
      setResults(data || [])
    }

    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  return { results, loading, error, refetch: fetchResults }
}

// ============================================
// STATISTICHE QUIZ UTENTE
// ============================================

interface QuizStats {
  totalQuizzes: number
  totalCorrect: number
  totalQuestions: number
  averagePercentage: number
  bestPercentage: number
  worstPercentage: number
}

export function useQuizStats(userId: string | undefined): {
  stats: QuizStats | null
  loading: boolean
} {
  const { results, loading } = useUserQuizResults(userId)

  const stats: QuizStats | null = results.length > 0 ? {
    totalQuizzes: results.length,
    totalCorrect: results.reduce((sum, r) => sum + r.score, 0),
    totalQuestions: results.reduce((sum, r) => sum + r.max_score, 0),
    averagePercentage: Math.round(
      results.reduce((sum, r) => sum + r.percentage, 0) / results.length
    ),
    bestPercentage: Math.max(...results.map(r => r.percentage)),
    worstPercentage: Math.min(...results.map(r => r.percentage))
  } : null

  return { stats, loading }
}

// ============================================
// RISULTATI PER QUIZ SPECIFICO
// ============================================

export function useQuizResultsByQuiz(quizId: string | undefined): UseUserQuizResultsReturn {
  const [results, setResults] = useState<QuizResultDB[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResults = useCallback(async () => {
    if (!quizId) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('quiz_id', quizId)
      .order('completed_at', { ascending: false })

    if (err) {
      setError(err.message)
      setResults([])
    } else {
      setResults(data || [])
    }

    setLoading(false)
  }, [quizId])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  return { results, loading, error, refetch: fetchResults }
}
