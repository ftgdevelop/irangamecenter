import CircleLinks from "@/components/home/CircleLinks";
import Categories from "@/components/home/Categories";
import Search from "@/components/shared/Search";
import Slider from "@/components/home/Slider";
import BannerLinkWides from "@/components/home/BannerLinkWides";
import Promotion from "@/components/home/Promotion";
import ColorBannerLinkWides from "@/components/home/ColorBannerLinkWides";
import BestSellers from "@/components/home/BestSellers";
import Blog from "@/components/home/Blog";
import About from "@/components/home/About";
import FAQ from "@/components/home/FAQ";


export default function Home() {
  return (
    <>
      <Search />

      <CircleLinks />

      <Categories />

      <Slider />

      <BannerLinkWides />

      <Promotion />

      <ColorBannerLinkWides />

      <BestSellers />

      <Blog />

      <About />

      <FAQ />

    </>
  );
}
