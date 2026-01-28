import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col gap-5">
        <Card className="h-100">
          <CardContent className="h-full flex items-center justify-around">
            <Coffee size={200} strokeWidth={1} />
            <h1 className="text-8xl font-bold mb-4">About</h1>
          </CardContent>
          <CardFooter className="gap-3 justify-end">
            <Button>Login</Button>
            <Button>Sign Up</Button>
          </CardFooter>
        </Card>
        <h3 className="text-2xl font-semibold mt-18">
          Why we name it Nostrum?
        </h3>
        <p className="text-lg leading-6 text-muted-foreground mt-1">
          In an era of mass-produced healthcare, we chose a name that reflects a
          personalized commitment to healing. Historically, an apothecary’s
          "Nostrum" was their signature remedy—a formula crafted with local
          expertise and individual care. We named our platform Nostrum to revive
          that sense of ownership and dedication in the digital pharmaceutical
          space.
        </p>

        <h3 className="text-2xl font-semibold mt-8">
          What is the meaning of Nostrum?
        </h3>
        <p className="text-lg leading-6 text-muted-foreground mt-1">
          Derived from the Latin <span className="italic">"Mare Nostrum"</span>{" "}
          (Our Sea), the word{" "}
          <span className="font-medium text-foreground">Nostrum</span> literally
          translates to <span className="italic">"Ours."</span> In medicine, it
          signifies a proprietary prepared remedy. For us, it represents the
          bridge between ancient herbal wisdom and modern clinical science—a
          collection of trusted solutions that belong to our community.
        </p>

        <h3 className="text-2xl font-semibold mt-8">
          What is Nostrum Store's Future Goal?
        </h3>
        <p className="text-lg leading-6 text-muted-foreground mt-1">
          Our vision is to evolve beyond a simple marketplace into a
          comprehensive health ecosystem. We aim to integrate AI-driven
          prescription management, sustainable botanical sourcing, and global
          accessibility, ensuring that quality healthcare is not a luxury, but a
          standard—making every remedy truly "Ours" to share.
        </p>

        <h3 className="text-4xl font-semibold mt-18 text-center">
          Meet Our Suppliers?
        </h3>
        <div className="flex items-center gap-7 w-full overflow-scroll scroll-auto p-7">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Card
              key={idx}
              className="w-xs h-40 shrink-0 cursor-pointer hover:scale-105 transition-all"
            >
              <CardContent className="h-full flex flex-col items-center justify-center text-4xl">
                <Image
                  src={"vercel.svg"}
                  alt="Suppliers"
                  width={40}
                  height={40}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
