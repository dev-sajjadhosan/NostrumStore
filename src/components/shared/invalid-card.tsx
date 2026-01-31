"use client";

import React from "react";
import {
  FileQuestion,
  Home,
  ArrowLeft,
  Search,
  LifeBuoy,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import invalid from "../../../public/invalid.svg";

export default function InvalidCard({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-2xl w-full text-center border-none shadow-none bg-transparent p-0">
        <CardContent className="flex flex-col items-center p-0">
          <Image src={invalid} alt="Invalid" width={300} height={300} />
          <h3 className="text-2xl mt-13">Page no longer available</h3>
          <p className="text-lg mt-3 text-muted-foreground">
            Sorry about that! The page you’re looking for doesn’t exist or was
            moved. Use the buttons below to get back to your dashboard.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              onClick={onBack}
            >
              <ArrowLeft className="size-4" /> Return Back
            </Button>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="size-4" /> Go to Pharmacy Home
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
