"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Key, UserPlus2, UserRoundCheck } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "The field need at least 08."),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating User...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        console.log({ data, error });
        if (error) {
          toast.error(error.message, { id: toastID });
          return;
        }
        toast.success("User Created Successfully!", { id: toastID });
      } catch (err) {
        toast.error("Something Went Wrong!", { id: toastID });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    console.log(data);
  };

  return (
    <div className="w-2xl flex flex-col gap-5">
      <Card {...props} className="bg-transparent! border-0">
        <CardHeader>
          <CardTitle className="text-3xl">Login your account</CardTitle>
          <CardDescription>
            Enter your information below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-from"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e);
            }}
          >
            <FieldGroup>
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
                name="password"
                children={(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        type="password"
                        placeholder="password1223"
                      />{" "}
                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex items-center gap-5">
          <Button form="login-from" type="submit">
            <UserPlus2 /> Login
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-between mt-12">
        <Button className="border w-60 h-19 px-5 py-4 text-md font-semibold rounded-full flex gap-1 flex-col items-center">
          <Key /> Forgot Password
        </Button>
        <Toggle
        //   variant={"outline"}
          className="w-60 h-20 px-5 py-4 text-md font-semibold rounded-full flex-col gap-1"
        >
          <UserRoundCheck color="#ffffff" />
          Remember Me
        </Toggle>
      </div>
    </div>
  );
}
