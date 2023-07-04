export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div>{children}</div>
      </div>
    </>
  );
}
