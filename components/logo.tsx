import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("font-bold text-2xl", className)}>
      <span className="text-purple-700">DN</span>
      <span className="text-gray-800 dark:text-gray-200">B</span>
      <span className="text-purple-700">DN</span>
    </div>
  )
}
