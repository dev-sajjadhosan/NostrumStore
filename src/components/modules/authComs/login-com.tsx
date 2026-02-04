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
import { Eye, EyeOff, Key, UserPlus2, UserRoundCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "The field need at least 08."),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Checking User for Login...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        console.log({ data, error });
        if (error) {
          toast.error(error.message, { id: toastID });
          return;
        }
        router.push('/')
        toast.success("Checking Success. Login", { id: toastID });
      } catch (err) {
        toast.error("Something Went Wrong!", { id: toastID });
      }
    },
  });

  return (
    <div className="w-full lg:w-2xl flex flex-col gap-5">
      <Card {...props} className="bg-transparent! border-0 w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Login your account</CardTitle>
          <CardDescription>
            Enter your information below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="w-">
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
                      <div className="flex items-center gap-3">
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          id={field.name}
                          type={show ? "text" : "password"}
                          placeholder="password1223"
                        />{" "}
                        <Button
                          type="button"
                          size={"icon"}
                          onClick={() => setShow(!show)}
                        >
                          {show ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
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
          <Button form="login-from" type="submit" size={"lg"}>
            <UserPlus2 /> Login
          </Button>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-2 gap-7 mt-12 h-18">
        <Button
          size={"lg"}
          className="h-full px-5 text-md font-semibold rounded-full flex gap-1 flex-col items-center"
        >
          <Key /> Forgot Password
        </Button>
        <Toggle
          //   variant={"outline"}
          className="h-full px-5 text-md font-semibold rounded-full flex-col gap-1"
        >
          <UserRoundCheck color="#ffffff" />
          Remember Me
        </Toggle>
      </div>
    </div>
  );
}
