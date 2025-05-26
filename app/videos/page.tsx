import { Suspense } from "react";
import { VideoList } from "@/components/video-list";
import { ContentSkeleton } from "@/components/content-skeleton";
import { getContent } from "@/lib/rss-service";
import { YouTubeFeedItem } from "@/lib/feed-item";

interface VideosPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function VideosPage({
  searchParams,
}: Readonly<VideosPageProps>) {
  const params = await searchParams;
  const query = params.q ?? "";

  const { getVideoContent } = getContent();

  const videos = (await getVideoContent()) as YouTubeFeedItem[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">.NET Videos</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The latest .NET videos from the past week, curated from top YouTube
        channels in the community.
      </p>
      <Suspense fallback={<ContentSkeleton />}>
        <VideoList initialVideos={videos} initialQuery={query} />
      </Suspense>
    </div>
  );
}
