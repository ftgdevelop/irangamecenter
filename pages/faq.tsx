/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import { ServerAddress } from "@/enum/url";
import { useAppDispatch } from "@/hooks/use-store";
import { setHeaderType2Params } from "@/redux/pages";
import { StrapiSeoData } from "@/types/commerce";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type StrapiData = {
  id: number;
  Keyword: string;
  Title: string;
  icon?:{   
  url?:string;
  }
}[];

const Faq: NextPage = ({ strapiData, strapiSeoData }: { strapiData?: StrapiData, strapiSeoData?: StrapiSeoData }) => {

    const dispatch = useAppDispatch();
  
    useEffect(()=>{
  
      dispatch(setHeaderType2Params({
        backUrl:"/",
        title:"سوالات متداول"
      }));
  
      return(()=>{
        dispatch(setHeaderType2Params({
          backUrl:"",
          title:""
        }));
      })
  
    },[]);

  return (
  <>
    <Head>
      {strapiSeoData?.PageTitle && <title>{strapiSeoData.PageTitle}</title>}  
      
      {strapiSeoData?.Metas?.map(m => (
        <meta name={m.Type || ""} content={m.Value || ""} key={m.id} />
      ))}
      
      {strapiSeoData?.Schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: strapiSeoData.Schema }}
        />
      )}
    </Head>
    <div className="px-5 grid grid-cols-2 gap-5">
      {strapiData?.map(item => {
        const imagePath = item.icon?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${item.icon?.url}` : undefined;
        return(
        <Link
          prefetch={false}
          href={`faq/${item.Keyword}`}
          key={item.Keyword}
          className="flex text-xs p-5 flex-col text-center min-h-28 items-center justify-center bg-gradient-to-t from-[#e7f5ff] to-[#f8f0fc] dark:from-[#01212e] dark:to-[#102c33] rounded-xl text-[#be4bdb] dark:text-white"
        >
          <Image 
            src={imagePath||"/images/icons/arrow-up-left.png"}
            alt={item.Title}
            width={32}
            height={32}
            className="block w-8 h-8 mb-3"
           />
          {item.Title}
        
        </Link>
      )
      })}
    </div>
  </>
  );
}

export const getStaticProps = async (context: any) => {


  const [response, strapiSeoResponse] = await Promise.all<any>([
    getStrapiPages('filters[Page][$eq]=faq&locale=fa&populate[Sections][populate]=*'),
    getStrapiPages('filters[Page][$eq]=faq&locale=fa&populate[Seo][populate]=*')
  ]);

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      strapiData: response?.data?.data?.[0]?.Sections || null,
      strapiSeoData : strapiSeoResponse?.data?.data?.[0]?.Seo || null
    },
    revalidate: 3600
  })

}

export default Faq;