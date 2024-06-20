import Link from "next/link";

export default function Custom404() {

  return (
    <main className="bg-background p-6 min-h-screen">
      <div className="flex min-h-screen bg-background">
        <p className="text-4xl self-start bg-background">Ahmet Efe Akyazı — Blog</p>
        <div className="flex align-middle justify-center flex-col">
          <p className="text-4xl self-start">Hata. Burada bir şey yok!</p>
          <p className="text-lg self-start text-foreground">Şarkı dinle...</p>
          <iframe className="rounded-[12px]" src="https://open.spotify.com/embed/track/5JJw3tdnwfNBpjk41I8aZE?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          <Link href={"/"} className="text-lg self-start text-foreground mt-20 underline">Ya da ana sayfaya dön</Link>
        </div>
      </div>
    </main>
  );
}