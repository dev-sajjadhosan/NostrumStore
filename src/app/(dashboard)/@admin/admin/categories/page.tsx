

import { Plus, LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";

import PaginationControl from "@/components/shared/pagination";
import CategoryCard from "@/components/shared/category-card";
import Link from "next/link";
import { AdminService } from "@/services/admin.service";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import EmptyCard from "@/components/shared/empty-card";
import { PgOptionsRs } from "@/types/types";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs>;
}) {
  const { page, search, status } = await searchParams;
  const { data } = await AdminService.getCategories({ page, search, status });
  const categories = data?.data?.data;
  const pagination = data?.data?.pagination;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Categories
          </h1>
          <p className="text-muted-foreground">
            Manage the global classification system for all listings.
          </p>
        </div>
        <Link href={"categories/create"}>
          <Button className="gap-2 bg-primary">
            <Plus className="size-4" /> Create Category
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchFilterBar filter={false} />
        <div className="flex items-center gap-2 text-md text-center text-muted-foreground w-xs mx-auto">
          <LayoutGrid className="size-4" />
          <span>Showing {categories?.length || 0} Categories</span>
        </div>
      </div>

      {categories?.length == 0 ? (
        <EmptyCard />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.map((category: any, idx: number) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
          <div className="mt-10">
            <PaginationControl
              currentPage={pagination?.page}
              totalPages={pagination?.pages}
              options={{ size: "icon" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
