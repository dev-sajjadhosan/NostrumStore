import { getCategories, singleMedicineData } from "@/actions/admin.action";
import MedicineCategoryFrom from "@/components/modules/seller/medicine-create-from";
import MedicineUpdateForm from "@/components/modules/seller/medicine-update-from";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default async function MedicineUpdatePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  const { data } = await getCategories({ limit: 20 });
  const { data: currentData } = await singleMedicineData(id);

  console.log(currentData);
  const categories = data?.data?.data;
  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">
            Update Medicine
          </h1>
          <p className="text-muted-foreground text-sm">
            Update your product from pharmacy listing.
          </p>
        </div>
        <Button
          variant="secondary"
          // onClick={() => router.back()}
        >
          <X className="size-4" /> Discard
        </Button>
      </div>

      <MedicineUpdateForm categories={categories} currentData={currentData?.data} />
    </div>
  );
}
