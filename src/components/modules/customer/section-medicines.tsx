import { getAllMedicines } from "@/actions/user.actions";
import EmptyCard from "@/components/shared/empty-card";
import PaginationControl from "@/components/shared/pagination";
import ProductCard from "@/components/shared/productCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function SectionMedicines() {
  const { data } = await getAllMedicines({ limit: 9 });

  const medicines = data?.data?.data;

  return (
    <>
      <section className="w-full">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-3xl font-medium">Popular Medicines</h1>
          <Link href={"/shop"}>
            <Button>
              View More <ArrowRight />
            </Button>
          </Link>
          {/* <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="SortBy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="dark">Low</SelectItem>
                <SelectItem value="system">High</SelectItem>
                <SelectItem value="system">Created</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="SortOrder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">asc</SelectItem>
                <SelectItem value="dark">desc</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        {medicines?.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="grid lg:grid-cols-3 gap-5 w-full">
            {medicines?.map((med: any, idx: number) => (
              <ProductCard key={idx} data={med} />
            ))}
          </div>
        )}
        {/* <PaginationControl
          currentPage={1}
          totalPages={5}
          options={{ size: "icon" }}
        /> */}
      </section>
    </>
  );
}
