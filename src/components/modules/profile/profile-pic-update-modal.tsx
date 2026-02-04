"use client";

import { updateProfile } from "@/actions/user.actions";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { genFallBackName } from "@/helpers/fallback-name";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Camera, ImagePlus, ImageUp, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePictureUpdateModal({ data }: { data: any }) {
  const [picture, setPicture] = useState<string | null>(null);

  const handleChangePicture = async (url: string | null) => {
    const toastID = toast.loading("Uploading picture...");
    try {
      const data = {
        user: {
          image: url,
        },
      };
      const res = await updateProfile(data);
      console.log(res);
      toast.success("Picture Uploaded!", { id: toastID });
    } catch (err: any) {
      toast.error(err.message, { id: toastID });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <ImagePlus /> Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col max-w-2xl! p-9">
          <h1 className="text-xl font-semibold">Update Profile Picture</h1>
          <div className="flex flex-col items-center mx-auto gap-3 w-full">
            <Avatar className="w-50 h-50 border-2 border-background">
              <AvatarImage
                src={picture || data?.user?.image}
                className="object-cover"
              />
              <AvatarFallback>
                {genFallBackName(data?.user?.name)}
              </AvatarFallback>
            </Avatar>

            <p className="text-sm text-muted-foreground mb-3">
              JPG, GIF or PNG. Max size of 2MB.
            </p>
            <Separator />
            <div className="flex items-center gap-3 w-full">
              <Input
                type="text"
                placeholder="Or | Share picture link here..."
                onChange={(e) => setPicture(e.currentTarget.value)}
              />
            </div>
            <div>
              <div className="flex gap-2 items-center mt-3">
                <Button onClick={() => handleChangePicture(picture)}>
                  <ImageUp /> Upload Picture
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleChangePicture("")}
                >
                  Remove <Trash2Icon />
                </Button>
              </div>
            </div>
            <p className="text-md text-muted-foreground text-center mt-3">
              If you want to upload image try to use imgbb. Upload your picture
              their and share the link.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
