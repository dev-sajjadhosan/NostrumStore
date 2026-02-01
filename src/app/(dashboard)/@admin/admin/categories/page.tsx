import { Plus, LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";

import PaginationControl from "@/components/shared/pagination";
import CategoryCard from "@/components/shared/category-card";
import Link from "next/link";
import { AdminService } from "@/services/admin.service";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import EmptyCard from "@/components/shared/empty-card";

const categoriesData = [
  {
    id: 1,
    name: "Antibiotics",
    medicineCount: 142,
    status: "Active",
    description: "Bacterial infection treatments",
  },
  {
    id: 2,
    name: "Pain Relief",
    medicineCount: 89,
    status: "Active",
    description: "Analgesics and anti-inflammatory drugs",
  },
  {
    id: 3,
    name: "Psychotropic",
    medicineCount: 45,
    status: "Restricted",
    description: "Controlled substances for mental health",
  },
  {
    id: 4,
    name: "Herbal",
    medicineCount: 30,
    status: "Active",
    description: "Natural and plant-based supplements",
  },
  {
    id: 5,
    name: "Skincare",
    medicineCount: 67,
    status: "Active",
    description: "Dermatological products and ointments",
  },
  {
    id: 6,
    name: "Vaccines",
    medicineCount: 12,
    status: "Active",
    description: "Immunization and biologicals",
  },
];

export default async function CategoriesPage() {
  const { data } = await AdminService.getCategories();
  const categories = data?.data;
  console.log(categories);
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground w-xs">
          <LayoutGrid className="size-4" />
          <span>Showing {categories?.data?.length || 0} Categories</span>
        </div>
      </div>

      {categories?.data?.length == null || 0 ? (
        <EmptyCard />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.data?.map((category: any, idx: number) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
          <div className="mt-10">
            <PaginationControl
              currentPage={1}
              totalPages={6}
              options={{ size: "icon" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
