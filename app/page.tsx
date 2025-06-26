import { Suspense } from "react";
import { ContentSkeleton } from "@/components/content-skeleton";
import { WhatsHot } from "@/components/whats-hot";
import { QuickTips } from "@/components/quick-tips";
import { VideoCard } from "@/components/video-card";
import { BlogCard } from "@/components/blog-card";
import {
  BlogFeedItem,
  FeedItem,
  YouTubeFeedItem,
} from "@/lib/feed-item";
import { readJsonFromBucket } from "@/lib/read-from-bucket";

const getDateFrom = (item: FeedItem) => item.published;

const getLatestDate = (feedItemA: FeedItem, feedItemB: FeedItem) => {
  const dateA = getDateFrom(feedItemA);
  const dateB = getDateFrom(feedItemB);
  return new Date(dateB).getTime() - new Date(dateA).getTime();
};

const getLatestFeedItem = (feedItemA: FeedItem, feedItemB: FeedItem) => {
  const dateA = feedItemA && getDateFrom(feedItemA);
  const dateB = feedItemB && getDateFrom(feedItemB);

  return dateA > dateB ? feedItemA : feedItemB;
};

const isVideo = (item: FeedItem) => item.feedType === `youtube`;

export default async function Home() {
  // Fetch content on the server

  const allContent = await readJsonFromBucket();

  // Sort by date (newest first)
  allContent!.sort(getLatestDate);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <Suspense fallback={<ContentSkeleton />}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Main content */}
          {/* <WhatsHot />
          <QuickTips /> */}
          {allContent!.map((item, index) => {
            if (isVideo(item)) {
              const video = item as YouTubeFeedItem;
              return (
                <VideoCard key={`${video.link}-${index}`} content={video} />
              );
            } else {
              const blog = item as BlogFeedItem;
              return <BlogCard key={`${item.link}-${index}`} content={blog} />;
            }
          })}
        </div>
      </Suspense>
    </div>
  );
}
