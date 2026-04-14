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
import { getBlogsList } from "@/actions/blog";
import { BlogListItemType } from "@/types/blog";
import BlogsCarousel from "@/components/blog/BlogsCarousel";
import {getProducts } from "@/actions/commerce";
import { GetProductsDataType, StrapiSeoData } from "@/types/commerce";
import ProductsCarousel from "@/components/products/ProductsCarousel";
import BannerLinks from "@/components/home/BannerLinks";
import Head from "next/head";
import { useIsDesktop } from "@/hooks/use-is-desktop";

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
  strapiSeoData?: StrapiSeoData;
  homeSections?: HomeSections[];
  homeHighlights?: HighlightItemType[];
  homeAboutData?: HomeAboutDataType;
  recentBlogs?: BlogListItemType[];
  playstation5Data?: GetProductsDataType;
  playstation4Data?: GetProductsDataType;
  steamData?: GetProductsDataType;
  xboxOneData?: GetProductsDataType;
  xboxSeriesXsData?: GetProductsDataType;
  nintendoSwitch2Data?: GetProductsDataType;
  backOrderProductsData?: GetProductsDataType;
}

const Home: NextPage<Props> = props => {

  const isDesktop = useIsDesktop();

  const {homeAboutData, homeHighlights, homeSections,recentBlogs, playstation4Data, playstation5Data, steamData, xboxOneData, xboxSeriesXsData, nintendoSwitch2Data} = props;

  const categoris = homeSections?.find(section => section.Keyword === "category");

  const sliderItems = homeSections?.find(section => section.Keyword === "banner")?.Items?.filter(item => item.Image?.url) as SliderItemType[] || [];

  const banner2Items = homeSections?.find(section => section.Keyword === "banner2")?.Items?.filter(item => item.Image?.url) as BannerItemType[] || [];

  const banner3Items = homeSections?.find(section => section.Keyword === "banner3")?.Items?.filter(item => item.Image?.url) as BannerItemType[] || [];

  //const promotionData = homeSections?.find(section => section.Keyword === "special-offer");

  const aboutDescription = homeAboutData?.find(item => item.Keyword === "about_intro")?.Body;

  const FAQ_items = homeAboutData?.find(item => item.Keyword === "faq")?.Items;
  
  return (
    <>
      <Head>
        {props.strapiSeoData?.PageTitle && <title>{props.strapiSeoData.PageTitle}</title>}  
        
        {props.strapiSeoData?.Metas?.map(m => (
          <meta name={m.Type || ""} content={m.Value || ""} key={m.id} />
        ))}
        
        {props.strapiSeoData?.Schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: props.strapiSeoData.Schema }}
          />
        )}
      </Head>

      <div className="p-3 px-5 lg:border-b lg:border-neutral-300 dark:lg:border-white/10 lg:pb-5 lg:mb-2">
        {isDesktop && <div className="pb-3 text-center">
          <h1 className="mb-2 text-2xl font-semibold"> ایران گیم سنتر </h1>
          <h2 className="text-sm"> فروشگاه آنلاین اکانت بازی </h2>
        </div>}

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
        numberOfSlides={isDesktop? 4 : undefined}
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

      {isDesktop && <div className="h-14" />}

    </>
  );
}

export const getStaticProps = async (context: any) => {

  const [strapiSectionResponse, strapiHighlightsResponse, strapiAboutSectionResponse, blogResponse, playstation5DataResponse,playstation4DataResponse,steamDataResponse,xboxOneDataResponse, xboxSeriesXsDataResponse,nintendoSwitch2DataResponse, backOrderProductsResponse, strapiSeoResponse ] = await Promise.all<any>([
    getStrapiPages('filters[Page][$eq]=Home&locale=fa&populate[Sections][on][shared.repeter][populate][Items][populate]=*'),
    getStrapiHighlight('locale=fa&populate[Item][populate]=*'),
    getStrapiPages('filters[Page][$eq]=aboutUs&locale=fa&populate[Sections][populate]=*'),
    getBlogsList({MaxResultCount:5,SkipCount:0}),
    getProducts({skipCount:0, maxResultCount:12, variants:["playstation-5"]}),
    getProducts({skipCount:0, maxResultCount:12, variants:["playstation-4"]}),
    getProducts({skipCount:0, maxResultCount:12, variants:["steam"]}),
    getProducts({skipCount:0, maxResultCount:12, variants:["xbox-one"]}),
    getProducts({skipCount:0, maxResultCount:12, variants:["xbox-series-xs"]}),
    getProducts({skipCount:0, maxResultCount:12, variants:["nintendo-switch-2"]}),
    getProducts({maxResultCount:18,skipCount:0,status : "OnBackOrder"}),
    getStrapiPages('filters[Page][$eq]=Home&locale=fa&populate[Seo][populate]=*')
  ]);

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      homeSections: strapiSectionResponse?.data?.data?.[0]?.Sections || null,
      homeHighlights: strapiHighlightsResponse?.data?.data || null,
      homeAboutData: strapiAboutSectionResponse?.data?.data?.[0]?.Sections || null,
      recentBlogs:blogResponse?.data?.result?.items || null,
      playstation5Data: playstation5DataResponse?.data?.result || null ,
      playstation4Data: playstation4DataResponse?.data?.result || null ,
      steamData: steamDataResponse?.data?.result || null ,
      xboxOneData: xboxOneDataResponse?.data?.result || null ,
      xboxSeriesXsData: xboxSeriesXsDataResponse?.data?.result || null,
      nintendoSwitch2Data: nintendoSwitch2DataResponse?.data?.result || null,
      backOrderProductsData: backOrderProductsResponse?.data?.result || null,
      strapiSeoData : strapiSeoResponse?.data?.data?.[0]?.Seo || null
    },
    revalidate: 3600
  })

}

export default Home;
