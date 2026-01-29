import { BellRing, Mailbox } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function NewsLetter() {
  return (
    <>
      <Card className="w-full h-96">
        <CardContent className="flex items-center justify-around h-full">
          <Mailbox size={180} strokeWidth={1} />
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center gap-2 ">
            <h1 className="text-3xl">Subscribe to our newsletter</h1>
            <p className="text-md font-normal">
              Join our email subscription now to get updates on promotions and
              coupons.
            </p>
            <div className="flex items-center border rounded-full w-xl py-3 px-3 mt-7">
              <Input
                type="text"
                placeholder="name@example.com"
                className="border-0 bg-transparent! text-lg!"
              />
              <Button size={"lg"}>
                <BellRing />
                Subscribe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
