import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, content, date } = data;

    // Create a valid slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Define the file path for the new markdown file
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

    // Define the frontmatter and content for the markdown file
    const frontmatter = {
      title,
      date: date || new Date().toISOString(),
    };

    const markdownContent = matter.stringify(content, frontmatter);

    // Write the markdown file
    fs.writeFileSync(filePath, markdownContent);

    return NextResponse.json({ message: 'Blog post created successfully!', slug });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'Failed to create blog post' }, { status: 500 });
  }
}
