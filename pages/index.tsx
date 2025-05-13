/* eslint-disable  @typescript-eslint/no-explicit-any */

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
import { getStrapiPages } from "@/actions/strapi";
import { NextPage } from "next";

type HomeSectionItems = {
  Description?: string;
  ImageAlternative?: string;
  ImageTitle?: string;
  Keyword?: string;
  Subtitle?: string;
  Title?: string;
  Url: string;
  id: number;
  Image?: {
    url?: string;
  }
}

type HomeSections = {
  Keyword: "category" | "banner" | "special-offer" | "special-offer" | "special-offer";
  Title: string;
  Items: HomeSectionItems[];
  IsActive: boolean;
}

type SliderItemType = {
  Url?: string;
  Title?: string;
  ImageAlternative?: string;
  ImageTitle?: string;
  id: number;
  Description?: string;
  Subtitle?: string;
  Image: {
    url: string;
  }
}


const Home: NextPage = ({ homeSections }: { homeSections?: HomeSections[] }) => {

  const categoris = homeSections?.find(section => section.Keyword === "category");

  const sliderItems = homeSections?.find(section => section.Keyword === "banner")?.Items?.filter(item => item.Image?.url) as SliderItemType[];

  return (
    <>
      <Search />

      <CircleLinks />

      <Categories
        items={categoris?.Items || []}
        title={categoris?.Title}
      />

      <Slider items={sliderItems} />

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


export const getStaticProps = async (context: any) => {

  const homeSections = await getStrapiPages('filters[Page][$eq]=Home&locale=fa&populate[Sections][on][shared.repeter][populate][Items][populate]=*')

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      homeSections: homeSections?.data?.data?.[0]?.Sections || null,
    },
    revalidate: 3600
  })

}

export default Home;