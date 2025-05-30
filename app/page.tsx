import { Suspense } from "react";
import { ContentSkeleton } from "@/components/content-skeleton";
import { FilterBar } from "@/components/filter-bar";
import { WhatsHot } from "@/components/whats-hot";
import { QuickTips } from "@/components/quick-tips";
import { VideoCard } from "@/components/video-card";
import { BlogCard } from "@/components/blog-card";
import { FeaturedArticle } from "@/components/featured-article";
import { getContent } from "@/lib/rss-service";
import { BlogFeedItem, FeedItem, FeedType, YouTubeFeedItem } from "@/lib/feed-item";

  const getDateFrom = (item: FeedItem) => item.feedType === FeedType.youtube
        ? (item as YouTubeFeedItem).published
        : (item as BlogFeedItem).pubDate;

  const getLatestDate = (feedItemA: FeedItem, feedItemB: FeedItem) => {
        const dateA = getDateFrom(feedItemA);
        const dateB = getDateFrom(feedItemB);
        return new Date(dateB).getTime() - new Date(dateA).getTime();
  }

export default async function Home() {
  // Fetch content on the server
  let { getAllContent } = getContent();

  const allContent = await getAllContent();

  // Sort by date (newest first)
  allContent.sort(getLatestDate);

  // Get videos and blogs
  const videos = allContent.filter(
    (item) => item.feedType === FeedType.youtube
  ) as YouTubeFeedItem[];
  const blogs = allContent.filter((item) => item.feedType === FeedType.blog);

  // Get featured content (first blog with most recent date)
  const latestBlog = blogs[0];
  const latestVideo = videos[0];

  const latestBlogDate = latestBlog && getDateFrom(latestBlog);
  const latestVideoDate = latestVideo && getDateFrom(latestVideo);

  const featuredContent = latestBlogDate > latestVideoDate ? latestBlog : latestVideo;

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <FilterBar />

      <Suspense fallback={<ContentSkeleton />}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Left sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <WhatsHot />
            <QuickTips />
            {/* Mobile-only featured content */}
            <div className="lg:hidden">
              {featuredContent && <FeaturedArticle content={featuredContent} />}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-6 space-y-4">
            {/* First row of videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {videos.slice(0, 2).map((video, index) => (
                <VideoCard
                  key={`${video.link}-${index}`}
                  content={video}
                  views={video.views}
                />
              ))}
            </div>

            {/* Second row of videos/blogs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {videos.slice(2, 3).map((video, index) => (
                <VideoCard
                  key={`${video.link}-${index}`}
                  content={video}
                  views={video.views}
                />
              ))}
              {blogs.slice(1, 2).map((blog, index) => (
                <BlogCard
                  key={`${blog.link}-${index}`}
                  content={blog}
                  tag="Entity Framework"
                />
              ))}
            </div>

            {/* Third row of videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {videos.slice(3, 5).map((video, index) => (
                <VideoCard
                  key={`${video.link}-${index}`}
                  content={video}
                  views={video.views}
                />
              ))}
            </div>

            {/* Fourth row of blogs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {blogs.slice(2, 4).map((blog, index) => (
                <BlogCard
                  key={`${blog.link}-${index}`}
                  content={blog}
                  tag={index === 0 ? "ASP.NET" : "MAUI"}
                />
              ))}
            </div>

            {/* Fifth row of mixed content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {videos.slice(5, 6).map((video, index) => (
                <VideoCard
                  key={`${video.link}-${index}`}
                  content={video}
                  views={video.views}
                />
              ))}
              {blogs.slice(4, 5).map((blog, index) => (
                <BlogCard 
                key={`${blog.link}-${index}`} 
                content={blog} tag="Azure" />
              ))}
            </div>
          </div>

          {/* Right sidebar - featured content (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            {featuredContent && <FeaturedArticle content={featuredContent} />}

            {/* Additional content in right sidebar */}
            <div className="space-y-4">
              {blogs.slice(5, 7).map((blog, index) => (
                <BlogCard 
                key={`${blog.link}-${index}`}  
                content={blog} tag="C#" />
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
