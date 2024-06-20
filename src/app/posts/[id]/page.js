import { getPostData } from "@/app/lib/posts";
import WrongRoute from "../page";
import parse from 'html-react-parser';
import Link from "next/link";

const BlogPage = async ({ params }) => {
  const post = await getPostData(params.id)
  return (
    <main className="flex min-h-screen flex-col p-6 bg-background">
      <p className="text-4xl text-foreground self-start">Ahmet Efe Akyazı — Blog</p>
      <p className="text-xl text-foreground self-start mt-10">{post.title} — {post.date}</p>
      <text className="text-base text-white self-start mt-10">{parse(post.contentHtml)}</text>
      <Link className="text-xl self-start text-foreground underline mt-24" href={"/"}>Ana sayfaya geri dön</Link>
    </main>
  );
}

export default BlogPage;