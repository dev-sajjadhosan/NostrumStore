import PaginationControl from "@/components/shared/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ReviewComponent() {
  return (
    <>
      <div className="mt-7 flex flex-col gap-7">
        <h1 className="text-4xl font-semibold">Customer Reviews</h1>
        <div className="grid lg:grid-cols-2 gap-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Card className="w-full">
              <CardHeader>
                <Badge className="font-semibold">03 Days ago</Badge>
              </CardHeader>
              <CardContent className="h-full flex flex-col items-center justify-center text-sm text-muted-foreground">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  fugit molestiae sint nostrum alias? Porro ullam distinctio
                  quae, impedit iusto, provident a excepturi reiciendis minus
                  quisquam laudantium, nulla quis totam.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row-reverse items-center justify-start gap-3 w-full">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>NS</AvatarFallback>
                  </Avatar>
                  <h1 className="text-md font-semibold">Nostrum Store</h1>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <PaginationControl currentPage={1} totalPages={5} />
      </div>
    </>
  );
}
