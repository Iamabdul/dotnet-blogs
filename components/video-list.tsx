"use client";

import { useState } from "react";
import { ContentCard } from "@/components/content-card";
import { Pagination } from "@/components/pagination";
import { YouTubeFeedItem } from "@/lib/feed-item";

interface VideoListProps {
  initialVideos: YouTubeFeedItem[];
  initialQuery: string;
}

const pageSize = 12;

export function VideoList({
  initialVideos,
  initialQuery,
}: Readonly<VideoListProps>) {
  let filteredVideos = initialVideos;
  if (initialQuery) {
    const lowerQuery = initialQuery.toLowerCase();
    filteredVideos = initialVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(lowerQuery) ||
        video.description?.toLowerCase().includes(lowerQuery)
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / pageSize));
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  filteredVideos = filteredVideos.slice(startIndex, startIndex + pageSize);

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
