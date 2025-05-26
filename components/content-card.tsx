"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  BlogFeedItem,
  FeedItem,
  FeedType,
  YouTubeFeedItem,
} from "@/lib/feed-item";

interface ContentCardProps {
  content: FeedItem;
}

export function ContentCard({ content }: Readonly<ContentCardProps>) {
  const [isHovered, setIsHovered] = useState(false);

  const date =
    content.feedType === FeedType.youtube
      ? (content as YouTubeFeedItem).published
      : (content as BlogFeedItem).pubDate;
  const isYoutube = content.feedType == FeedType.youtube;

  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
  const getThumbnail = (content: FeedItem) =>
    content.feedType === FeedType.youtube
      ? (content as YouTubeFeedItem)?.thumbnail ?? "/placeholder.svg"
      : "/placeholder.svg";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-shadow duration-200 hover:shadow-md dark:hover:shadow-purple-900/10">
        <div className="relative">
          <Image
            src={getThumbnail(content)}
            alt={content.title}
            width={100}
            height={50}
            className="w-full h-48 object-cover transition-transform duration-300"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div className="absolute top-2 right-2">
            <Badge variant={!isYoutube ? "default" : "secondary"}>
              {!isYoutube ? "Blog" : "Video"}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">
            <a
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-700 transition-colors"
            >
              {content.title}
            </a>
          </CardTitle>
          <CardDescription>
            {formattedDate} ·{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
