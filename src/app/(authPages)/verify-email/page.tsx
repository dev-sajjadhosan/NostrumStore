"use client";

import { use } from "react"; // Import use to unwrap the params
import Link from "next/link";
import { LogIn, MailWarning, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import VerificationHandler from "@/components/modules/authComs/verification-handler";


interface VerifyPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function VerifyEmailPage({ searchParams }: VerifyPageProps) {
  // 1. Unwrap the searchParams promise using React.use()
  const params = use(searchParams);
  const token = params.token as string;

  // 2. Use a query or a dedicated function to handle the async logic
  // For simplicity here, we'll use a basic async call inside a button or useEffect, 
  // but let's look at the UI state first.

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <MailWarning size={60} strokeWidth={1} className="text-amber-500" />
        <h1 className="text-3xl font-semibold mt-2">Invalid Link</h1>
        <p className="text-lg tracking-wide text-muted-foreground">
          No verification token was found. Please check your email again.
        </p>
        <Link href="/login" className="mt-4">
          <Button size={"lg"}>
            Go to Login <LogIn className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return <VerificationHandler token={token} />;
}

