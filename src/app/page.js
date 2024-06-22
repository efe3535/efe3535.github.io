import Link from "next/link";
import { getSortedPostsData } from "./lib/posts";
import Image from "next/image";
import Loading from "./loading";
import { Suspense } from "react";

const Home = () => {
  const allPostsData = getSortedPostsData();
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex min-h-screen flex-col p-6 bg-background">
        <p className="text-4xl self-start underline underline-offset-8">Ahmet Efe Akyazı</p>
        <div className="flex flex-row">
          <Image className="p-6 rounded-full max-h-[200px] self-center hover:animate-pulse" src={"/pfp.png"} width={200} height={200} alt="thumbnail" />
          <p className="text-base self-start text-foreground mt-10">Merhaba, ben Ahmet Efe Akyazı. 16 yaşındayım. Gömülü sistemler, elektronik, mobil uygulamalar ilgi alanlarım arasındadır.
            <br /><br />Genellikle C, Python ve JavaScript ile yazarım.<br />ARM Cortex-M4 serisi ve AVR için kod yazarım. Açık kaynak yazılımlara ilgi duyarım, STM32 için libopencm3&lsquo;ü aktif olarak kullanırım.<br /><br />
            Daha önce, FLL (2020, City Shaper), FRC (2024, Crescendo), Teknofest (2023 Istanbul, 2023 Izmir, 2024 ????) vb. yarışmalara katıldım.
            <br /><br /><Link href={"https://github.com/efe3535"} className="text-xl text-foreground"><b className="text-2xl">GitHub:</b> <span className="underline">efe3535</span></Link>
          </p>
        </div>
        <p className="text-4xl self-start mt-20 underline underline-offset-8">Blog</p>
        <ul className="w-2/3">
          {allPostsData.map(({ id, date, title, img }) => (
            <li key={id}>
              <Link href={`/posts/${id}`} className="mt-10 border-b-2 border-r-0 bg-secondary hover:bg-tertiary transition p-5 rounded-lg border-b-foreground w-auto flex flex-row" key={id}>
                <div className="flex flex-col">
                  <p className="text-xl"><b>Başlık:</b> {title}</p>
                  <p className="underline text-foreground">{id}</p>
                  <br />
                  Tarih: <p className="text-foreground">{date}</p>
                </div>
                <Image className="ml-auto rounded-md" src={img} width={200} height={100} alt="thumbnail" />
              </Link>
            </li>
          ))
          }
        </ul >
      </main >
    </Suspense>
  );
}

export default Home; 