import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import verify from "../../../../../public/verify.svg";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <>
      <Card className="w-full h-full border-0! bg-transparent!">
        <CardContent className="h-full flex flex-col gap-3">
          <Image src={verify} alt="Verify Image" width={200} height={200} />
          <h1 className="text-4xl mt-5">Send Verify Mail</h1>
          <p className="text-lg tracking-wide text-muted-foreground capitalize">
            Please go to your <b>gmail</b> application to Verify your account to
            get access to our website.
          </p>
          <p className="text-md text-orange-800 capitalize">
            If you don't received any email please check your{" "}
            <b>
              <i>spam</i>
            </b>{" "}
            or others.
          </p>
        </CardContent>
        <CardFooter className="justify-end">
          <Link href="https://mail.google.com/" target="_blank">
            <Button size={"lg"}>
              Go to Gmail <Forward />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
