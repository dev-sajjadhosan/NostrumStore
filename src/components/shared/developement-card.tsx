"use client";

import React from "react";
import {
  Code2,
  Terminal,
  Layers,
  Bug,
  Rocket,
  GitBranch,
  Construction,
  Home,
  ChevronLeftIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface DevelopmentCardProps {
  title?: string;
  progress?: number;
  status?: "Alpha" | "Beta" | "Stable" | "In Progress";
  branch?: string;
}

export default function DevelopmentCard({
  title = "Pharmacy Analytics Engine",
  progress = 65,
  status = "In Progress",
  branch = "feature/analytics-v2",
}: DevelopmentCardProps) {
  const router = useRouter();
  return (
    <Card className="w-4xl mx-auto h-full border-0">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="mx-auto text-muted-foreground">
            <Construction size={200} strokeWidth={1} />
          </div>
          <Badge
            variant={status === "Stable" ? "default" : "secondary"}
            className="font-mono text-[10px] uppercase tracking-wider"
          >
            {status}
          </Badge>
        </div>
        <CardTitle className="text-3xl font-semibold pt-2">{title}</CardTitle>
        <p className="tex-lg tracking-wide">
          Under Construction: Our engineering team is currently deploying new
          updates to this section. We’re building a more robust way for you to
          manage your data. Check back soon for the full release.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 h-full">
       
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-muted-foreground flex items-center gap-1">
              <Layers className="size-3" /> Completion
            </span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button onClick={() => router.back()} variant={'ghost'}>
          <ChevronLeftIcon />
          Go Back
        </Button>
        <Button onClick={() => router.push("/")}>
          <Home />
          Go Back To Home
        </Button>
      </CardFooter>
    </Card>
  );
}
