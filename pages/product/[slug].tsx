/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import { useEffect } from "react";
import { getProductBySlug } from "@/actions/commerce";
import { ProductDetailData } from "@/types/commerce";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import FAQ from "@/components/shared/FAQ";
import Contacts from "@/components/shared/Contacts";
import parse from 'html-react-parser';
import Link from "next/link";
import Image from "next/image";
import RatingItem from "@/components/products/RatingItem";


const DetailBlog: NextPage<any> = ({ productData }:
  { productData: ProductDetailData }) => {

  console.log(productData);

  useEffect(() => {

  }, []);

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     const response : any = await getProductBySlug(slug);
  //     console.log(response.data?.result)
  //   }

  //   fetchData();

  // },[]);

  const breadcrumbsItems: {
    label: string;
    link?: string;
  }[] = [];

  if (productData.breadcrumbs?.length) {
    breadcrumbsItems.push(...productData.breadcrumbs.map(item => ({
      label: item.name || "",
      link: `/ggggggg/${item.slug}`
    })))
  }
  if (productData.name) {
    breadcrumbsItems.push({
      label: productData.name,
      link: ""
    })
  }

  return (
    <>
      {!!breadcrumbsItems.length && (
        <BreadCrumpt
          items={breadcrumbsItems}
          wrapperClassName="bg-[#192a39] px-4 py-3"
          textColorClass="text-neutral-300"
        />
      )}

      {productData.image?.url && <Image
        src={productData.image?.url}
        alt={productData.name || ""}
        width={400}
        height={200}
        className="h-auto w-full block mb-5"
      />}

      <div className="px-5">


        <div className="flex gap-3 flex-wrap">
          {!!productData.genres?.[0]?.name && (
            <Link
              className="block border border-white/15 p-4 rounded-xl text-xs"
              href={"#"}
            >
              ژانر
              <b className="block font-semibold mt-2 text-sm">
                {productData.genres?.[0].name}
              </b>
            </Link>
          )}
        </div>
      </div>

      {!!productData.rating?.length && (
        <>
          <strong className="px-5 text-lg font-semibold mb-4 mt-8 text-[#ffefb2] block"> امتیاز بازی </strong>
          <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip py-3 pl-3">
            <div className="flex gap-3 pr-4">
              {productData.rating.map(rating => <RatingItem key={rating.id} rating={rating} />)}
              <div className="h-2 w-1 shrink-0" />
            </div>
          </div>
        </>
      )}

      <div className="px-5">
        <h2 className="text-xl font-semibold my-4">{productData.name}</h2>
      </div>


      {!!productData.description && (
        <div className="px-5 inserted-content">
          {parse(productData.description)}
        </div>
      )}

      {!!productData?.faqs?.length && <>
        <h5 className="px-5 text-lg font-semibold mb-4 mt-8 text-[#ffefb2]"> سوالات متداول درباره  {productData.name}</h5>
        <FAQ
          answerParse="parse"
          items={productData.faqs.map(faq => ({
            id: faq.id,
            Answer: faq.answer,
            Question: faq.questions
          }))}
        />
      </>}



      <Contacts />


    </>
  )
}

export async function getServerSideProps(context: any) {

  const response: any = await getProductBySlug(context?.query?.slug);

  return (
    {
      props: {
        productData: response.data?.result || null
      }
    }
  )
}


export default DetailBlog;