import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { FeedItem } from "@/lib/feed-item";

interface FeaturedArticleProps {
  content: FeedItem;
}

export function FeaturedArticle({ content }: Readonly<FeaturedArticleProps>) {
  const formattedDate = formatDistanceToNow(new Date(content.published), {
    addSuffix: true,
  });

  const imageSrc =
    content.thumbnail ??
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(
      content.title
    )}`;

  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <Image
          src={imageSrc || "/placeholder.png"}
          alt={content.title}
          width={600}
          height={400}
          className="w-full h-48 sm:h-56 object-cover"
          unoptimized={imageSrc.startsWith("http")}
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="bg-red-500 text-white border-none flex items-center text-xs"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        </div>
      </div>
      <CardContent className="p-3">
        <h2 className="font-bold text-base sm:text-lg mb-1">
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-colors"
          >
            {content.title}
          </a>
        </h2>
        <p className="text-xs text-gray-600 mb-2 line-clamp-3">
          {content.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
