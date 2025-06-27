"use client";

import { useState } from "react";
import { ContentCard } from "@/components/content-card";
import { Pagination } from "@/components/pagination";
import { BlogFeedItem } from "@/lib/feed-item";

interface BlogListProps {
  initialBlogs: BlogFeedItem[];
  initialQuery: string;
}

const pageSize = 12;

export function BlogList({
  initialBlogs,
  initialQuery,
}: Readonly<BlogListProps>) {
  let filteredBlogs = initialBlogs;
  if (initialQuery) {
    const lowerQuery = initialQuery.toLowerCase();
    filteredBlogs = initialBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowerQuery) ||
        blog.description?.toLowerCase().includes(lowerQuery)
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / pageSize));
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  filteredBlogs = filteredBlogs.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or check back later for new content.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBlogs.map((blog, index) => (
              <ContentCard key={blog.link + `--->${index}`} content={blog} />
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
