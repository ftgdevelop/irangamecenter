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
import { useEffect } from "react";
import { getStrapiPages } from "@/actions/strapi";


export default function Home() {

  useEffect(()=>{
    
    const fetchData = async () => {
      const res  = await getStrapiPages('filters[Page][$eq]=Home&populate[Sections][populate]=*')   
    }

    fetchData();

  },[]);

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
