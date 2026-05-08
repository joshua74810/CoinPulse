import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "@/app/component/DataTable";
import Image from "next/image";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";


const Categories = async () => {
    const categories = await fetcher<Category[]>("/coins/categories");

    const columns: DataTableColumn<Category>[] = [
        {header: "Category", cellClassName: "category-cell", cell: (category) =>
            category.name
        },
        {
            header: 'Top Gainers',
            cellClassName: 'top-gainers-cell',
            cell: (category) =>
                category.top_3_coins.map((coin) => (
                    <Image src={coin} alt={coin} key = {coin} width={28} height={28} />
                )),
        },
        {
            header: '24h Change',
            cellClassName: 'change-header-cell',
            cell: (category) => {
                const pct = category.market_cap_change_24h;
                const isTrendingUp = pct > 0;
      
                return (
                  <div
                    className={cn(
                      'change-cell000',
                      isTrendingUp ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    <p className="flex item-center  ">
                    {formatPercentage(category.market_cap_change_24h)}
                      {isTrendingUp ? (
                        <TrendingUp width={16} height={16} />
                      ) : (
                        <TrendingDown width={16} height={16} />
                      )}
                      
                    
                    </p>

                  </div>
                );
        },
    },

        {
            header: 'Market Cap',
            cellClassName: 'market-cap-cell',
            cell: (category) => formatCurrency(category.market_cap),
        },
        {
            header: '24h Volume',
            cellClassName: 'volume-cell',
            cell: (category) => formatCurrency(category.volume_24h_Volume),
        }
    ];
    return(
        <div id="categories" className="custom-scrollbar">
            <h4>Top Categories</h4>

            <DataTable columns={columns}
            data={categories?.slice(0, 10)}
              rowKey={(_, index) => index}
            tableClassName="mt-3"
            />
        </div>
    );
};

export default Categories;