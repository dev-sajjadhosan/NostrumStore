"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortBy = ["name", "group", "price", "genericName", "createdAt", "updatedAt"];
const sortOrder = ["desc", "asc"];

export default function ShopSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const [localSearch, setLocalSearch] = useState(query);
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setLocalSearch(query);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateUrl("search", localSearch);
    }
  };

  return (
    <>
      <Card className="w-full h-100">
        <CardContent className="h-full flex flex-col gap-3 items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-center">
            Precision Care, <b>Delivered</b> to Your Door.
          </h1>
          <p className="text-lg text-muted-foreground tracking-wide max-w-2xl text-center">
            Search our curated collection of verified pharmaceuticals and
            wellness essentials. Your health, managed with digital expertise.
          </p>
          <div className="mt-14 border w-2xl h-16 rounded-full px-3 py-2 flex gap-3 items-center">
            <Badge variant={'secondary'} className="w-10 h-10 rounded-full [&_svg]:size-6!">
              <Search />
            </Badge>
            <Separator orientation="vertical" />
            <Input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for medicines, vitamins, or brands..."
              type="text"
              className="bg-transparent! border-0"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <div className="border rounded-full px-5 py-3 flex items-center gap-3">
          <Button variant={"default"}>All</Button>
          <Button variant={"secondary"}>Popular</Button>
          <Button variant={"secondary"}>Offer</Button>
        </div>
        <div className="border rounded-full px-5 h-17 py-3 flex items-center gap-3">
          <Select
            value={searchParams.get("sortBy") || ""}
            onValueChange={(value) => updateUrl("sortBy", value)}
          >
            <SelectTrigger className="w-45 bg-transparent! border-0! capitalize">
              <SelectValue placeholder="SortBy" />
            </SelectTrigger>
            <SelectContent>
              {sortBy.map((i, idx) => (
                <SelectItem key={idx} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator orientation="vertical" />
          <Select
            value={searchParams.get("sortOrder") || ""}
            onValueChange={(value) => updateUrl("sortOrder", value)}
          >
            <SelectTrigger className="w-45 bg-transparent! border-0! capitalize">
              <SelectValue placeholder="SortOrder" />
            </SelectTrigger>
            <SelectContent>
              {sortOrder.map((i, idx) => (
                <SelectItem key={idx} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
