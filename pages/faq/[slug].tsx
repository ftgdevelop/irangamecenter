/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import Accordion from "@/components/shared/Accordion";
import { useAppDispatch } from "@/hooks/use-store";
import { setHeaderType2Params } from "@/redux/pages";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import Markdown from "react-markdown";

type FAQ = {
  id: number;
  Keyword: string;
  Title: string;
  icon?:{   
  url?:string;
  }
  Items?:{  
    Answer?: string;
    Question?: string;
    id:number;
  }[]
};

const FaqDetail: NextPage = ({ faq }: {faq?: FAQ }) => {

    const dispatch = useAppDispatch();
  
    const title = faq?.Title;

    useEffect(()=>{
  
      if(title){
        dispatch(setHeaderType2Params({
          backUrl:"/faq",
          title:title
        }));
      }
  
      return(()=>{
        dispatch(setHeaderType2Params({
          backUrl:"",
          title:""
        }));
      })
  
    },[title]);

  return (
    <div className="px-5">
      {faq?.Items?.map((item, index) => (
        <Accordion
          key={item.id}
          title={item.Question}
          content={<Markdown>{item.Answer}</Markdown>}
          WrapperClassName={`border-b border-neutral-300 dark:border-white/15 py-2 ${index ? "" : "border-t"}`}
          initiallyOpen={!index}
        />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { query } = context;

  const response: any = await getStrapiPages('filters[Page][$eq]=faq&locale=fa&populate[Sections][populate]=*')
  
  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      faq: response?.data?.data?.[0]?.Sections?.find( (f:any) => f.Keyword === query.slug) || null
    }
  })

}

export default FaqDetail;