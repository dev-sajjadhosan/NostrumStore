"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { LucideIcon, Store, User2, UserStar } from "lucide-react";
import { updateUserRoleAction } from "@/actions/user-actions";

const iconMap = {
  CUSTOMER: User2,
  SELLER: Store,
  ADMIN: UserStar,
};

interface RolesSelectionProps {
  roles: {
    name: string;
    role: string;
    access: boolean;
  }[];
}

export default function RolesSelection({ roles }: RolesSelectionProps) {
  const router = useRouter();
  const handleRoleUpdate = async (role: string) => {
    const toastID = toast.loading("Setting up your account...");
    try {
      const res = await updateUserRoleAction(role);
      toast.success("Success!", { id: toastID });
      if (res?.data) {
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role. Try again.", { id: toastID });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-5 w-full mt-7">
      {roles.map(({ name, role, access }, idx) => {
        const Icon = iconMap[role as keyof typeof iconMap];

        return (
          <Button
            key={idx}
            disabled={access}
            onClick={() => handleRoleUpdate(role)}
          >
            <Icon className="mr-2" />
            <span className="capitalize">{name}</span>
          </Button>
        );
      })}
    </div>
  );
}
