"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Trash2Icon,
  ImagePlus,
  LogOut,
  UserRoundPen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Back from "../shared/back";

export default function PersonalInformationView() {
  return (
    <div className="space-y-6 mx-auto">
      <div className="flex items-center justify-between">
        <Back path="/profile" />
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">
            Personal Information
          </h2>
          <p className="text-muted-foreground">
            Update your profile details and how we can reach you.
          </p>
        </div>
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0 flex flex-col gap-10">
          <div className="flex items-center justify-between gap-10 w-full">
            <div className="flex flex-col items-center gap-6 p-4 w-2xl">
              <div className="relative group cursor-pointer">
                <Avatar className="w-50 h-50 border-2 border-background shadow-md">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>MSH</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white size-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-xl">Profile Picture</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  JPG, GIF or PNG. Max size of 2MB.
                </p>
                <div className="flex gap-2 items-center">
                  <Button>
                    <ImagePlus /> Change Photo
                  </Button>
                  <Button variant="ghost" className="text-destructive">
                    Remove <Trash2Icon />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Badge className="text-md px-5 py-1 font-semibold">
                Customer
              </Badge>
              <h1 className="text-4xl">Mohammad Sajjad Hosan</h1>
              <h3 className="text-xl tracking-wide text-muted-foreground">
                devsajjadhosan@gmail.com
              </h3>
              <p className="mt-5 text-sm tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                nihil quasi architecto dolor minus voluptatem optio quia, ex
                culpa earum labore consequuntur eos ducimus, incidunt sequi
                corrupti laudantium cumque. At, laudantium nostrum! Unde dicta
                temporibus excepturi molestias quia id veritatis et accusamus
                iure architecto consectetur necessitatibus, debitis praesentium
                sapiente. Consectetur?
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Button size={"lg"}>
              Update Profile
              <UserRoundPen className="size-5" />
            </Button>
            <Button size={"lg"} variant={"ghost"} className="text-destructive">
              Logout
              <LogOut className="size-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


