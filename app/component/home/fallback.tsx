import React from 'react';
import DataTable from '../DataTable';

/** Placeholder row shape for the trending table skeleton (DataTable needs stable keys). */
type TrendingFallbackRow = { id: string };

const TRENDING_FALLBACK_ROWS: TrendingFallbackRow[] = Array.from(
  { length: 6 },
  (_, i) => ({ id: `trending-fallback-${i}` })
);

/**
 * Suspense fallback for CoinOverview — mirrors #coin-overview layout using
 * #coin-overview-fallback rules in globals.css (header + optional chart block).
 */
export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback" aria-busy="true" aria-label="Loading coin overview">
      <div className="header">
        <div className="header-image skeleton animate-pulse" aria-hidden />
        <div className="info">
          <div className="header-line-sm skeleton rounded-md animate-pulse" aria-hidden />
          <div className="header-line-lg skeleton rounded-md animate-pulse" aria-hidden />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton animate-pulse" aria-hidden />
      </div>
    </div>
  );
}

const trendingFallbackColumns: DataTableColumn<TrendingFallbackRow>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: () => (
      <div className="name-cell">
        <div className="name-link">
          <div className="name-image skeleton animate-pulse" aria-hidden />
          <div className="name-line skeleton rounded-md animate-pulse" aria-hidden />
        </div>
      </div>
    ),
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: () => (
      <div className="change-cell">
        <div className="price-change flex flex-col items-center gap-1">
          <div className="change-icon skeleton animate-pulse" aria-hidden />
          <div className="change-line skeleton rounded-md animate-pulse" aria-hidden />
        </div>
      </div>
    ),
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: () => (
      <div className="price-cell">
        <div className="price-line skeleton rounded-md animate-pulse" aria-hidden />
      </div>
    ),
  },
];

/**
 * Suspense fallback for TrendingCoins — same shell as #trending-coins but uses
 * #trending-coins-fallback so skeleton-specific rules apply.
 */
export function TrendingCoinsFallback() {
  return (
    <div id="trending-coins-fallback" aria-busy="true" aria-label="Loading trending coins">
      <h4>Trading Coins</h4>
      <div className="w-full">
        <DataTable
          data={TRENDING_FALLBACK_ROWS}
          columns={trendingFallbackColumns}
          rowKey={(row) => row.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
}
