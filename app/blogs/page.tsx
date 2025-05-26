import { Suspense } from "react";
import { BlogList } from "@/components/blog-list";
import { ContentSkeleton } from "@/components/content-skeleton";
import { getContent } from "@/lib/rss-service";
import { BlogFeedItem } from "@/lib/feed-item";

interface BlogsPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function BlogsPage({
  searchParams,
}: Readonly<BlogsPageProps>) {
  const params = await searchParams;
  const query = params.q ?? "";

  // Fetch all content on the server
  const { getBlogContent } = getContent();

  // Filter to blogs only
  const blogs = (await getBlogContent()) as BlogFeedItem[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">.NET Blog Posts</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The latest .NET blog posts from the past week, curated from top sources
        in the community.
      </p>
      <Suspense fallback={<ContentSkeleton />}>
        <BlogList initialBlogs={blogs} initialQuery={query} />
      </Suspense>
    </div>
  );
}
