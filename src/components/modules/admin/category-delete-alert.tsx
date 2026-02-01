import { deleteCategory } from "@/actions/admin.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";

export default function CategoryDeleteAlert({ category }: { category: any }) {
  const handleDelete = async (id: string) => {
    const toastID = toast.loading("Creating Category...");
    try {
      const res = await deleteCategory(id);
      console.log(res);

      toast.success("Category Deleted.", { id: toastID });
    } catch (err: any) {
      toast.error("Failed to delete category. Try later!", { id: toastID });
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            {" "}
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              category from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <X />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(category?.id)}>
              Continue, Delete <Trash2 />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
