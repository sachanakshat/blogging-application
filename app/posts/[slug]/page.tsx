import { getPostData, getAllPostSlugs } from '@/lib/posts';

type Props = {
  params: {
    slug: string;
  };
};

// Page component to render the blog post
export default async function PostPage({ params }: Props) {
  const { slug } = params;

  // Fetch the post data based on the slug
  const postData = await getPostData(slug);

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{postData.frontmatter.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{new Date(postData.frontmatter.date).toLocaleDateString()}</p>
      {/* Render the markdown content as HTML */}
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  );
}

// Generate static params (equivalent to getStaticPaths in the App Router)
export async function generateStaticParams() {
  // Get all slugs for your markdown files
  const slugs = getAllPostSlugs();

  // Return the paths for each slug
  return slugs.map((slug) => ({
    slug,
  }));
}
