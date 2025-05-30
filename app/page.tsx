import { Suspense } from "react";
import { ContentSkeleton } from "@/components/content-skeleton";
import { FilterBar } from "@/components/filter-bar";
import { WhatsHot } from "@/components/whats-hot";
import { QuickTips } from "@/components/quick-tips";
import { VideoCard } from "@/components/video-card";
import { BlogCard } from "@/components/blog-card";
import { FeaturedArticle } from "@/components/featured-article";
import { getContent } from "@/lib/rss-service";
import { BlogFeedItem, FeedType, YouTubeFeedItem } from "@/lib/feed-item";

export default async function Home() {
  // Fetch content on the server
  let { getAllContent } = getContent();

  const allContent = await getAllContent();

  // Sort by date (newest first)
  allContent.sort((a, b) => {
    const dateA =
      a.feedType === FeedType.youtube
        ? (a as YouTubeFeedItem).published
        : (a as BlogFeedItem).pubDate;

    const dateB =
      b.feedType === FeedType.youtube
        ? (b as YouTubeFeedItem).published
        : (b as BlogFeedItem).pubDate;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Get videos and blogs
  const videos = allContent.filter(
    (item) => item.feedType === FeedType.youtube
  );
  const blogs = allContent.filter((item) => item.feedType === FeedType.blog);

  // Get featured content (first blog with most recent date)
  const featuredContent = blogs.length > 0 ? blogs[0] : null;

  // Generate random view counts and durations for videos
  const getRandomViews = () =>
    `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 9)}k`;
  const getRandomDuration = () =>
    `${Math.floor(Math.random() * 30 + 5)}:${Math.floor(Math.random() * 59)
      .toString()
      .padStart(2, "0")}`;

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
                  views={getRandomViews()}
                  duration={getRandomDuration()}
                />
              ))}
            </div>

            {/* Second row of videos/blogs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {videos.slice(2, 3).map((video, index) => (
                <VideoCard
                  key={`${video.link}-${index}`}
                  content={video}
                  views={getRandomViews()}
                  duration={getRandomDuration()}
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
                  views={getRandomViews()}
                  duration={getRandomDuration()}
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
                  views={getRandomViews()}
                  duration={getRandomDuration()}
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
