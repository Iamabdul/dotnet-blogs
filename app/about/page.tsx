export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 prose prose-slate max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About .NET Hub</h1>
      <p className="text-lg mb-4">
        Welcome to .NET Hub, your one-stop destination for staying up-to-date with the .NET ecosystem. We aggregate
        high-quality content from various sources to bring you the latest news, tutorials, and insights about .NET
        development.
      </p>
      <p className="text-lg mb-4">
        Our mission is to make it easier for .NET developers to discover valuable content without the need for multiple
        subscriptions or accounts. We believe in open access to knowledge and continuous learning.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Curated blog posts from leading .NET developers and community members</li>
        <li>Educational videos from trusted YouTube channels</li>
        <li>Latest updates from the .NET ecosystem</li>
        <li>Resources for both beginners and experienced developers</li>
      </ul>
    </div>
  )
}
