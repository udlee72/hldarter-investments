export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">HLDarter Investments</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to my investment research and ideas platform.
        </p>
        
        <div className="grid gap-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Latest Reports</h2>
            <p className="text-gray-600">Reports will appear here...</p>
          </section>
        </div>
      </div>
    </main>
  )
}
