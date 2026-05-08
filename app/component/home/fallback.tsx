import React from 'react';
import DataTable from '../DataTable';

/** Placeholder row shape for the trending table skeleton (DataTable needs stable keys). */
type TrendingFallbackRow = { id: string };

const TRENDING_FALLBACK_ROWS: TrendingFallbackRow[] = Array.from(
  { length: 6 },
  (_, i) => ({ id: `trending-fallback-${i}` })
);

/** Matches Categories rows shown (slice 0..10). */
type CategoriesFallbackRow = { id: string };

const CATEGORIES_FALLBACK_ROWS: CategoriesFallbackRow[] = Array.from(
  { length: 10 },
  (_, i) => ({ id: `categories-fallback-${i}` })
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

const categoriesFallbackColumns: DataTableColumn<CategoriesFallbackRow>[] = [
  {
    header: 'Category',
    cellClassName: 'category-cell',
    cell: () => (
      <div className="category-skeleton skeleton rounded-md animate-pulse" aria-hidden />
    ),
  },
  {
    header: 'Top Gainers',
    cellClassName: 'top-gainers-cell',
    cell: () => (
      <>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="coin-skeleton skeleton animate-pulse"
            aria-hidden
          />
        ))}
      </>
    ),
  },
  {
    header: '24h Change',
    cellClassName: 'change-header-cell',
    cell: () => (
      <div className="change-cell">
        <div className="change-icon skeleton animate-pulse" aria-hidden />
        <div className="value-skeleton-sm skeleton rounded-md animate-pulse" aria-hidden />
      </div>
    ),
  },
  {
    header: 'Market Cap',
    cellClassName: 'market-cap-cell',
    cell: () => (
      <div className="value-skeleton-md skeleton rounded-md animate-pulse" aria-hidden />
    ),
  },
  {
    header: '24h Volume',
    cellClassName: 'volume-cell',
    cell: () => (
      <div className="value-skeleton-lg skeleton rounded-md animate-pulse" aria-hidden />
    ),
  },
];

/**
 * Suspense fallback for Categories — mirrors #categories using #categories-fallback
 * rules in globals.css (table shell + skeleton placeholders).
 */
export function CategoriesFallback() {
  return (
    <div
      id="categories-fallback"
      className="custom-scrollbar"
      aria-busy="true"
      aria-label="Loading categories"
    >
      <h4>Top Categories</h4>
      <DataTable
        data={CATEGORIES_FALLBACK_ROWS}
        columns={categoriesFallbackColumns}
        rowKey={(row) => row.id}
        tableClassName="mt-3"
      />
    </div>
  );
}
