'use client'
import { useEffect, useMemo, useState } from 'react'
import UserCard from '@/components/UserCard'
import type { RandomUser } from '@/lib/types'
import { saveUser, getSavedUsers } from '@/lib/storage'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState<RandomUser[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    (async () => {
      const saved = await getSavedUsers()
      setSavedIds(new Set(saved.map(s => s.login.uuid)))
    })()
  }, [mounted])

  const resultsPerPage = 12

  async function load(p: number) {
    setLoading(true)
    try {
      const res = await fetch(`/api/random-users?page=${p}&results=${resultsPerPage}`)
      if (!res.ok) throw new Error('Users fetch failed')
      const data = await res.json()
      const list: RandomUser[] = data.results
      setUsers(prev => (p === 1 ? list : [...prev, ...list]))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) load(1)
  }, [mounted])

  async function onSave(u: RandomUser) {
    await saveUser(u)
    setSavedIds(prev => new Set(prev).add(u.login.uuid))
  }

  const grid = useMemo(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map(u => (
        <UserCard key={u.login.uuid} user={u} onSave={onSave} saved={savedIds.has(u.login.uuid)} />
      ))}
    </div>
  ), [users, savedIds])

  return (
    <section className="space-y-6">
      {mounted ? grid : <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" />}
      <div className="flex justify-center">
        <button
          className="btn btn-outline"
          disabled={!mounted || loading}
          onClick={() => { const np = page + 1; setPage(np); load(np) }}
        >
          {!mounted || loading ? 'Loading…' : 'Load more'}
        </button>
      </div>
    </section>
  )
}
