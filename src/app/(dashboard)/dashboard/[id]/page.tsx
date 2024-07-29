export default function DashboardDetails({
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
