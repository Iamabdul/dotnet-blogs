import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { RecentContent } from "@/components/recent-content";
import { ContentSkeleton } from "@/components/content-skeleton";
import { getContent } from "@/lib/rss-service";
import { FeedType } from "@/lib/feed-item";

export default async function Home() {
  // Fetch content on the server
  const { getAllContent } = getContent();
  const allContent = await getAllContent();

  // Get recent blogs and videos
  const recentBlogs = allContent
    .filter((item) => item.feedType === FeedType.blog)
    .slice(0, 4);

  const recentVideos = allContent
    .filter((item) => item.feedType === FeedType.youtube)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <Suspense fallback={<ContentSkeleton />}>
        <RecentContent
          initialBlogs={recentBlogs}
          initialVideos={recentVideos}
        />
      </Suspense>
    </div>
  );
}
