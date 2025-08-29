'use client'
import { useEffect, useState } from 'react'
import { getSavedUsers, removeUser, clearUsers } from '@/lib/storage'
import UserCard from '@/components/UserCard'
import type { RandomUser } from '@/lib/types'


export default function SavedPage() {
const [users, setUsers] = useState<RandomUser[]>([])
const [loading, setLoading] = useState(true)


async function refresh() {
setLoading(true)
const data = await getSavedUsers()
setUsers(data)
setLoading(false)
}


useEffect(() => { refresh() }, [])


return (
<section className="space-y-4">
<div className="flex justify-between items-center">
<h1 className="text-2xl font-semibold">Saved users</h1>
<button className="btn btn-outline" onClick={async () => { await clearUsers(); refresh() }}>Clear all</button>
</div>
{loading && <p>Loading…</p>}
{!loading && users.length === 0 && <p>No saved users yet.</p>}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
{users.map(u => (
<div key={u.login.uuid}>
<UserCard user={u} saved />
<div className="p-4 pt-0">
<button className="btn btn-outline" onClick={async () => { await removeUser(u.login.uuid); refresh() }}>Remove</button>
</div>
</div>
))}
</div>
</section>
)
}