"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const DocumentUploadForm = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-100 p-10 drop-shadow-md">
      <UploadDropzone<OurFileRouter>
        endpoint="verifyDocUploader"
        onClientUploadComplete={(res) => {
          router.refresh();
          return toast({
            title: "Upload Complete!",
            description: `Your file ${res?.map(
              (file) => file.fileKey
            )} has been uploaded!`,
          });
        }}
        onUploadError={(error: Error) => {
          return toast({
            title: "An Error Occurred!",
            description:
              "The given document could not be uploaded. Please try again.",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
};

export default DocumentUploadForm;
