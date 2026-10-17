import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";

export interface Article {
  id: string;
  title: string;
  instrument_ids: string[];
  published_at: string;
  first_seen_at: string;
  language: string;
  url: string | null;
}

export function useArticles(instrumentId: string | null) {
  const path =
    instrumentId === null
      ? "/api/v1/news/articles"
      : `/api/v1/news/articles?instrument_id=${encodeURIComponent(instrumentId)}`;
  return useQuery<Article[]>({
    queryKey: ["news", "articles", instrumentId],
    queryFn: () => apiFetch<Article[]>(path),
  });
}
