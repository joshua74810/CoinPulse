import { Suspense } from "react";
import CoinOverview from "@/app/component/home/CoinOverview";
import TrendingCoins from "@/app/component/home/TrendingCoins";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/app/component/home/fallback";

const page = async () => {
  return (
    <main className = "main-container">
      <section className = "home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
        <CoinOverview />
       </Suspense>

       <Suspense fallback={<TrendingCoinsFallback />}>
        <TrendingCoins />
        </Suspense>
        </section>

      <section className = "w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
      </main>
  );
};

export default page;