/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
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
import { getStrapiHighlight, getStrapiPages } from "@/actions/strapi";
import { NextPage } from "next";
import { ServerAddress } from "@/enum/url";

type HomeSectionItems = {
  Description?: string;
  ImageAlternative?: string;
  ImageTitle?: string;
  Keyword?: string;
  Subtitle?: string;
  Title?: string;
  Url: string;
  id: number;
  price?: number;
  oldPrice?: number;
  Image?: {
    url?: string;
  }
}

type HomeSections = {
  Keyword: "category" | "banner" | "banner2" | "banner3" | "special-offer";
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

type BannerItemType = {
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
  
  const banner2Items = homeSections?.find(section => section.Keyword === "banner2")?.Items?.filter(item => item.Image?.url) as BannerItemType[];

  const banner3Items = homeSections?.find(section => section.Keyword === "banner3")?.Items?.filter(item => item.Image?.url) as BannerItemType[];
  
  const promotionData = homeSections?.find(section => section.Keyword === "special-offer");

  useEffect(()=>{
    const fetchData =async () => {
         const ggg = await getStrapiHighlight('locale=fa&populate[Items][populate][Items][populate]=*');
        const ggg2 = await getStrapiHighlight('locale=fa&populate[Items][populate]=*');
    }
    fetchData()
  },[]);
  
  return (
    <>
      <Search />

      <CircleLinks />

      <Categories
        items={categoris?.Items || []}
        title={categoris?.Title}
      />

      <Slider items={sliderItems} />

      <BannerLinkWides items={banner2Items.map(item => ({
        title: item.Title||"",
        url: item.Url|| "#",
        subtitle: item.Subtitle,
        imageUrl: ServerAddress.Type! + ServerAddress.Strapi + item.Image.url,
        imageAlt: item.ImageAlternative,
        imageTitle: item.ImageTitle
      }))} />

      <Promotion 
        items={promotionData?.Items.map(item => ({
          title:item.Title || "",
          url: item.Url,
          price: item.price,
          oldPrice: item.oldPrice,
          imageAlt: item.ImageAlternative,
          imageTitle: item.ImageTitle,
          imageUrl: item.Image?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${item.Image.url}` :undefined,
        }))}
        title={promotionData?.Title || ""}
      />

      <ColorBannerLinkWides 
        items={banner3Items.map(item => ({
        title: item.Title||"",
        url: item.Url|| "#",
        subtitle: item.Subtitle,
        imageUrl: ServerAddress.Type! + ServerAddress.Strapi + item.Image.url,
        imageAlt: item.ImageAlternative,
        imageTitle: item.ImageTitle
      }))}
      />

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