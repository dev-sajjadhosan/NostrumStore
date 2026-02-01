import { Card, CardContent, CardHeader } from "../ui/card";
import empty from '../../../public/empty.svg'
import Image from "next/image";

export default function EmptyCard() {
  return (
    <>
      <div>
        <Card className="w-full border-0">
          <CardContent className="h-full flex flex-col gap-1 justify-center items-center">
            <Image src={empty} alt="Empty" width={250} height={250} />
            <h1 className="text-5xl mt-7">Oops!</h1>
            <h3 className="text-lg">Look Like You are out of data.</h3>
            <p className="text-md">Please add or get some data to show here.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
