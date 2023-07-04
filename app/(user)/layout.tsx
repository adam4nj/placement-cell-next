export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-fit">{children}</div>
    </div>
  );
}
