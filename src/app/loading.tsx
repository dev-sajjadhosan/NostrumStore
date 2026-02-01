import { Loader } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-18 w-18 animate-spin text-primary" />

        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-normal tracking-wide">
            Nostrum Store
          </h2>
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading ...
          </p>
        </div>
      </div>
    </div>
  );
}
