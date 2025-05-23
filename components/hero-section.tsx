import { Logo } from "@/components/logo"

export function HeroSection() {
  return (
    <div className="text-center py-16 md:py-24 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-900 dark:to-purple-950 rounded-lg mb-12 transition-colors">
      <div className="flex justify-center mb-6">
        <Logo className="text-5xl md:text-6xl" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Weekly .NET Update</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        The latest blogs and videos from the .NET community, updated weekly. No sign-up required.
      </p>
    </div>
  )
}
