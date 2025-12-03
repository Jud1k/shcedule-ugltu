import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import React from 'react';
import { CalendarProvider } from '@/context/CalendarProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient({ defaultOptions: queryConfig });
  return (
    <QueryClientProvider client={queryClient}>
      <CalendarProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CalendarProvider>
    </QueryClientProvider>
  );
};
