"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "../ui/use-toast";

export const DocUploadButton = () => (
  <UploadButton<OurFileRouter>
    endpoint="verifyDocUploader"
    onClientUploadComplete={(res) => {
      return toast({
        title: "Document Uploaded",
        description: "Your verification document is uploaded successfully!",
      });
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.

      alert(`ERROR! ${error.message}`);

      return toast({
        title: "Upload Error",
        description: "Your upload could not be completed. Please try again..",
        variant: "destructive",
      });
    }}
  />
);
