"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(currentQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      params.delete("page");

      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    setQuery("");

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete("q");
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      <Input
        type="search"
        placeholder="Search .NET content..."
        className="pl-10 pr-10 rounded-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
          onClick={clearSearch}
          disabled={isPending}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </form>
  );
}
