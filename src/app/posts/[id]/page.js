import { getPostData } from "@/app/lib/posts";
import parse from 'html-react-parser';
import Link from "next/link";
import "@/app/styles/prism-gruvbox-dark.css"

const BlogPage = async ({ params }) => {
  const post = await getPostData(params.id)
  return (
    < main className="flex min-h-screen flex-col p-6 bg-background" >
      <p className="text-4xl text-foreground self-start">Ahmet Efe Akyazı — Blog</p>
      <Link className="text-sm self-start text-foreground underline" href={"/"}>Ana sayfaya geri dön</Link>
      <p className="text-xl text-foreground self-start mt-10">{post.title} — {post.date}</p>
      {parse(post.contentHtml)}
      <Link className="text-xl self-start text-foreground underline mt-24" href={"/"}>Ana sayfaya geri dön</Link>
    </main >
  );
}

export default BlogPage;