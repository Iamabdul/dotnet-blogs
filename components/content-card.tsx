"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { BlogFeedItem, FeedItem, FeedType, YouTubeFeedItem } from "@/lib/feed-item"

interface ContentCardProps {
  content: FeedItem
}

export function ContentCard({ content }: Readonly<ContentCardProps>) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const date = content.feedType === FeedType.youtube ? (content as YouTubeFeedItem).published : (content as BlogFeedItem).pubDate;
  const isYoutube = content.feedType == FeedType.youtube;

  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })

  // Standardized placeholder image approach
  const imageSrc = imageError
    ? `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(content.title)}`
    : content.thumbnail ?? `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(content.title)}`

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
            src={imageSrc || "/placeholder.svg"}
            alt={content.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            onError={() => {
              console.error(`Image error for ${content.title}: ${imageSrc}`)
              setImageError(true)
            }}
            onLoad={() => setImageLoaded(true)}
            unoptimized={imageSrc.startsWith("http")} // Skip optimization for external URLs
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <p className="text-sm text-gray-500">Loading image...</p>
            </div>
          )}
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
  )
}
