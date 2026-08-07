import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../button/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center bg-neutral-900 border border-neutral-800 rounded-2xl m-4">
          <div className="rounded-full bg-red-500/10 p-4 text-red-400 mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="max-w-md text-sm text-neutral-400 mb-6">
            An unexpected application error occurred. Please try reloading the
            page.
          </p>
          <Button
            onClick={this.handleReload}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            variant="outline"
          >
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
