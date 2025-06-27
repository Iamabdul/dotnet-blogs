import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedItem, FeedType, YouTubeFeedItem } from "@/lib/feed-item";
import Image from "next/image";

interface FeaturedContentProps {
  featuredContent: FeedItem[];
}

export function FeaturedContent({
  featuredContent,
}: Readonly<FeaturedContentProps>) {
  const getThumbnail = (content: FeedItem) =>
    content.feedType === FeedType.youtube
      ? (content as YouTubeFeedItem)?.thumbnail ?? "/placeholder.svg"
      : "/placeholder.svg";
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Featured Content</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {featuredContent.map((content) => (
          <Card key={content.link} className="overflow-hidden">
            <Image
              src={
                getThumbnail(content)
              }
              alt={content.title}
              width={600}
              height={300}
              className="w-full object-cover"
            />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {content.feedType === FeedType.youtube ? "Video" : "Blog"}
                </span>
              </div>
              <CardTitle className="line-clamp-2">
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-700"
                >
                  {content.title}
                </a>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
