import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  BlogFeedItem,
  FeedItem,
  FeedType,
  YouTubeFeedItem,
} from "@/lib/feed-item";

interface BlogCardProps {
  content: FeedItem;
}

export function BlogCard({ content }: Readonly<BlogCardProps>) {
  const contentDate =
    content.feedType === FeedType.youtube
      ? (content as YouTubeFeedItem).published
      : (content as BlogFeedItem).pubDate;
  const formattedDate = formatDistanceToNow(new Date(contentDate), {
    addSuffix: true,
  });

  // Standardized placeholder image approach
  const imageSrc =
    content.thumbnail ??
    `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(
      content.title
    )}`;


  return (
    <Card className="overflow-hidden h-full hover:opacity-40 transition-shadow duration-200">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={content.title}
          width={400}
          height={200}
          className="w-full h-36 sm:h-40 object-cover"
          unoptimized={imageSrc.startsWith("http")}
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-colors"
          >
            {content.title}
          </a>
        </h3>
        <p className="text-xs text-gray-500 mb-1 line-clamp-2">
          {content.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
