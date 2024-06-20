import { getAllPostIds } from "@/app/lib/posts";
import Link from "next/link";

const WrongRoute = ({ params }) => {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-background">
      <p className="text-4xl self-start text-foreground">Ahmet Efe Akyazı — Blog</p>
      <p className="text-2xl self-start">Yanlış Rota</p>
      <Link className="text-xl self-start text-foreground underline mt-5" href={"/"}>Ana sayfaya geri dön</Link>
    </main>
  )
}

export default WrongRoute;