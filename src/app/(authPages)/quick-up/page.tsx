"use client";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import {
  Facebook,
  Discord,
  Google,
  GitHubDark,
} from "@ridemountainpig/svgl-react";
import { toast } from "sonner";
const socials = [
  {
    name: "Facebook",
    link: "#",
    svg: Facebook,
    dev: true,
  },
  {
    name: "Discord",
    link: "#",
    svg: Discord,
  },
  {
    name: "Google",
    link: "#",
    svg: Google,
  },
  {
    name: "Github",
    link: "#",
    svg: GitHubDark,
    dev: true,
  },
];

export default function QuickAuthPage() {
  const handleGoogleProvider = async () => {
    return await authClient.signIn.social({
      provider: "google",
      // callbackURL: env.NEXT_PUBLIC_APP_URL,
      callbackURL: "/auth/roles",
    });
  };
  const handleDiscordProvider = async () => {
    return await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/auth/roles",
    });
  };
  const handleProviders = (name: string) => {
    if (name.toLocaleLowerCase() === "google") {
      handleGoogleProvider();
      return 
    } else if (name.toLocaleLowerCase() === "discord") {
      return handleDiscordProvider();
    }
    toast.warning("Currently Working on them. Please, try later!");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-wrap justify-center gap-5 w-full group">
          {socials.map((item, idx) => (
            <Card
              key={idx}
              className={`w-50 md:w-xs h-40 duration-300 transition-all group-hover:blur-sm hover:blur-none! hover:scale-105 ${item.dev ? "cursor-not-allowed pointer-none:" : "cursor-pointer"} `}
              onClick={() => handleProviders(item?.name)}
            >
              <CardContent className="h-full flex gap-2 flex-col items-center justify-center">
                <item.svg width={60} height={60} />
                <h1 className="text-md font-semibold tracking-wide text-muted-foreground">
                  {item.name}
                </h1>
              </CardContent>
            </Card>
          ))}
        </div>
        <h3 className="text-md font-normal text-muted-foreground mt-5 text-center">
          More Coming Soon
        </h3>
      </div>
    </>
  );
}
