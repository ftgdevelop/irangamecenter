/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import { ServerAddress } from "@/enum/url";
import { useAppDispatch } from "@/hooks/use-store";
import { setHeaderType2Params } from "@/redux/pages";
import { NextPage } from "next";
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

const Faq: NextPage = ({ strapiData }: { strapiData?: StrapiData }) => {

    const dispath = useAppDispatch();
  
    useEffect(()=>{
  
      dispath(setHeaderType2Params({
        backUrl:"/",
        title:"سوالات متداول"
      }));
  
      return(()=>{
        dispath(setHeaderType2Params({
          backUrl:"",
          title:""
        }));
      })
  
    },[]);

  return (
    <div className="px-5 grid grid-cols-2 gap-5">
      {strapiData?.map(item => {
        const imagePath = item.icon?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${item.icon?.url}` : undefined;
        return(
        <Link
          href={`faq/${item.Keyword}`}
          key={item.Keyword}
          className="flex text-xs p-5 flex-col text-center min-h-28 items-center justify-center bg-gradient-to-t from-[#01212e] to-[#102c33] rounded-xl"
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
  );
}

export const getStaticProps = async (context: any) => {

  const response: any = await getStrapiPages('filters[Page][$eq]=faq&locale=fa&populate[Sections][populate]=*')

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      strapiData: response?.data?.data?.[0]?.Sections || null
    },
    revalidate: 3600
  })

}

export default Faq;