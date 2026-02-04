import { getCategories } from "@/actions/admin.action";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getCategoryEmoji = (name: string): string => {
  const normalized = name.toLowerCase();
  const emojiMap: Record<string, string> = {
    psychiatry: "🧠", neurology: "⚡", cardiology: "🫀", gastrointestinal: "🧪",
    respiratory: "🫁", antidiabetics: "💉", "diabetes care": "🩸", antibiotics: "🦠",
    "pain relief": "🌡️", digestive: "🤢", vitamins: "🍏", skincare: "🧴",
    orthopedic: "🦴", maternity: "🤰", eye: "👁️", dental: "🪥",
  };
  const match = Object.keys(emojiMap).find((key) => normalized.includes(key));
  return match ? emojiMap[match] : "💊";
};

export default async function ShopCategoryTabs({ selectedCategory }: { selectedCategory?: string }) {
  const response = await getCategories({ limit: 20 });
  const categories = response?.data?.data?.data || [];

  return (
    <div className="w-full bg-background pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Browse Categories</h2>
        <Link href="/shop" className="text-sm text-primary hover:underline font-medium">
          Clear Filters
        </Link>
      </div>

    
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <Link href="/shop">
          <div className={cn(
            "flex flex-col items-center justify-center min-w-50 h-24 rounded-2xl border transition-all duration-200 cursor-pointer",
            !selectedCategory ? "bg-primary/5 shadow-sm" : "border-secondary bg-secondary/20 hover:border-primary/40"
          )}>
            <span className="text-2xl mb-1">🏪</span>
            <span className="text-xs font-bold uppercase">All Items</span>
          </div>
        </Link>

        {categories.map((cat: any) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <Link key={cat.id} href={`/shop?search=${cat?.slug}`}>
              <div className={cn(
                "flex flex-col items-center justify-center h-24 rounded-2xl border transition-all duration-200 cursor-pointer group",
                isActive ? "border-primary bg-primary/5 shadow-sm min-w-50" : "border-secondary bg-secondary/20 hover:border-primary/40 min-w-40"
              )}>
                <span className={cn(
                  "text-2xl mb-1 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "scale-110" : ""
                )}>
                  {getCategoryEmoji(cat.name)}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter text-center px-2 line-clamp-1">
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}