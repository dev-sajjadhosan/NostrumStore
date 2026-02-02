import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchFilterBar from "../shared/search-filter-bar";
import { Filter } from "lucide-react";
import { useQueryFilters } from "@/hooks/use-search-filter";
export default function OrderSearchFilter() {
  const { status, setSingleFilter } = useQueryFilters();

  return (
    <>
      <div className="w-full flex items-center">
        <SearchFilterBar filter={false} />
        <div className="flex items-center gap-3">
          <Select
            value={status}
            onValueChange={(val) => {
                console.log(val);
                setSingleFilter("status", val)}}
          >
            <SelectTrigger className="w-40 rounded-full" >
              <Filter className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
