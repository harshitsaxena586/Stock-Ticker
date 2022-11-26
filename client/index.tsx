import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/Error/Error";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
