import { Loader2 } from "lucide-react";

export default function RoomDetailSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-sm text-accent-light">Đang tải...</p>
      </div>
    </div>
  );
}
