import './globals.css'

export const metadata = {
  title: 'HLDarter Investments',
  description: 'Investment research and ideas platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">HLDarter Investments</h1>
            <div className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
