export default function ForgotPasswordTokenPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  return (
    <div>
      <h1>hello word</h1>
      <p>{token}</p>
    </div>
  );
}
