"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface FilterBarProps {
  onFilterChange?: (filter: string) => void
  onSearchChange?: (search: string) => void
}

export function FilterBar({ onFilterChange, onSearchChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filters = [
    "All",
    "ASP.NET",
    "Blazor",
    "MAUI",
    "Entity Framework",
    "Azure",
    "C#",
    "Performance",
    ".NET Core",
    "SignalR",
  ]

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (onSearchChange) {
      onSearchChange(e.target.value)
    }
  }

  return (
    <div className="mb-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search articles and videos..."
          className="pl-10 pr-4 py-1.5 w-full border rounded-lg h-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1 text-xs font-medium whitespace-nowrap ${
              activeFilter === filter
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  )
}
