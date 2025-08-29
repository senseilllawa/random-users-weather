import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'


export const metadata: Metadata = {
title: 'Users & Weather',
description: 'Random users with weather by location'
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<Header />
<main className="container py-6">{children}</main>
</body>
</html>
)
}