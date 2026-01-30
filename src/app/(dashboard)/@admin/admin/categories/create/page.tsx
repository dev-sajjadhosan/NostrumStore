"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Upload, 
  Save, 
  Info 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateCategoryPage() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Category</h1>
          <p className="text-muted-foreground italic">Add a new global classification for the medicine inventory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Form Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-muted/40 shadow-sm">
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
              <CardDescription>Enter the name and public description.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" placeholder="e.g., Pediatric Medicines, Supplements" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Public Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what kind of medicines belong here..." 
                  className="min-h-[120px] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted/40 shadow-sm">
            <CardHeader>
              <CardTitle>Management Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Initial Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active (Visible)</SelectItem>
                    <SelectItem value="restricted">Restricted (Controlled)</SelectItem>
                    <SelectItem value="inactive">Inactive (Hidden)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category Slug (URL)</Label>
                <Input placeholder="pediatric-medicines" disabled className="bg-muted/50" />
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Info className="size-3" /> Generated automatically from name.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Image/Thumbnail */}
        <div className="space-y-6">
          <Card className="border-muted/40 shadow-sm">
            <CardHeader>
              <CardTitle>Icon / Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="bg-muted p-3 rounded-full">
                  <Upload className="size-6 text-muted-foreground" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-primary">Click to upload</span>
                  <p className="text-xs text-muted-foreground">PNG, JPG or SVG (Max 2MB)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button className="w-full gap-2 py-6 text-lg font-semibold shadow-lg shadow-primary/20">
              <Save className="size-5" /> Save Category
            </Button>
            <Button variant="ghost" onClick={() => router.back()} className="w-full">
              Discard Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}