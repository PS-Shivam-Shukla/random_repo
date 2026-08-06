import React from 'react';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from './providers/ToastProvider';
import { AppRouter } from './routes';

export const App: React.FC = () => {
  return (
    <AppErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <AppRouter />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </AppErrorBoundary>
  );
};

export default App;
