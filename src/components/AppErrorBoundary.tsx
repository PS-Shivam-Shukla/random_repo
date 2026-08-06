import { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AppErrorBoundary caught an unhandled UI error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-100 selection:bg-indigo-500 selection:text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-800/50 shadow-2xl mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-xs text-slate-400 max-w-md mt-1 mb-6">
            An unexpected error occurred in the React component tree. You can reload the page or attempt to reset application state.
          </p>

          {this.state.error && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-rose-300 max-w-lg overflow-x-auto mb-6">
              {this.state.error.message}
            </div>
          )}

          <Button onClick={this.handleReset} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
