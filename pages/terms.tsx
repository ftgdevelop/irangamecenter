/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getStrapiPages } from "@/actions/strapi";
import { NextPage } from "next";
import Accordion from "@/components/shared/Accordion";

type StrapiData = {
  Items: {
    id: number;
    Question?: string;
    Answer?: string;
  }[];
}

const Terms: NextPage = ({ strapiData }: { strapiData?: StrapiData }) => {

  return (
    <div className="px-3">
      {strapiData?.Items?.map((item, index) => (
        <Accordion
          key={item.id}
          title={item.Question}
          content={item.Answer}
          WrapperClassName={`border-b border-white/15 py-2 ${index ? "" : "border-t"}`}
          initiallyOpen={!index}
        />
      ))}
    </div>
  );
}

export const getStaticProps = async (context: any) => {

  const response: any = await getStrapiPages('filters[Page][$eq]=Terms&locale=fa&populate[Sections][populate]=*')

  return ({
    props: {
      context: {
        locales: context.locales || null
      },
      strapiData: response?.data?.data?.[0]?.Sections?.[0] || null
    },
    revalidate: 3600
  })

}

export default Terms;