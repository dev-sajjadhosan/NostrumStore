import { getReviews } from "@/actions/review.action";
import { getSingleMedicine } from "@/actions/user.actions";
import ShopViewClient from "@/components/modules/customer/shopview-client";

export default async function ShopDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getSingleMedicine(id);
  const { data: rdata } = await getReviews(data?.data?.id);


  return (
    <>
      <ShopViewClient data={data?.data} reviews={rdata} />
    </>
  );
}
