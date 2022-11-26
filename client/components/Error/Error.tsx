import React from "react";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Unknown Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something is Wrong</h1>
          <p>{this.state.hasError}</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
