export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-[5%] py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(107,63,160,0.25)_0%,transparent_65%)]" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
