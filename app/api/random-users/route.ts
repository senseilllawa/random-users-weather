import { NextResponse } from 'next/server'


export async function GET(req: Request) {
const { searchParams } = new URL(req.url)
const seed = process.env.RANDOMUSER_SEED ?? 'demo-seed'
const results = searchParams.get('results') ?? '12'
const page = searchParams.get('page') ?? '1'
const url = `https://randomuser.me/api/?seed=${encodeURIComponent(seed)}&results=${results}&page=${page}`


const r = await fetch(url, { next: { revalidate: 60 } })
const data = await r.json()
return NextResponse.json(data)
}