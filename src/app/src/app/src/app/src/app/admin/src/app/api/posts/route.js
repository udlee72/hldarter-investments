import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function POST(request) {
  try {
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    const file = formData.get('file')

    let fileUrl = null

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${Date.now()}-${file.name}`

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
        })
      )

      fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
    }

    const result = await pool.query(
      'INSERT INTO posts (title, content, file_url, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [title, content, fileUrl]
    )

    return NextResponse.json({ success: true, post: result.rows[0] })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC')
    return NextResponse.json({ posts: result.rows })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
