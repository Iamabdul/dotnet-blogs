"use client";

import { useState, useEffect } from "react";
import { ContentCard } from "@/components/content-card";
import { Pagination } from "@/components/pagination";
import { YouTubeFeedItem } from "@/lib/feed-item";

interface VideoListProps {
  initialVideos: YouTubeFeedItem[];
  initialPage: number;
  initialQuery: string;
}

export function VideoList({
  initialVideos,
  initialPage,
  initialQuery,
}: Readonly<VideoListProps>) {

  const [videos, setVideos] = useState<YouTubeFeedItem[]>(initialVideos);
  const [filteredVideos, setFilteredVideos] = useState<YouTubeFeedItem[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 12;

  useEffect(() => {

    // Apply search query
    if (initialQuery) {
      const lowerQuery = initialQuery.toLowerCase();
      setVideos(videos.filter(
        (video) =>
          video.title.toLowerCase().includes(lowerQuery) ||
          video.description?.toLowerCase().includes(lowerQuery)
      ));
    }

    // Calculate total pages
    setTotalPages(Math.max(1, Math.ceil(videos.length / pageSize)));

    // Apply pagination
    const startIndex = (currentPage - 1) * pageSize;
    setFilteredVideos(videos.slice(startIndex, startIndex + pageSize));
  }, [videos, initialQuery, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (

    <div>
       {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No videos found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or check back later for new content.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video, index) => (
              <ContentCard key={video.link + `--->${index}`} content={video} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
