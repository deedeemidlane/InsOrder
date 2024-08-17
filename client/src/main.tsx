import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
);
