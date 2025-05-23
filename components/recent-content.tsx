"use client";

import { useState } from "react";
import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FeedItem } from "@/lib/feed-item";

interface RecentContentProps {
  initialBlogs: FeedItem[];
  initialVideos: FeedItem[];
}

export function RecentContent({
  initialBlogs,
  initialVideos,
}: Readonly<RecentContentProps>) {
  const [recentBlogs] = useState<FeedItem[]>(initialBlogs);
  const [recentVideos] = useState<FeedItem[]>(initialVideos);

  return (
    <div className="space-y-16">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Blog Posts</h2>
          <Link href="/blogs">
            <Button variant="ghost" className="group">
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {recentBlogs.length > 0 ? (
            recentBlogs.map((blog) => (
              <ContentCard key={blog.title} content={blog} />
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No recent blog posts found.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Videos</h2>
          <Link href="/videos">
            <Button variant="ghost" className="group">
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {recentVideos.length > 0 ? (
            recentVideos.map((video) => (
              <ContentCard key={video.title} content={video} />
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No recent videos found.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
