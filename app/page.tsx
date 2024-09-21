import Image from "next/image";
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';


export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-6">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg max-w-xl">
          Discover interesting articles, tutorials, and insights from various topics. Share your thoughts and join our community of writers!
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/create-post">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-2">Create a New Post</h2>
            <p className="text-gray-400">
              Write your thoughts and share your ideas with the world. Start your blogging journey today!
            </p>
          </div>
        </Link>

        <Link href="/posts">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-2">View All Posts</h2>
            <p className="text-gray-400">
              Explore articles written by various authors. Find topics that interest you!
            </p>
          </div>
        </Link>

        <Link href="https://github.com/GautamTanya13">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-2">About This Blog</h2>
            <p className="text-gray-400">
              Learn more about our mission, the authors, and the community behind this blog.
            </p>
          </div>
        </Link>
      </div>
      </div>








    // <ul>
    //   {allPostsData.map(({ id, date, title }) => (
    //     <li key={id}>
    //       {date}
    //       {title}
    //       {/* <br /> */}
    //       {/* {id} */}
    //       {/* <br /> */}
    //       <br/>
    //     </li>
    //   ))}
    // </ul>
  );
}
