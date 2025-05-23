"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 mt-8">
          <Link
            href="/blogs"
            className="text-xl hover:text-purple-700 transition-colors"
            onClick={() => setOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/videos"
            className="text-xl hover:text-purple-700 transition-colors"
            onClick={() => setOpen(false)}
          >
            Videos
          </Link>
          <Link
            href="/about"
            className="text-xl hover:text-purple-700 transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
