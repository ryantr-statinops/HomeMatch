import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { MarketPage } from "./features/market/MarketPage";
import { NewsPage } from "./features/news/NewsPage";
import { PortfolioPage } from "./features/portfolio/PortfolioPage";
import { queryClient } from "./lib/queryClient";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/terminal/news" replace />} />
          <Route path="/terminal/market" element={<MarketPage />} />
          <Route path="/terminal/news" element={<NewsPage />} />
          <Route path="/terminal/portfolio" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/terminal/news" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);