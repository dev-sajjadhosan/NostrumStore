"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import errorImage from "../../public/error.svg";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <Card className="w-full h-full border-0 min-h-screen items-center justify-center md:p-10">
      <CardContent className="flex flex-col items-center justify-between w-full">
        <Image src={errorImage} alt="Error" width={300} height={300} />
        <div className="flex flex-col gap-1 mt-17 justify-center text-center w-full">
          <h1 className="text-4xl font-semibold tracking-tight">
            Something went wrong!
          </h1>
          <p className="text-lg text-muted-foreground">
            {error.message ||
              "An unexpected error occurred. Please try again or contact support if the problem persists."}
          </p>
          <p className="text-md tracking-wide">
            Error Digest: {error.digest || "N/A"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-15">
          <Button
            onClick={() => reset()}
            variant="default"
            size={"lg"}
            className="w-full gap-2"
          >
            <RefreshCcw className="h-4 w-4" /> Try Again
          </Button>
          <Button
            size={"lg"}
            variant="secondary"
            asChild
            className="w-full gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
