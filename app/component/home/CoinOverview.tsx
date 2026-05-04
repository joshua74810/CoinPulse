import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { formatUsd } from "@/lib/utils";

const CoinOverview = async () => {
  try {
    const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    });
  } catch (error) {
    console.error('Failed to load coin overview', error);
    return (
      <div id="coin-overview-error" className="coin-overview-error">
        <p>Unable to load coin overview right now.</p>
      </div>
    );
  }

    return (
      <div id="coin-overview">
        <div className="header">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />

          <div className="info">
            <p>
              {coin.name}/{coin.symbol.toUpperCase()}
            </p>
            <h1>{formatUsd(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </div>
    );
};

export default CoinOverview;