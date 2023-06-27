export default function CompanyLayout({
  children,
  addJobModal,
}: {
  children: React.ReactNode;
  addJobModal: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div>{children}</div>
        {addJobModal}
      </div>
    </>
  );
}
