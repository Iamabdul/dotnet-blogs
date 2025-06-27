import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { YouTubeFeedItem } from "@/lib/feed-item";

interface VideoCardProps {
  content: YouTubeFeedItem;
}

export function VideoCard({ content }: Readonly<VideoCardProps>) {
  const contentDate = content.published;

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
    <Card className="hover:opacity-40 overflow-hidden h-full hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <Image
          src={imageSrc || "/placeholder.png"}
          alt={content.title}
          width={400}
          height={225}
          className="w-full h-36 sm:h-40 object-cover"
          unoptimized={imageSrc.startsWith("http")}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-2">
            <Play className="h-6 w-6 text-purple-600" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="bg-red-500 text-white border-none text-xs"
          >
            Video
          </Badge>
        </div>
        {content.views && (
          <div className="absolute bottom-2 left-2">
            <Badge
              variant="secondary"
              className="bg-black bg-opacity-70 text-white border-none text-xs"
            >
              {content.views} views
            </Badge>
          </div>
        )}
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
