"use client"


import EmptyCard from "@/components/shared/empty-card";
import PaginationControl from "@/components/shared/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { genFallBackName } from "@/helpers/fallback-name";

export default function ReviewComponent({ reviews }: { reviews: any }) {
  const data = reviews?.data?.data;
  const pagination = reviews?.data?.pagination;
  console.log(data);

  return (
    <>
      <div className="mt-7 flex flex-col gap-7">
        <h1 className="text-4xl font-semibold">Customer Reviews</h1>
        {data?.length == 0 ? (
          <EmptyCard />
        ) : (
          <>
            <div className="grid lg:grid-cols-2 gap-3">
              {data?.map((item: any, idx: number) => (
                <Card className="w-full">
                  <CardHeader>
                    <Badge className="font-semibold">03 Days ago</Badge>
                  </CardHeader>
                  <CardContent className="h-full flex flex-col items-center justify-center text-sm text-muted-foreground">
                    <p>{item?.message}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-row-reverse items-center justify-start gap-3 w-full">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={item?.data?.image}
                          alt={item?.user?.name}
                        />
                        <AvatarFallback>
                          {genFallBackName(item?.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="text-md font-semibold">
                        {item?.user?.name}
                      </h1>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <PaginationControl
              currentPage={pagination?.page}
              totalPages={pagination?.pages}
            />
          </>
        )}
      </div>
    </>
  );
}
