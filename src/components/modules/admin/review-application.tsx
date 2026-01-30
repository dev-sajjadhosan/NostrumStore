import {
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink,
  ShieldCheck,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { TooltipButton } from "@/components/ui/tooltip-button";
export default function ReviewApplication({
  seller,
  setSelectedSeller,
}: {
  seller: any;
  setSelectedSeller: (v: string) => void;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TooltipButton
            icon={Eye}
            title="Review Application"
            onClick={() => setSelectedSeller(seller)}
          />
        </DialogTrigger>
        <DialogContent className="max-w-3xl!">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck /> Verify {seller.shopName}
            </DialogTitle>
            <DialogDescription>
              Please cross-check the drug administration license with the
              national database.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Business Info</h4>
              <div className="text-sm">
                <p className="text-muted-foreground">Owner Name:</p>
                <p className="font-medium">{seller.owner}</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Drug License:</p>
                <p className="font-mono bg-muted p-1 rounded inline-block">
                  {seller.licenseNo}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Documents</h4>
              <Button
                variant="secondary"
                className="w-full justify-start h-15"
              >
                <FileText className="size-4" /> Drug_License_Scan.pdf{" "}
                <ExternalLink className="size-4 ml-auto" />
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start h-15"
              >
                <FileText className="size-4" /> Trade_License.pdf{" "}
                <ExternalLink className="size-4 ml-auto" />
              </Button>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between w-full border-t pt-4">
            <Button variant="secondary" className="h-13">
              <XCircle className="size-4" /> Reject Request
            </Button>
            <Button className="h-13">
              <CheckCircle className="size-4" /> Approve Seller
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
