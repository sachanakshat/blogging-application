import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the directory where markdown files are stored
const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

// export async function getPostData(slug) {
//   // Construct the full path for the markdown file based on the slug
//   const filePath = path.join(postsDirectory, `${slug}.md`);

//   // Check if the file exists
//   if (!fs.existsSync(filePath)) {
//     throw new Error(`Markdown file not found: ${filePath}`);
//   }

//   // Read the file content
//   const fileContents = fs.readFileSync(filePath, 'utf8');

//   // Use gray-matter to parse the frontmatter and content
//   const { data, content } = matter(fileContents);

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark().use(html).process(content);
//   const contentHtml = processedContent.toString();

//   // Return the data and HTML content
//   return {
//     frontmatter: data,
//     contentHtml,
//   };
// }


export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata and content
  const { data, content } = matter(fileContents);

  // Convert Markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    contentHtml,
  };
}

// Function to get all slugs (useful for generateStaticParams)
export function getAllPostSlugs() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, '')); // Remove the .md extension
}

// Function to fetch all posts metadata
export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''), // Remove the .md extension
        ...data, // Spread frontmatter data (e.g., title, date)
      };
    });

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


// // Function to fetch all posts metadata
// export function getAllPosts() {
//   const filenames = fs.readdirSync(postsDirectory);

//   const posts = filenames
//     .filter((filename) => filename.endsWith('.md'))
//     .map((filename) => {
//       const filePath = path.join(postsDirectory, filename);
//       const fileContents = fs.readFileSync(filePath, 'utf8');
//       const { data } = matter(fileContents);

//       return {
//         slug: filename.replace(/\.md$/, ''), // Remove the .md extension
//         ...data, // Spread frontmatter data (e.g., title, date)
//       };
//     });

//   // Sort posts by date in descending order
//   return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// }

// Function to fetch a single post by slug
export async function getPostBySlug(slug) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Extract frontmatter and content
  const { data, content } = matter(fileContents);

  // Convert markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data,
  };
}