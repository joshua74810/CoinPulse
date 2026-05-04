import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatUsd } from '@/lib/utils';
import { fetcher } from '@/lib/coingecko.actions';
import DataTable from '../DataTable';

const TrendingCoins = async () => {
  let trendingCoins;
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      '/search/trending',
      undefined,
      300
    );
    } catch (error) {
    console.error('Failed to load trending coins', error);
    return (
      <div id="trending-coins-error" className="trending-coins-error">
        <h4>Trading Coins</h4>
        <p>Unable to load trending coins right now.</p>
      </div>
    );
  }

    const columns: DataTableColumn<TrendingCoin>[] = [
      {
        header: 'Name',
        cellClassName: 'name-cell',
        cell: (coin) => {
          const item = coin.item;
          return (
            <Link href={`/coins/${item.id}`}>
              <Image
                src={item.large}
                alt={item.name}
                width={36}
                height={36}
                unoptimized
              />
              <p>{item.name}</p>
            </Link>
          );
        },
      },
      {
        header: '24h Change',
        cellClassName: 'name-cell',
        cell: (coin) => {
          const item = coin.item;
          const pct = item.data.price_change_percentage_24h.usd;
          const isTrendingUp = pct > 0;

          return (
            <div
              className={cn(
                'price-change flex flex-col items-center gap-1',
                isTrendingUp ? 'text-green-500' : 'text-red-500'
              )}
            >
              <p className="flex items-center justify-center">
                {isTrendingUp ? (
                  <TrendingUp width={16} height={16} />
                ) : (
                  <TrendingDown width={16} height={16} />
                )}
              </p>
              <p className="text-xs tabular-nums leading-none">
                {pct >= 0 ? '+' : ''}
                {pct.toFixed(2)}%
              </p>
            </div>
          );
        },
      },
      {
        header: 'Price',
        cellClassName: 'price-cell',
        cell: (coin) => formatUsd(coin.item.data.price),
      },
    ];

    return (
      <div id="trending-coins">
        <h4> Trading Coins</h4>
        <DataTable
          data={trendingCoins?.coins .slice(0, 6) || []}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;