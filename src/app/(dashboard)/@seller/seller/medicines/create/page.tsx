import { getCategories } from "@/actions/admin.action";
import MedicineCategoryFrom from "@/components/modules/seller/medicine-create-from";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default async function AddMedicinePage() {
  const { data } = await getCategories({ limit: 20 });

  const categories = data?.data?.data;

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">New Medicine</h1>
          <p className="text-muted-foreground text-sm">
            Add a new product to your pharmacy listing.
          </p>
        </div>
        <Button
          variant="secondary"
          // onClick={() => router.back()}
        >
          <X className="size-4" /> Discard
        </Button>
      </div>

      <MedicineCategoryFrom categories={categories} />
    </div>
  );
}
