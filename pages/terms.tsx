/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import { NextPage } from "next";
import Accordion from "@/components/shared/Accordion";
import { useAppDispatch } from "@/hooks/use-store";
import { useEffect } from "react";
import { setHeaderType2Params } from "@/redux/pages";
import Markdown from "react-markdown";
import { StrapiSeoData } from "@/types/commerce";
import Head from "next/head";

type StrapiData = {
  Items: {
    id: number;
    Question?: string;
    Answer?: string;
  }[];
}

const Terms: NextPage = ({ strapiData, strapiSeoData }: { strapiData?: StrapiData, strapiSeoData?: StrapiSeoData  }) => {

  const dispatch = useAppDispatch();

  useEffect(()=>{

    dispatch(setHeaderType2Params({
      backUrl:"/",
      title:"قوانین و مقررات"
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
    <div className="px-5">
      {strapiData?.Items?.map((item, index) => (
        <Accordion
          key={item.id}
          title={item.Question}
          content={<Markdown>{item.Answer}</Markdown>}
          WrapperClassName={`border-b border-neutral-300 dark:border-white/15 py-2 ${index ? "" : "border-t"}`}
          initiallyOpen={!index}
        />
      ))}
    </div>
  </>
  );
}

export const getStaticProps = async (context: any) => {


  const [response, strapiSeoResponse] = await Promise.all<any>([
    getStrapiPages('filters[Page][$eq]=Terms&locale=fa&populate[Sections][populate]=*'),
    getStrapiPages('filters[Page][$eq]=Terms&locale=fa&populate[Seo][populate]=*')
  ]);

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      strapiData: response?.data?.data?.[0]?.Sections?.[0] || null,
      strapiSeoData : strapiSeoResponse?.data?.data?.[0]?.Seo || null
    },
    revalidate: 3600
  })

}

export default Terms;