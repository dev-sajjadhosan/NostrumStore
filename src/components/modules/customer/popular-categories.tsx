import { Card, CardContent } from "@/components/ui/card";
import { getCategories } from "@/actions/admin.action";
import Link from "next/link";
const getCategoryEmoji = (name: string): string => {
  const normalized = name.toLowerCase();

  const emojiMap: Record<string, string> = {
    psychiatry: "🧠",
    neurology: "⚡",
    cardiology: "🫀",
    gastrointestinal: "🧪",
    respiratory: "🫁",
    antidiabetics: "💉",
    "diabetes care": "🩸",
    antibiotics: "🦠",
    "pain-relief": "🌡️",
    "pain relief": "🌡️",
    digestive: "🤢",
    vitamins: "🍏",
    skincare: "🧴",
    skin: "🧴",
    orthopedic: "🦴",
    maternity: "🤰",
    eye: "👁️",
    dental: "🪥",
  };
  const match = Object.keys(emojiMap).find((key) => normalized.includes(key));

  return match ? emojiMap[match] : "💊"
};

export default async function PopularCategories() {
  const { data } = await getCategories({ limit: 12 });
  const categories: [] = data?.data?.data;

  return (
    <section className="w-full text-center space-y-7">
      <h1 className="text-3xl font-medium mb-10">Popular Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {categories?.map((cat: any, idx: number) => (
          <Link key={idx} href={`/shop?search=${cat?.slug}`}>
            <Card className="h-40 cursor-pointer transition-all duration-200 hover:bg-accent/60 hover:scale-105 border-primary/10">
              <CardContent className="flex flex-col gap-3 items-center justify-center h-full">
                <span className="text-5xl" role="img" aria-label={cat?.name}>
                  {getCategoryEmoji(cat?.name)}
                </span>
                <h3 className="text-md font-medium tracking-wide capitalize">
                  {cat?.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
