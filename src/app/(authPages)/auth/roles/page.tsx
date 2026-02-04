"use client";

import Image from "next/image";
import role from "../../../../../public/role.svg";

import RolesSelection from "@/components/modules/profile/role-selection";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

const roles = [
  {
    name: "customer",
    role: "CUSTOMER",
    access: false,
  },
  {
    name: "Seller",
    role: "SELLER",
    access: false,
  },
  {
    name: "admin",
    role: "ADMIN",
    access: true,
  },
];

export default function RolesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isVisit = localStorage.getItem("isRole");

    if (isVisit === "true") {
      router.push("/");
    } else {
      setLoading(false);
      localStorage.setItem("isRole", "true");
    }
  }, [router]);

  if (loading) return null;

  return (
    <>
      <div className="flex gap-15 flex-col lg:flex-row items-center justify-between h-full w-full p-5">
        <Image src={role} alt="Roles" width={250} height={250} />
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-3xl font-semibold">Pick You Role</h1>
          <p className="text-md text-muted-foreground tracking-wide capitalize">
            Please pick the role you want to get access to our <b>Online</b>{" "}
            <i>shop</i>
          </p>
          <RolesSelection roles={roles} />
        </div>
      </div>
    </>
  );
}
