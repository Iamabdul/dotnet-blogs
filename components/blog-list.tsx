"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ContentCard } from "@/components/content-card";
import { Pagination } from "@/components/pagination";
import { TagFilter } from "@/components/tag-filter";
import { BlogFeedItem } from "@/lib/feed-item";

interface BlogListProps {
  initialBlogs: BlogFeedItem[];
  initialPage: number;
  initialQuery: string;
}

export function BlogList({
  initialBlogs,
  initialPage,
  initialQuery,
}: Readonly<BlogListProps>) {
  const [blogs, setBlogs] = useState<BlogFeedItem[]>(initialBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogFeedItem[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 12;

  useEffect(() => {
    // Apply search query
    if (initialQuery) {
      const lowerQuery = initialQuery.toLowerCase();
      setBlogs(
        blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(lowerQuery) ??
            blog.description?.toLowerCase().includes(lowerQuery)
        )
      );
    }

    // Calculate total pages
    setTotalPages(Math.max(1, Math.ceil(blogs.length / pageSize)));

    // Apply pagination
    const startIndex = (currentPage - 1) * pageSize;
    setFilteredBlogs(blogs.slice(startIndex, startIndex + pageSize));
  }, [blogs, initialQuery, currentPage, pageSize]);

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
