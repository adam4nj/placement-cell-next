import { getStudent } from "@/actions/jobs";
import StudentProfileForm from "@/components/user/studentProfileForm";

const StudentProfilePage = async () => {
  const student = await getStudent();
  return (
    <>
      <StudentProfileForm student={student} />
    </>
  );
};

export default StudentProfilePage;
