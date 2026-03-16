'use client'

import {useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import {AuthProvider} from '@/lib/auth/AuthContext'
import {StoreProvider} from "@/providers/StoreProvider";

export default function Providers({children}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StoreProvider>
          {children}
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}