'use client'
import { useEffect, useMemo, useState } from 'react'
import WeatherModal from './WeatherModal'
import type { RandomUser, WeatherSummary } from '@/lib/types'

function pickIcon(code: number): string {
  if ([0].includes(code)) return '☀️'
  if ([1, 2].includes(code)) return '🌤️'
  if ([3].includes(code)) return '☁️'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55, 56, 57].includes(code)) return '🌦️'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '🌡️'
}

export default function UserCard({
  user,
  onSave,
  saved
}: {
  user: RandomUser
  onSave?: (u: RandomUser) => void
  saved?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState<WeatherSummary | null>(null)
  const [refreshTick, setRefreshTick] = useState(0)

  const coords = useMemo(
    () => ({
      lat: parseFloat(user.location.coordinates.latitude),
      lon: parseFloat(user.location.coordinates.longitude)
    }),
    [user]
  )

  async function fetchWeather() {
    setLoading(true)
    try {
      const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`)
      if (!res.ok) throw new Error('Weather fetch failed')
      const data = await res.json()
      const current = data.current_weather?.temperature ?? 0
      const code = data.current_weather?.weathercode ?? 0

      let min = current
      let max = current
      if (data.daily?.temperature_2m_min?.length) {
        min = data.daily.temperature_2m_min[0]
      }
      if (data.daily?.temperature_2m_max?.length) {
        max = data.daily.temperature_2m_max[0]
      }

      const w: WeatherSummary = { icon: pickIcon(code), current, min, max }
      setWeather(w)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const id = setInterval(() => setRefreshTick((t) => t + 1), 5 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (open) {
      fetchWeather()
    }
  }, [open, refreshTick]) 

  const name = `${user.name.first} ${user.name.last}`
  const loc = `${user.location.city}, ${user.location.state}, ${user.location.country}`

  return (
    <div className="card">
      <div className="p-4 flex gap-4">
        <img
          src={user.picture.large}
          alt={name}
          className="size-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="badge">{user.gender}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{loc}</p>
          <a
            className="text-sm text-blue-600 hover:underline"
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
          <div className="flex gap-2 mt-3">
            {onSave && !saved && (
              <button className="btn btn-primary" onClick={() => onSave(user)}>
                Save
              </button>
            )}
            <button
              className="btn btn-outline"
              onClick={() => {
                setOpen(true)
                fetchWeather()
              }}
            >
              Weather
            </button>
          </div>
        </div>
      </div>

      {weather && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-xl">{weather.icon}</span>
            <span>
              Now: <b>{Math.round(weather.current)}°C</b>
            </span>
            <span className="text-slate-600">
              Low: {Math.round(weather.min)}°C
            </span>
            <span className="text-slate-600">
              High: {Math.round(weather.max)}°C
            </span>
          </div>
        </div>
      )}

      <WeatherModal open={open} onClose={() => setOpen(false)}>
        {loading && <p className="text-sm">Loading weather…</p>}
        {weather && (
          <div className="flex items-center gap-4">
            <div className="text-5xl">{weather.icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {Math.round(weather.current)}°C
              </div>
              <div className="text-sm text-slate-600">
                Low {Math.round(weather.min)}°C · High {Math.round(weather.max)}°C
              </div>
            </div>
          </div>
        )}
      </WeatherModal>
    </div>
  )
}
