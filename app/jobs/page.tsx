import JobItem from "@/components/JobItem";
import { MainNav } from "@/components/Nav";



const JobsPage = () => {
  const navItems = {
    mainNav: [
      {
        title: "Documentation",
        href: "/docs",
      },
    ],
  };
  return (
    <div>
      <MainNav items={navItems.mainNav} />
      <JobItem id={2} title="title 1" desc="desc 1" location="location 1" />
    </div>
  );
};

export default JobsPage;
