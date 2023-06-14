import { AlertCircle, FileWarning, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function UniqueErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Duplicate Values</AlertTitle>
      <AlertDescription>
        User of this credentials are already registered!
      </AlertDescription>
    </Alert>
  );
}
