"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X } from "lucide-react"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  onTagClear: () => void
}

export function TagFilter({ tags, selectedTags, onTagSelect, onTagClear }: TagFilterProps) {
  const [showAllTags, setShowAllTags] = useState(false)
  const initialTagsToShow = 10

  const sortedTags = [...tags].sort()
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, initialTagsToShow)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Filter by tags</h3>
        {selectedTags.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onTagClear} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {visibleTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {tags.length > initialTagsToShow && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAllTags(!showAllTags)}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {showAllTags ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" /> Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" /> Show all ({tags.length})
            </>
          )}
        </Button>
      )}
    </div>
  )
}
