export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 justify-between">
          <div className="text-center">
            <h3 className="font-bold mb-4">.NET Hub</h3>
            <p className="text-sm text-gray-600">
              Your source for the latest .NET development content. No subscriptions required.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-4">Resources</h3>
            <div className="grid gap-2">
              <a
                href="https://learn.microsoft.com/dotnet"
                className="text-sm text-gray-600 hover:text-purple-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Learn
              </a>
              <a
                href="https://dotnet.microsoft.com/download"
                className="text-sm text-gray-600 hover:text-purple-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download .NET
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} .NET Hub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
