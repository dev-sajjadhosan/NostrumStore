"use client";

import React, { useEffect, useState } from "react";
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
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateProfile } from "@/actions/user.actions";
import ProfilePictureUpdateModal from "./profile-pic-update-modal";
import { genFallBackName } from "@/helpers/fallback-name";
import Link from "next/link";

const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(300, "Bio must be under 300 characters"),
});

export default function PersonalInformationView({ data }: { data: any }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const user = data?.user;

  const form = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      bio: data?.bio,
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Updating profile...");
      try {
        const data = {
          bio: value?.bio,
          user: {
            name: value?.name,
            email: value?.email,
          },
        };
        const res = await updateProfile(data);
        toast.success("Profile Updated!", { id: toastID });
        setIsUpdate(false);
      } catch (err: any) {
        toast.error(err?.message, { id: toastID });
      }
    },
  });
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
                  <AvatarImage
                    className="object-cover"
                    src={user?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{genFallBackName(user?.name)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="font-semibold text-2xl">Profile Picture</h4>
                <div className="flex gap-2 items-center">
                  <ProfilePictureUpdateModal data={data} />
                </div>
              </div>
            </div>

            {isUpdate ? (
              <form
                className="w-2xl"
                id="update-profile"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(e);
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            Full Name
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="John Doe"
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="email"
                            placeholder="johndoe@example.com"
                          />{" "}
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="bio"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                          <Textarea
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            placeholder="Write Your bio"
                            rows={3}
                            className="bg-background/30 border-0 resize-none p-5"
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </form>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <Badge className="text-md px-5 py-1 font-semibold">
                  {user?.role}
                </Badge>
                <h1 className="text-4xl">{user?.name}</h1>
                <h3 className="text-xl tracking-wide text-muted-foreground">
                  {user?.email}
                </h3>
                <p className="mt-3 text-md tracking-wide">
                  {data?.bio ||
                    "Write Your Bio. Please try to write the bio with-in 300 words."}
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Button
              size={"lg"}
              variant={!isUpdate ? "default" : "secondary"}
              onClick={() => setIsUpdate(!isUpdate)}
            >
              {isUpdate ? "Discard Update" : "Update Profile"}
              <UserRoundPen className="size-5" />
            </Button>
            {isUpdate ? (
              <Button size={"lg"} form="update-profile">
                <Save />
                Save Change
              </Button>
            ) : (
              <Link href={'/logout'}>
              <Button
                size={"lg"}
                variant={"ghost"}
                className="text-destructive"
                >
                Logout
                <LogOut className="size-5" />
              </Button>
                </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
