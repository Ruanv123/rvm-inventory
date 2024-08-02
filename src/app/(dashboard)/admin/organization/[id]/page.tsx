export default async function OrganizationDetail({
  params,
}: {
  params: { id: number };
}) {
  return (
    <>
      <h1>dashboard {params.id}</h1>
    </>
  );
}
