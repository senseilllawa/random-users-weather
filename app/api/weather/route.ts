import { NextResponse } from 'next/server'


export async function GET(req: Request) {
const { searchParams } = new URL(req.url)
const lat = searchParams.get('lat')
const lon = searchParams.get('lon')
if (!lat || !lon) return NextResponse.json({ error: 'lat & lon required' }, { status: 400 })


const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current_weather=true&daily=temperature_2m_min,temperature_2m_max&timezone=auto`


const r = await fetch(url, { next: { revalidate: 120 } })
const data = await r.json()
return NextResponse.json(data)
}