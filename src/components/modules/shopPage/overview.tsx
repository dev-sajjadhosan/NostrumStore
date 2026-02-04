import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function OverviewComponent({ overview }: { overview: string }) {
  return (
    <>
      <div>
        <p className="text-md tracking-wider mt-5 text-muted-foreground">
          {overview}
        </p>
        <Alert className="mt-9">
          <InfoIcon />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            The information provided is accurate to our best practices, but it
            does not replace professional medical advice. We cannot guarantee
            its completeness or accuracy. The absence of specific information
            about a drug should not be seen as an endorsement. We are not
            responsible for any consequences resulting from this information, so
            consult a healthcare professional for any concerns or questions.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
