"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { 
  AlertCircle, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Pill,          
  Stethoscope,    
  Activity,       
  Baby,           
  Sparkles,       
  Syringe         
} from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const categoryIcons: Record<string, React.ReactNode> = {
  "Antibiotics": <Pill className="size-6 text-blue-500" />,
  "Pain Relief": <Activity className="size-6 text-red-500" />,
  "Pediatric": <Baby className="size-6 text-pink-500" />,
  "Skincare": <Sparkles className="size-6 text-emerald-500" />,
  "Vaccines": <Syringe className="size-6 text-indigo-500" />,
  "Psychotropic": <AlertCircle className="size-6 text-amber-500" />,
};

export default function CategoryCard({ category }: { category: any }) {
  const Icon = categoryIcons[category.name] || <Stethoscope className="size-6 text-muted-foreground" />;

  return (
    <Card
      key={category.id}
      className="group hover:border-primary/50 transition-all shadow-sm overflow-hidden"
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex gap-3">
          
          <Badge className="w-15 [&_svg]:size-6! bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
            {Icon}
          </Badge>
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
            <CardDescription className="line-clamp-1 italic text-xs">
              {category.description}
            </CardDescription>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 size-4" /> Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 size-4" /> Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium">
              Linked Products:
            </span>
            <span className="font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
              {category.medicineCount}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Badge
              variant={category.status === "Active" ? "secondary" : "outline"}
              className={
                category.status === "Restricted"
                  ? "border-amber-500 text-amber-600 bg-amber-50"
                  : ""
              }
            >
              {category.status === "Restricted" && (
                <AlertCircle className="mr-1 size-3" />
              )}
              {category.status}
            </Badge>

            <Link href={`/admin/medicines?category=${encodeURIComponent(category.name)}`}>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-primary"
              >
                View Medicines →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}