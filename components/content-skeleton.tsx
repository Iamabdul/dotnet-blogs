import { Skeleton } from "@/components/ui/skeleton";

export function ContentSkeleton() {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={`skeleton-${i*100}-key`} className="h-6 w-16 rounded-full" />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
