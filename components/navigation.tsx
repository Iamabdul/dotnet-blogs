import Link from "next/link"
import { Search } from "@/components/search"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"

export function Navigation() {
  return (
    <nav className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="hidden md:block flex-1 max-w-sm mx-8">
            <Search />
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
      <div className="md:hidden border-t dark:border-gray-800 py-2 px-4">
        <Search />
      </div>
    </nav>
  )
}
