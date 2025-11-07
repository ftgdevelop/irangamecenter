/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import { NextPage } from "next";
import { useAppDispatch } from "@/hooks/use-store";
import { useEffect } from "react";
import { setHeaderType2Params } from "@/redux/pages";
import Intro from "@/components/about/Intro";
import FAQ from "@/components/shared/FAQ";
import Contacts from "@/components/shared/Contacts";
import AboutIcons from "@/components/about/AboutIcons";

type StrapiData = {
  Keyword: "about_intro" | "icons" | "faq" | "telNumber" | "email";
  Body?: string;
  Items?: {
    id: number;
    Question?: string;
    Answer?: string;

    Description?: string;
    Image?:{
      url?: string;
    };
    Title?: string;

  }[];
  Description?: string;
  Subtitle?: string;
  Url?: string;
}[];

const AboutUs: NextPage = ({ strapiData }: { strapiData?: StrapiData }) => {

  const dispath = useAppDispatch();

  useEffect(()=>{

    dispath(setHeaderType2Params({
      backUrl:"/",
      title:""
    }));

    return(()=>{
      dispath(setHeaderType2Params({
        backUrl:"",
        title:""
      }));
    })

  },[]);

  const aboutDescription = strapiData?.find(item => item.Keyword === "about_intro")?.Body;

  const FAQ_items = strapiData?.find(item => item.Keyword === "faq")?.Items;
  const icons = strapiData?.find(item => item.Keyword === "icons")?.Items;
  
  const SupportNumber = strapiData?.find(item => item.Keyword === "telNumber")?.Description;
  const SupportNumberUrl = strapiData?.find(item => item.Keyword === "telNumber")?.Url;
  const SupportNumberSubtitle = strapiData?.find(item => item.Keyword === "telNumber")?.Subtitle;
  const emailAddress = strapiData?.find(item => item.Keyword === "email")?.Description;

  return (
    <>
      {!!aboutDescription && <Intro description={aboutDescription} />}

      {!!icons && <AboutIcons items={icons} />}

      {!!FAQ_items?.length && <FAQ items={FAQ_items} answerParse="markDown" />}

      <Contacts
        data={{
          emailAddress:emailAddress,
          supportNUmberUrl : SupportNumberUrl,
          supportNumber:SupportNumber,
          supportNumberSubtitle:SupportNumberSubtitle
        }}
      />
      
    </>
  );
}

export const getStaticProps = async (context: any) => {

  const [responseForAllSections, responseForIconsSection] = await Promise.all<any>([
    getStrapiPages('filters[Page][$eq]=aboutUs&locale=fa&populate[Sections][populate]=*'),
    getStrapiPages('filters[Page][$eq]=aboutUs&locale=fa&populate[Sections][on][shared.repeter][populate][Items][populate]=*')
  ]);

  const iconsSection = responseForIconsSection?.data?.data?.[0]?.Sections?.find((item:any) => item.Keyword==="icons");
  const otherSections = responseForAllSections?.data?.data?.[0]?.Sections?.filter((item:any) => item.Keyword !=="icons");
  const AllSections = otherSections ? [...otherSections, iconsSection] : null;

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      strapiData: AllSections || null
    },
    revalidate: 3600
  })

}

export default AboutUs;