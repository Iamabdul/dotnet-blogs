import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WhatsHot() {
  const hotTopics = [
    {
      id: 1,
      title: ".NET 8 Performance Breakthrough",
      tag: "Performance",
    },
    {
      id: 2,
      title: "Blazor WebAssembly vs Server",
      tag: "Blazor",
    },
    {
      id: 3,
      title: "MAUI Cross-Platform Magic",
      tag: "MAUI",
    },
    {
      id: 4,
      title: "C# 12 New Features",
      tag: "C#",
    },
    {
      id: 5,
      title: "ASP.NET Core Minimal APIs",
      tag: "ASP.NET",
    },
  ]

  return (
    <Card className="hover:opacity-40">
      <CardHeader className="pb-1 pt-3 px-3">
        <CardTitle className="text-base sm:text-lg flex items-center text-red-600">
          <TrendingUp className="mr-2 h-4 w-4" />
          What&apos;s Hot in .NET
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 pb-3">
        <ul className="space-y-2">
          {hotTopics.map((topic) => (
            <li key={topic.id} className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium line-clamp-1 mr-2">{topic.title}</span>
              <Badge variant="outline" className="text-xs shrink-0">
                {topic.tag}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
