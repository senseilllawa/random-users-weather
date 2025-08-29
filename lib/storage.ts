'use client'
import { get, set, del } from 'idb-keyval'
import type { RandomUser } from './types'


const KEY = 'saved_users_v1'


export async function getSavedUsers(): Promise<RandomUser[]> {
return (await get(KEY)) ?? []
}
export async function saveUser(u: RandomUser) {
const list = await getSavedUsers()
const exists = list.some(x => x.login.uuid === u.login.uuid)
if (!exists) {
list.push(u)
await set(KEY, list)
}
}


export async function removeUser(id: string) {
const list = await getSavedUsers()
const next = list.filter(x => x.login.uuid !== id)
await set(KEY, next)
}


export async function clearUsers() {
await del(KEY)
}