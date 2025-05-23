import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// This would typically come from your content providers
const FEATURED_CONTENT = [
  {
    id: 1,
    title: "What's New in .NET 8 - Performance Improvements",
    type: "video",
    author: ".NET Foundation",
    views: "125K views",
    image: "/placeholder.svg?height=300&width=600",
    url: "https://youtube.com/example1",
  },
  {
    id: 2,
    title: "Building High-Performance APIs with Minimal APIs",
    type: "blog",
    author: "Scott Hanselman",
    date: "Feb 20, 2024",
    image: "/placeholder.svg?height=300&width=600",
    url: "https://example.com/blog1",
  },
]

export function FeaturedContent() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Featured Content</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {FEATURED_CONTENT.map((content) => (
          <Card key={content.id} className="overflow-hidden">
            <Image
              src={content.image || "/placeholder.svg"}
              alt={content.title}
              width={600}
              height={300}
              className="w-full object-cover"
            />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {content.type === "video" ? "Video" : "Blog"}
                </span>
              </div>
              <CardTitle className="line-clamp-2">
                <a href={content.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
                  {content.title}
                </a>
              </CardTitle>
              <CardDescription>
                {content.author} · {content.views || content.date}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
