"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleUserRound, PhoneCall, Send, Siren } from "lucide-react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long."),
  email: z.email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export default function ContactPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Sending your message...");
      try {
        console.log({ value });
        //   const res = await fetch("/contact/send-message", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(value),
        //   });
      } catch (err) {
        toast.error("Failed to send message. Please try again later.", {
          id: toastID,
        });
      }
    },
  });
  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col gap-48">
        <Card className="h-100">
          <CardContent className="h-full flex items-center justify-around">
            <CircleUserRound
              size={200}
              strokeWidth={1}
              className="text-neutral-700"
            />
            {/* <div className="flex flex-col gap-5">
              <Link href={"/quick"}>
                <div className="flex relative">
                  <Badge className="absolute -right-5" variant={"default"}>
                    new
                  </Badge>
                  <Button className="h-18 w-45" variant={"secondary"}>
                    Quick
                    <CircleArrowOutUpRight />
                  </Button>
                </div>
              </Link>
              <Link href={"/login"}>
                <Button className="h-18 w-45" variant={"secondary"}>
                  Login <LogIn />
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button className="h-18 w-45" variant={"secondary"}>
                  Sign Up <UserPlus2 />
                </Button>
              </Link>
            </div> */}
            <div className="flex flex-col gap-1 text-center">
              <h1 className="text-8xl font-bold ">Contact</h1>
              <p className="text-xl font-medium tracking-wide text-muted-foreground">
                For any inquiries, please reach out to us at
              </p>
            </div>
          </CardContent>
        </Card>
        <section className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">Want to say something?</h1>
          <p className="text-lg tracking-wide text-muted-foreground text-center max-w-4xl mt-4">
            We would love to <b>hear</b> from <i>you</i>! Whether you have{" "}
            <b>questions</b>,<b>feedback</b>, or just want to{" "}
            <b>
              <i>say hello</i>
            </b>
            , feel free to reach out to us. Your <b>thoughts</b> and opinions
            are important to us as we strive to <b>improve</b> our{" "}
            <i>services</i> and <i>provide</i> the best experience possible.
          </p>
        </section>
        <section className="grid grid-cols-3 gap-7">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card
              className="w-full h-70 duration-100 skew-5 shadow hover:translate-y-3"
              key={idx}
            >
              <CardHeader className="flex gap-5 flex-col items-center mt-9">
                <PhoneCall size={40} strokeWidth={1} />
                <Separator className="w-xs! h-1! rounded-full" />
              </CardHeader>
              <CardContent className="h-full flex flex-col items-center gap-1">
                <h1 className="text-xl font-semibold">Headquarters </h1>
                <p className="text-md font-medium text-muted-foreground">
                  789 Oak St, Smalltown, TX 23456
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
        <section>
          <Card className="w-full h-145 border-0">
            <CardContent className="h-full flex items-center justify-between gap-5">
              <div className="w-full h-full bg-neutral-800"></div>
              <Separator orientation="vertical" />
              <div className="w-full h-full p-5">
                <h1 className="text-3xl font-semibold mb-1">Get in Touch</h1>
                <p className="text-md text-muted-foreground">
                  Whether you have questions, feedback, or just want to say
                  hello, we're here to listen. Reach out to us through any of
                  the following methods:
                </p>
                <FieldGroup>
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="email"
                            placeholder="john-doe@gmail.com"
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="message"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                          <Textarea
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            placeholder="Your message here..."
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <Button type="submit">
                    Send Message <Send />
                  </Button>
                </FieldGroup>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
