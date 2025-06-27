import { Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickTips() {
  const tips = [
    "Use record types for immutable data",
    "Leverage nullable reference types",
    "Optimize with Span<T> and Memory<T>",
    "Use async/await properly",
    "Take advantage of pattern matching",
  ]

  return (
    <Card className="hover:opacity-40">
      <CardHeader className="pb-1 pt-3 px-3">
        <CardTitle className="text-base sm:text-lg flex items-center text-blue-600">
          <Lightbulb className="mr-2 h-4 w-4" />
          Quick .NET Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 pb-3">
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-2 w-2 mt-1.5 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-xs sm:text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
