import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  CheckCircle2,
  Home,
  Loader2,
  MailIcon,
  Pill,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import verifySuccess from "../../../../public/verify-success.svg";
import verifyFailed from "../../../../public/verify-failed.svg";
import { useRouter } from "next/navigation";

export default function VerificationHandler({ token }: { token: string }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const router = useRouter()
  const [errorMsg, setErrorMsg] = require("react").useState("");

  useEffect(() => {
    async function verify() {
      try {
        const { data, error } = await authClient.verifyEmail({
          query: { token },
        });

        if(data){
          return router.push('/auth/roles')
        }

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
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen text-center p-4">
        <Image
          src={verifyFailed}
          alt="Verify Failed"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center w-full">
          <XCircle size={60} className="text-red-500" />
          <h1 className="text-4xl font-semibold mt-4">Verification Failed</h1>
          <p className="text-muted-foreground max-w-md mb-7">{errorMsg}</p>
          <Link href="/resend-verification">
            <Button variant={"link"} size={"lg"}>
              <MailIcon /> Resend verification email
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen text-center p-4">
      <Image
        src={verifySuccess}
        alt="Verify Success"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center">
        <CheckCircle2 size={60} strokeWidth={1} className="text-green-500" />
        <h1 className="text-3xl font-semibold mt-4">Email Verified!</h1>
        <p className="mt-2 text-muted-foreground">
          Your email has been successfully verified. You can now access all
          features.
        </p>
        <div className="flex items-center gap-5 mt-7">
          <Link href="/">
            <Button size={"lg"}>
              <Home />
              Go To Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant={"secondary"} size={"lg"}>
              <Pill />
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
