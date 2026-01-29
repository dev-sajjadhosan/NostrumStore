"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import review from "../../../../../public/review.svg";
import vercel from "../../../../../public/vercel.svg";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseMedical,
  DollarSign,
  InfoIcon,
  Minus,
  Plus,
  Share2,
  ShoppingBasket,
  TableOfContents,
  Timer,
  UserStar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function ShopDetails() {
  const price = 20.8;
  const [totalMoney, setTotalMoney] = useState<number>(price);
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col gap-24">
        <section className="flex items-start gap-10 justify-between w-full h-full">
          <Card>
            <CardContent className="p-9">
              <Image src={vercel} alt="Picture" width={400} height={400} />
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Image
                  key={idx}
                  className={`shrink-0 border p-2 rounded-xl cursor-pointer active:scale-95`}
                  src={review}
                  alt="image"
                  width={100}
                  height={100}
                />
              ))}
            </CardFooter>
          </Card>
          <div className="w-3/5 h-full flex flex-col items-start p-9">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between gap-2">
                <Badge className="text-sm px-3 py-1">New</Badge>
                <Badge variant={"outline"} className="text-sm px-3 py-1">
                  Out of Stock
                </Badge>
              </div>
              <Badge className="text-md font-semibold tracking-wider px-4 py-2 [&_svg]:size-4! flex items-center gap-1">
                <Timer /> 10:10:05
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold mt-5">
              Natural-e Aloe Vera Gel – 200gram
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-md font-semibold text-muted-foreground">
                Product Owner -{" "}
              </p>
              <Badge
                className="text-md px-5 font-semibold"
                variant={"secondary"}
              >
                Jody Sign
              </Badge>
            </div>
            <p className="text-md font-normal tracking-wider mt-7">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate eius error facilis placeat fugit aspernatur quisquam ex
              cum, quasi earum quod vitae expedita, dicta saepe libero nesciunt
              architecto dolorem recusandae? Eligendi officia, quasi cum ratione
              quos similique omnis excepturi suscipit recusandae ipsa id unde
              minus nemo nihil reprehenderit placeat asperiores quidem, facere
              accusamus. Dicta, tempore suscipit! Earum distinctio at pariatur
              maiores, aperiam illum. Eum distinctio reprehenderit iure, id
              soluta doloremque!
            </p>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-5xl font-semibold my-9 relative">
                $200.00{" "}
                <Badge className="text-lg! px-5 font-semibold line-through absolute -top-5">
                  $280
                </Badge>
              </h1>
              <div className="flex gap-5 items-center px-5 py-9 h-17 border rounded-full">
                <TooltipButton
                  icon={Plus}
                  title="Increment"
                  variant={"secondary"}
                  onClick={() => {
                    setQuantity(quantity + 1);
                    setTotalMoney(price * quantity);
                  }}
                />
                <Badge className="text-lg! font-semibold px-9 py-2.5">
                  {quantity}
                </Badge>
                <TooltipButton
                  icon={Minus}
                  title="Decrement"
                  variant={"secondary"}
                  onClick={() => {
                    setQuantity(quantity > 1 ? quantity - 1 : quantity);
                    setTotalMoney(price * quantity);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 w-full">
              <Button size={"lg"}>
                <DollarSign /> Buy Now
              </Button>
              <div className="flex items-center gap-3">
                <Badge className="text-lg! font-semibold px-9 py-1">
                  ${totalMoney}
                </Badge>
                <Button size={"lg"} variant={"secondary"}>
                  <ShoppingBasket /> Add To Cart
                </Button>

                <TooltipButton icon={Share2} title="Share" />
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <div className="border rounded-full px-5 py-3 flex items-center justify-center gap-3">
            <Button variant={"default"}>
              <BriefcaseMedical /> Description
            </Button>
            <Button variant={"secondary"}>
              <UserStar />
              Review
            </Button>
          </div>
          <p className="text-md tracking-wider mt-5 text-muted-foreground">
            Indications of Adovas 200 ml This Adovas liquefies phlegm. It
            soothes irritation of the throat. Helps to relieve hoarseness. It is
            a remedy for all types of cough such as dry irritable cough,
            allergic & smokers cough.
            <br />
            <br />
            Composition: Each teaspoon full (5 ml) of syrup contains extracts
            of- Adhatoda vasica 0.68 gm Piper longum 0.14 gm Glycyrrhiza glabra
            6.78 mg Trikatu (Piper nigrum, Zingiber officinale) 20.34 mg
            Terminalia chebula 73.24 mg Vitis venifera 0.14 gm Acorus calamus
            6.78 mg Saussurea lappa 6.78 mg Syzygium aromaticum 6.78 mg Trizatak
            (Cinnamomum zeylanicum, Elettaria cardamomum, Cinnamomum tamala)
            20.34 mg Pistacia integerrima 6.78 mg Myrica nagi 6.78 mg Woodfordia
            fruticosa 1.14 mg.
            <br />
            <br />
            Dosage of Adovas 200 ml: Children under 12 years: 1-2 teaspoonful
            (5-10 ml) 2-3 times a day. 'Adult: 3 teaspoonful (15 ml) 2-3 times a
            day.Some warm water may be added for better results.
            <br />
            <br />
            Interaction of Adovas 200 ml: No report is available.
            <br />
            <br />
            Contraindications: No report is available on contraindication. It
            may be happen in patients who are hypersensitive to any of its
            ingredients.
            <br />
            <br />
            Side Effects of Adovas 200 ml: This syrup is proven as safe. It is
            well tolerated. In high dose diarrhea, vomiting may occur.
            <br />
            <br />
            Storage Conditions: Keep out of reach of children. Keep away from
            direct sunlight. Store in a cool and dry place.
            <br />
            <br />
            Drug Classes: Herbal and Nutraceuticals
            <br />
            <br />
            Mode Of Action: Adhatoda vasica (Basok): Relieves cough & bronchial
            spasm. It liquefies mucous. Piper longum (Pipul): Relieves cold
            allergy & asthma. Glycyrrhiza glabra (Jashthi Modhu) : Relieves
            irritation of throat. Enhances the immune system. It is
            anti-inflammatory, demulcent & expectorant. Piper nigrum (Marich):
            It is fungistatic, bacteriostatic & anti-inflammatory. Zingiber
            officinale (Shunthi): It is antihistaminic. Very much effective in
            common cold. Terminalia chebula (Haritaki): It removes toxin from
            the body. It has beneficial effect on all tissues. Vitis venifera
            (Kismiss): Relieves cough and general tonic. Acorus calamus (Bacha):
            Helps in bronchial catarrh & intermittent fever. Saussurea lappa
            (Kur): It is antiseptic & disinfectant. It is very useful in
            bronchial asthma. Syzygium aromaticum (Labango): Useful in cough &
            other respiratory diseases. It prevents bad breath. Cinnamomum
            zeylanicum (Darchini): It is antibacterial & antifungal and relieves
            cough due to its soothing action. Elettaria cardamomum (Elachi): It
            is aromatic in nature and shows antimicrobial activity. Cinnamomum
            tamala (Tejpata): It is a tonic & appetizer agent. Pistacia
            integerrima (Kakra sringi): It helps in asthma. Myrica nagi (
            Kotfal): It is a remedy for sore throat. Woodfordia fruticosa
            (Daiful): It is good anti-infective agent and is useful in relieving
            cough due to its soothing action. Tulsi extract & other ingredients:
            Tulsi extract & some other ingredients are added to DEVAS syrup for
            relieving acute cough.
            <br />
            <br />
            Pregnancy: The safety of this syrup in pregnancy has not been
            studied. Therefore, it should be used with caution during pregnancy.
          </p>
          <Alert className="mt-9">
            <InfoIcon />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              The information provided is accurate to our best practices, but it
              does not replace professional medical advice. We cannot guarantee
              its completeness or accuracy. The absence of specific information
              about a drug should not be seen as an endorsement. We are not
              responsible for any consequences resulting from this information,
              so consult a healthcare professional for any concerns or
              questions.
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </>
  );
}
