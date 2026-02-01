import {
  Download,
  UserPlus,
  User2,
  UserRoundCheckIcon,
  UserPlus2,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import MetricCard from "@/components/modules/admin/metric-card";

import { AdminService } from "@/services/admin.service";
import { PgOptionsRs } from "@/types/types";
import EmptyCard from "@/components/shared/empty-card";
import UserTable from "@/components/modules/admin/user-table";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: PgOptionsRs;
}) {
  const { search, page } = searchParams;
  const { data } = await AdminService.getUser({search, page});

  return (
    <div className="p-5 space-y-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Customer Management
          </h1>
          <p className="text-muted-foreground italic">
            Monitor user activity, orders, and account health.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" disabled>
            <Download className="mr-2 size-4" /> Export CSV
          </Button>
          <Button className="gap-2" disabled>
            <UserPlus className="size-4" /> Add Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Customers"
          value={data?.data?.data?.length}
          sub="Active users"
          icon={User2}
        />
        <MetricCard
          title="New This Month"
          value="null"
          sub="mull"
          icon={UserPlus2}
        />
        <MetricCard
          title="Avg. Lifetime Value"
          value="null"
          sub="null"
          icon={UserRoundCheckIcon}
        />
      </div>
      <SearchFilterBar filter={false} />
      <Card className="border-0! bg-transparent! w-full">
        <CardHeader className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center"></CardHeader>
        {data?.data?.data?.length === 0 ? (
          <EmptyCard />
        ) : (
          <UserTable data={data} />
        )}
      </Card>
    </div>
  );
}
