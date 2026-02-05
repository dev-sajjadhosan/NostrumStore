import { getAllMedicines } from "@/actions/user.actions";
import ShopSearch from "@/components/modules/customer/shop-search";
import ShopCategoryTabs from "@/components/modules/shopPage/shop-categories";
import EmptyCard from "@/components/shared/empty-card";
import PaginationControl from "@/components/shared/pagination";
import ProductCard from "@/components/shared/productCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PgOptionsRs } from "@/types/types";
import { Loader, Search, Trash2 } from "lucide-react";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs>;
}) {
  const { page, search, sortBy, sortOrder } = await searchParams;
  const { data } = await getAllMedicines({ search, page, sortBy, sortOrder });

  const medicine = data?.data?.data;
  const pagination = data?.data?.pagination;

  return (
    <>
      <div className="w-11/12 flex flex-col gap-10 mx-auto">
        <ShopSearch />
        <ShopCategoryTabs />
        <section className="flex flex-col">
          {medicine?.length == 0 ? (
            <EmptyCard />
          ) : (
            <>
              <div className="my-16 grid lg:grid-cols-3 gap-3">
                {medicine?.map((med: any, idx: number) => (
                  <ProductCard key={idx} data={med} />
                ))}
              </div>
              <PaginationControl
                currentPage={pagination?.page}
                totalPages={pagination?.pages}
              />
            </>
          )}
        </section>
      </div>
    </>
  );
}
