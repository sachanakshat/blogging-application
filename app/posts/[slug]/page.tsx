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
    <div>
      <h1>{postData.frontmatter.title}</h1>
      <p>{postData.frontmatter.date}</p>
      {/* Render the markdown content as HTML */}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
