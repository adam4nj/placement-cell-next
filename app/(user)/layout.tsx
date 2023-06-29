export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-fit mx-5">{children}</div>
    </>
  );
}
