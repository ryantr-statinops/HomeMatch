export interface Holding {
  id: string;
  instrument_id: string;
  amount: string; // decimal string
  avg_cost: string; // USDT per unit, decimal string
}

export interface PortfolioState {
  holdings: Holding[];
  updatedAt: string | null;
}
