import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={containerStyle}>
          <h1 style={titleStyle}>문제가 발생했습니다</h1>
          <p style={messageStyle}>
            예상치 못한 오류가 발생했습니다. 페이지를 새로고침해 주세요.
          </p>
          <button
            type="button"
            style={buttonStyle}
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100dvh",
  padding: "2rem",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "0.5rem",
};

const messageStyle: React.CSSProperties = {
  color: "var(--color-text-muted)",
  marginBottom: "1.5rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "var(--color-accent)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--radius)",
  fontSize: "1rem",
};

export default ErrorBoundary;
