/* eslint-disable @next/next/no-img-element */
import prisma from "@/lib/db";

export default async function OrganizationDetail({
  params,
}: {
  params: { id: number };
}) {
  const organization = await prisma.organization.findUnique({
    where: { id: +params.id },
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
          {/* <p>{organization?.description}</p> */}
        </div>
      </div>
    </>
  );
}
