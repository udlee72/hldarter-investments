'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'your-secure-password') {
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (file) formData.append('file', file)

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('Post published successfully!')
      setTitle('')
      setContent('')
      setFile(null)
    } else {
      alert('Failed to publish post')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content (Markdown supported)"
          className="w-full p-2 border rounded mb-4 h-64"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Publish Post</button>
      </form>
    </div>
  )
}
