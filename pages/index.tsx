import Image from "next/image";
import Header from "@/components/shared/layout/header/Index";
import CircleLinks from "@/components/home/CircleLinks";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#011425] text-white max-w-lg mx-auto">
      <Header />

      <main className="min-h-screen">

        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو"
              className="w-full h-14 border-none outline-none rounded-full bg-white/10 px-5 pr-16"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              <Image src="/images/icons/search.svg" alt="search" className="" width={30} height={30} />
            </button>
          </div>
        </div>

        <CircleLinks />

      </main>

      <footer>
        footer
      </footer>
    </div>
  );
}
