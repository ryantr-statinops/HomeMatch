import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { MarketPage } from "./features/market/MarketPage";
import { PortfolioPage } from "./features/portfolio/PortfolioPage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/terminal/news" replace />} />
        <Route path="/terminal/market" element={<MarketPage />} />
        <Route path="/terminal/news" element={<App />} />
        <Route path="/terminal/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<Navigate to="/terminal/news" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);