/* eslint-disable  @typescript-eslint/no-explicit-any */

import Categories from "@/components/home/Categories";
import Search from "@/components/shared/Search";
import Slider from "@/components/home/Slider";
import BestSellers from "@/components/home/BestSellers";
import Intro from "@/components/about/Intro";
import FAQ from "@/components/shared/FAQ";
import { getStrapiHighlight, getStrapiPages } from "@/actions/strapi";
import { NextPage } from "next";
import { ServerAddress } from "@/enum/url";
import Highlights from "@/components/home/highlights";
import { HighlightItemType } from "@/types/highlight";
import Contacts from "@/components/shared/Contacts";
import { getBlogs } from "@/actions/blog";
import { BlogItemType } from "@/types/blog";
import BlogsCarousel from "@/components/blog/BlogsCarousel";
import {getProducts } from "@/actions/commerce";
import { GetProductsDataType } from "@/types/commerce";
import ProductsCarousel from "@/components/products/ProductsCarousel";
import BannerLinks from "@/components/home/BannerLinks";

type HomeAboutDataType = {
  Keyword: "about_intro" | "icons" | "faq" | "telNumber" | "email";
  Body?: string;
  Items?: {
    id: number;
    Question?: string;
    Answer?: string;
  }[];
  Description?: string;
  Subtitle?: string;
  Url?: string;
}[]
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

type Props = {
  homeSections?: HomeSections[];
  homeHighlights?: HighlightItemType[];
  homeAboutData?: HomeAboutDataType;
  recentBlogs?: BlogItemType[];
  playstation5Data?: GetProductsDataType;
  playstation4Data?: GetProductsDataType;
  steamData?: GetProductsDataType;
  xboxOneData?: GetProductsDataType;
  xboxSeriesXsData?: GetProductsDataType;
  nintendoSwitch2Data?: GetProductsDataType;
  backOrderProductsData?: GetProductsDataType;
}

const Home: NextPage<Props> = props => {

  const {homeAboutData, homeHighlights, homeSections,recentBlogs, playstation4Data, playstation5Data, steamData, xboxOneData, xboxSeriesXsData, nintendoSwitch2Data} = props;

  const categoris = homeSections?.find(section => section.Keyword === "category");

  const sliderItems = homeSections?.find(section => section.Keyword === "banner")?.Items?.filter(item => item.Image?.url) as SliderItemType[] || [];

  const banner2Items = homeSections?.find(section => section.Keyword === "banner2")?.Items?.filter(item => item.Image?.url) as BannerItemType[] || [];

  const banner3Items = homeSections?.find(section => section.Keyword === "banner3")?.Items?.filter(item => item.Image?.url) as BannerItemType[] || [];

  //const promotionData = homeSections?.find(section => section.Keyword === "special-offer");

  const aboutDescription = homeAboutData?.find(item => item.Keyword === "about_intro")?.Body;

  const FAQ_items = homeAboutData?.find(item => item.Keyword === "faq")?.Items;
  
  const SupportNumber = homeAboutData?.find(item => item.Keyword === "telNumber")?.Description;
  const SupportNumberUrl = homeAboutData?.find(item => item.Keyword === "telNumber")?.Url;
  const SupportNumberSubtitle = homeAboutData?.find(item => item.Keyword === "telNumber")?.Subtitle;
  const emailAddress = homeAboutData?.find(item => item.Keyword === "email")?.Description; 

  if(props.backOrderProductsData){
    //console.log(props.backOrderProductsData?.pagedResult?.items);
    debugger;
  }else{
    debugger;
  }

  return (
    <>
      <div className="p-3">
        <Search />
      </div>

      {homeHighlights && <Highlights
        direction="rtl"
        highlights={homeHighlights}
      />}

      <Categories
        items={categoris?.Items || []}
        title={categoris?.Title}
      />

      <Slider items={sliderItems} />

      <BannerLinks items={banner2Items?.map(item => ({
        title: item.Title || "",
        url: item.Url || "#",
        subtitle: item.Subtitle,
        imageUrl: ServerAddress.Type! + ServerAddress.Strapi + item.Image.url,
        imageAlt: item.ImageAlternative,
        imageTitle: item.ImageTitle
      }))} />
      


      {!!(props.backOrderProductsData?.pagedResult?.items?.length) && <ProductsCarousel 
        products={props.backOrderProductsData?.pagedResult?.items}
        title="پیش خرید"
      />}
      <br/>

      <BannerLinks
        items={banner3Items?.map(item => ({
          title: item.Title || "",
          url: item.Url || "#",
          subtitle: item.Subtitle,
          imageUrl: ServerAddress.Type! + ServerAddress.Strapi + item.Image.url,
          imageAlt: item.ImageAlternative,
          imageTitle: item.ImageTitle
        }))}
      />

      <BestSellers 
        playstation5Products={playstation5Data?.pagedResult?.items}
        playstation4Products={playstation4Data?.pagedResult?.items}
        steamProducts={steamData?.pagedResult?.items}
        xboxOneProducts={xboxOneData?.pagedResult?.items}
        xboxSeriesXsProducts={xboxSeriesXsData?.pagedResult?.items}
        nintendoSwitch2Products= {nintendoSwitch2Data?.pagedResult?.items}
      />

      {!!recentBlogs?.length && <BlogsCarousel blogs={recentBlogs} />}

      {aboutDescription && <Intro isInHome description={aboutDescription} />}

      {!!FAQ_items?.length && <FAQ items={FAQ_items} answerParse="markDown" />}

      {<Contacts 
        data={{
          emailAddress:emailAddress,
          supportNUmberUrl : SupportNumberUrl,
          supportNumber:SupportNumber,
          supportNumberSubtitle:SupportNumberSubtitle
        }}
      />}

    </>
  );
}

export const getStaticProps = async (context: any) => {

  const [strapiSectionResponse, strapiHighlightsResponse, strapiAboutSectionResponse, blogResponse, playstation5DataResponse,playstation4DataResponse,steamDataResponse,xboxOneDataResponse, xboxSeriesXsDataResponse,nintendoSwitch2DataResponse, backOrderProductsResponse ] = await Promise.all<any>([
    getStrapiPages('filters[Page][$eq]=Home&locale=fa&populate[Sections][on][shared.repeter][populate][Items][populate]=*'),
    getStrapiHighlight('locale=fa&populate[Item][populate]=*'),
    getStrapiPages('filters[Page][$eq]=aboutUs&locale=fa&populate[Sections][populate]=*'),
    getBlogs({page:1,per_page:5}),
    getProducts({skipCount:0, maxResultCount:10, variants:["playstation-5"]}),
    getProducts({skipCount:0, maxResultCount:10, variants:["playstation-4"]}),
    getProducts({skipCount:0, maxResultCount:10, variants:["steam"]}),
    getProducts({skipCount:0, maxResultCount:10, variants:["xbox-one"]}),
    getProducts({skipCount:0, maxResultCount:10, variants:["xbox-series-xs"]}),
    getProducts({skipCount:0, maxResultCount:10, variants:["nintendo-switch-2"]}),
    getProducts({maxResultCount:9,skipCount:0,status : "OnBackOrder"})
  ]);

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      homeSections: strapiSectionResponse?.data?.data?.[0]?.Sections || null,
      homeHighlights: strapiHighlightsResponse?.data?.data || null,
      homeAboutData: strapiAboutSectionResponse?.data?.data?.[0]?.Sections || null,
      recentBlogs:blogResponse?.data || null,
      playstation5Data: playstation5DataResponse?.data?.result || null ,
      playstation4Data: playstation4DataResponse?.data?.result || null ,
      steamData: steamDataResponse?.data?.result || null ,
      xboxOneData: xboxOneDataResponse?.data?.result || null ,
      xboxSeriesXsData: xboxSeriesXsDataResponse?.data?.result || null,
      nintendoSwitch2Data: nintendoSwitch2DataResponse?.data?.result || null,
      backOrderProductsData: backOrderProductsResponse?.data?.result || null
    },
    revalidate: 3600
  })

}

export default Home;