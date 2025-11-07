/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiContact } from "@/actions/strapi";
import { NextPage } from "next";
import { useAppDispatch } from "@/hooks/use-store";
import { useEffect } from "react";
import { setHeaderType2Params } from "@/redux/pages";
import Accordion from "@/components/shared/Accordion";
import Markdown from "react-markdown";
import Ticketing from "@/components/contact/items/Ticketing";
import { ServerAddress } from "@/enum/url";
import OnlineSupport from "@/components/contact/items/OnlineSupport";
import Call from "@/components/contact/items/Call";

type FaqData = {
  Title?: string;
  Items?: {
    Answer?: string;
    Question?: string;
    id: number;
  }[];
};

type ContactsData = {
  id:number;
  Keyword?: "ticket"|"online"|"call";
  Subtitle?: string;
  Title?: string;
  Url?: string;
  icon?:{
    url?: string;
  };
  Items?:{      
    Description?: string;
    Name?: string;
    Value?: string;
    icon?:{
        url?: string;
    };
    id:number;
    url?:string;
    backgroundColorCode?: string;
  }[]
}[]

const Contact: NextPage = ({ contacts, faq }: { contacts?: ContactsData, faq?: FaqData }) => {

  const dispath = useAppDispatch();

  useEffect(()=>{

    dispath(setHeaderType2Params({
      backUrl:"/",
      title:"تماس با ما"
    }));

    return(()=>{
      dispath(setHeaderType2Params({
        backUrl:"",
        title:""
      }));
    })

  },[]);

  const ticketingData = contacts?.find(c => c.Keyword === "ticket");

  const onlineSupportData = contacts?.find(c => c.Keyword === "online");

  const callData = contacts?.find(c => c.Keyword === "call");

  return (
    <>      
      <div className="px-5 mb-5 mt-[82px]">

          <h3 className="text-[#ca54ff] font-bold text-sm mb-4">
            ارتباط با پشتیبانی
          </h3>

          <Ticketing 
            icon={ticketingData?.icon?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}/${ticketingData.icon.url}` : ""}
            label={ticketingData?.Title}
            url={ticketingData?.Url}
          />

          <OnlineSupport 
            icon={onlineSupportData?.icon?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}/${onlineSupportData.icon.url}` : ""}
            label={onlineSupportData?.Title}
            items = {onlineSupportData?.Items}
          />

          <Call 
            icon={callData?.icon?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}/${callData.icon.url}` : ""}
            label={callData?.Title}    
            description={callData?.Subtitle} 
            InnerData={callData?.Items?.[0]}     
          />


      </div>

        {!!faq?.Items?.length && (<div className="px-5 py-5">
            <h3 className="text-[#ca54ff] font-bold text-sm mb-4">
              {faq.Title || "سوالات متداول"}
            </h3>
            {faq.Items.map((item, index) => (
              <Accordion
                  key={item.id}
                  title={item.Question}
                  content={<Markdown>{item.Answer}</Markdown>}
                  WrapperClassName={`border-b border-white/15 py-2 ${index ? "" : "border-t"}`}
              />
            ))}
        </div>)}
      
    </>
  );
}

export const getStaticProps = async (context: any) => {

  const [contactUsResponse1,contactUsResponse2, faqResponse] = await Promise.all<any>([
    getStrapiContact('locale=fa&populate[ContactUs][populate]=*'),
    getStrapiContact('locale=fa&populate[ContactUs][populate][Items][populate]=*'),
    getStrapiContact('locale=fa&populate[Faqs][populate]=*')
  ]);

  const contacts1:ContactsData = contactUsResponse1?.data?.data?.[0]?.ContactUs;
  const contacts2:ContactsData = contactUsResponse2?.data?.data?.[0]?.ContactUs;

  const contacts = contacts2?.map((item) => {
    const icon = contacts1.find((x) => x.id === item.id)?.icon
    return({
      ...item,
      icon
    })
  }) 

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      contacts: contacts || null,
      faq: faqResponse?.data?.data?.[0]?.Faqs || null
    },
    revalidate: 3600
  })

}

export default Contact;