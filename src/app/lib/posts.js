import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { redirect } from 'next/navigation'

import { remark } from 'remark';
import html from 'remark-html';
import rehypePrism from "@mapbox/rehype-prism";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import rehypeFormat from 'rehype-format';

const postsDirectory = path.join(process.cwd(), 'posts');
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
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
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  let fileContents, matterResult, processedContent, contentHtml;
  if (fs.existsSync(fullPath, 'utf8')) {
    fileContents = fs.readFileSync(fullPath, 'utf8');
    matterResult = matter(fileContents);
    processedContent = await unified()
      .use(remarkParse) // Parse markdown content to a syntax tree
      .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
      .use(rehypePrism)
      .use(rehypeStringify) // Serialize HTML syntax tree
      .process(matterResult.content);
    contentHtml = processedContent.toString();
  } else {
    redirect("/posts")
  }
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}