import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

type Post = {
  slug: string;
  title: string;
  date: string;
};

export default function PostsPage() {
  const posts: Post[] = getAllPosts();

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
      {posts.length === 0 && <p className="text-center">No posts available.</p>}
      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <Link href={`/posts/${post.slug}`} className="no-underline">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
