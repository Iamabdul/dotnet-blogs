import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const sitePhrase =
  "All the most recent .NET content you need, none of the subscriptions you don't.";

export function Navigation() {
  return (
    <nav className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              {sitePhrase}
            </span>
          </Link>

          {/* Mobile scrolling tagline */}
          <div className="sm:hidden flex-1 overflow-hidden mx-2">
            <div className="animate-scroll whitespace-nowrap">
              <span className="text-xs text-gray-600 dark:text-gray-400">
              {sitePhrase}
              </span>
            </div>
          </div>

<div>
          <div className="hidden md:flex gap-6 items-center">
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <ThemeToggle />
          </div></div>
        </div>
      </div>
    </nav>
  );
}
