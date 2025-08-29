'use client'
import { useEffect, useRef } from 'react'


export default function WeatherModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
const ref = useRef<HTMLDialogElement>(null)
useEffect(() => {
const d = ref.current!
if (open && !d.open) d.showModal()
if (!open && d.open) d.close()
}, [open])
return (
<dialog ref={ref} className="rounded-2xl p-0 w-full max-w-lg backdrop:bg-black/40" onClose={onClose}>
<div className="p-4">
<div className="flex justify-between items-center mb-3">
<h3 className="text-lg font-semibold">Weather</h3>
<button className="btn btn-outline" onClick={onClose}>Close</button>
</div>
<div>{children}</div>
</div>
</dialog>
)
}