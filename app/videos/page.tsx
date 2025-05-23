import { Suspense } from "react"
import { VideoList } from "@/components/video-list"
import { ContentSkeleton } from "@/components/content-skeleton"
import { getContent } from "@/lib/rss-service"
import { YouTubeFeedItem } from "@/lib/feed-item"

interface VideosPageProps {
  searchParams: {
    page?: string
    q?: string
  }
}

export default async function VideosPage({ searchParams }: Readonly<VideosPageProps>) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const query = searchParams.q ?? ""

  // Fetch all content on the server
  const {getVideoContent} = getContent();

  const videos = (await getVideoContent()) as YouTubeFeedItem[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">.NET Videos</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The latest .NET videos from the past week, curated from top YouTube channels in the community.
      </p>
      <Suspense fallback={<ContentSkeleton />}>
        <VideoList
          initialVideos={videos}
          initialPage={page}
          initialQuery={query}
        />
      </Suspense>
    </div>
  )
}
