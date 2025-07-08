import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const Queryprovider = ({children} : {children: React.ReactNode}) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 2 * 60 * 1000,
                refetchOnWindowFocus: false,
                retry: false
            }
        }
    });
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Queryprovider