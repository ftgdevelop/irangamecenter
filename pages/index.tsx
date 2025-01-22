import Header from "@/components/shared/layout/header/Index";
import CircleLinks from "@/components/home/CircleLinks";
import Categories from "@/components/home/Categories";
import Search from "@/components/shared/Search";
import Slider from "@/components/home/Slider";
import BannerLinkWides from "@/components/home/BannerLinkWides";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#011425] text-white max-w-lg mx-auto">
      <Header />

      <main className="min-h-screen">

        <Search />

        <CircleLinks />

        <Categories />

        <Slider />

        <BannerLinkWides />

      </main>

      <footer>
        footer
      </footer>
    </div>
  );
}
