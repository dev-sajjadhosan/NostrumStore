import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { CheckCircle2, Home, Loader2, Pill, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerificationHandler({ token }: { token: string }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = require("react").useState("");

  useEffect(() => {
    async function verify() {
      try {
        const { data, error } = await authClient.verifyEmail({
          query: { token },
        });

        if (error) {
          setStatus("error");
          setErrorMsg(error.message || "Verification failed");
        } else {
          setStatus("success");
        }
      } catch (err) {
        setStatus("error");
        setErrorMsg("An unexpected error occurred.");
      }
    }
    verify();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin size-10 text-blue-600" />
        <p className="mt-4 text-lg">Verifying your account...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <XCircle size={60} className="text-red-500" />
        <h1 className="text-2xl font-bold mt-4">Verification Failed</h1>
        <p className="text-muted-foreground max-w-md">{errorMsg}</p>
        <Link
          href="/resend-verification"
          className="mt-6 text-blue-500 underline"
        >
          Resend verification email
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <CheckCircle2 size={60} className="text-green-500" />
      <h1 className="text-3xl font-semibold mt-4 text-green-600">
        Email Verified!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Your email has been successfully verified. You can now access all
        features.
      </p>
      <div className="flex items-center gap-5 mt-7">
        <Link href="/">
          <Button size={'lg'}>
            <Home />
            Go To Home
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant={"secondary"} size={'lg'}>
            <Pill />
            Browse Shop
          </Button>
        </Link>
      </div>
    </div>
  );
}
