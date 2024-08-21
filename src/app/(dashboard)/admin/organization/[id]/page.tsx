/* eslint-disable @next/next/no-img-element */
import { Loader } from "@/components/shared/loader";
import { UserTable } from "@/components/tables/organization/user-table";
import prisma from "@/lib/db";
import { Suspense } from "react";

export default async function OrganizationDetail({
  params,
}: {
  params: { id: number };
}) {
  const organization = await prisma.organization.findUnique({
    where: { id: +params.id },
  });

  const users = await prisma.user.findMany({
    where: { organizationId: +params.id },
    skip: 0,
    take: 5,
  });

  return (
    <>
      <h1>Organization: {organization?.name}</h1>

      <div className="flex gap-10 items-center">
        <img
          src={organization?.imageUrl || ""}
          alt={organization?.name}
          className="rounded-md border"
          width={150}
          height={150}
        />
        <div className="grid items-start">
          <h3>{organization?.name}</h3>
          <p>{organization?.description}</p>
        </div>
      </div>

      <div className="mt-5 w-full">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          }
        >
          <UserTable user={users} />
        </Suspense>
      </div>
    </>
  );
}
