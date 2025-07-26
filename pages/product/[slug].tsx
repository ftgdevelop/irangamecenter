/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import { useState } from "react";
import { getProductBySlug } from "@/actions/commerce";
import { ProductDetailData } from "@/types/commerce";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import FAQ from "@/components/shared/FAQ";
import Contacts from "@/components/shared/Contacts";
import parse from 'html-react-parser';
import Image from "next/image";
import RatingItem from "@/components/products/RatingItem";
import { dateDiplayFormat } from "@/helpers";
import Select from "@/components/shared/Select";


const DetailBlog: NextPage<any> = ({ productData }:
  { productData: ProductDetailData }) => {

  console.log(productData);

  const [consoleType, setConsoleType] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("a");


  const breadcrumbsItems: {
    label: string;
    link?: string;
  }[] = [];

  if (productData.breadcrumbs?.length) {
    breadcrumbsItems.push(...productData.breadcrumbs.map(item => ({
      label: item.name || "",
      link: `/product-category/${item.slug}`
    })))
  }
  if (productData.name) {
    breadcrumbsItems.push({
      label: productData.name,
      link: ""
    })
  }

  console.log("productData.publisher", productData.publisher)
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

        <h2 className="text-2xl font-semibold my-4"> بازی {productData.name}</h2>

        <div className="flex gap-3 flex-wrap mb-5">
          {!!productData.genres?.[0]?.name && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              سبک بازی
              <b className="block font-semibold mt-2 text-xs">
                {productData.genres.map(item => item.name).join("، ")}
              </b>
            </div>
          )}

          {!!productData.publisher && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              شرکت انتشار دهنده
              <b className="block font-semibold mt-2 text-xs">
                under construction
              </b>
            </div>
          )}

          {!!productData.gameplay?.length && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              حالت بازی
              <b className="block font-semibold mt-2 text-xs">
                {productData.gameplay.map(item => item.name).join("، ")}
              </b>
            </div>
          )}
          {!!productData.playerPerspective?.length && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              زاویه دید
              <b className="block font-semibold mt-2 text-xs">
                {productData.playerPerspective.map(item => item.name).join("، ")}
              </b>
            </div>
          )}


          {!!productData.theme?.length && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              تم بازی
              <b className="block font-semibold mt-2 text-xs">
                {productData.theme.map(item => item.name).join("، ")}
              </b>
            </div>
          )}


          {!!productData.pegi && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              <div className="flex gap-2">
                {productData?.pegi?.image && (
                  <Image
                    src={productData.pegi.image}
                    alt={productData.pegi.title || productData.pegi.name || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 text-4xs"
                  />
                )}
                <div>
                  رده سنی اروپا (PEGI)
                  <b className="block font-semibold mt-2 text-xs">
                    {productData.pegi.name}
                  </b>
                </div>
              </div>
            </div>
          )}

          {!!productData.esrb && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              <div className="flex gap-2">
                {productData?.esrb?.image && (
                  <Image
                    src={productData.esrb.image}
                    alt={productData.esrb.title || productData.esrb.name || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 text-4xs"
                  />
                )}
                <div>
                  رده سنی آمریکا (ESRB)
                  <b className="block font-semibold mt-2 text-xs">
                    {productData.esrb.name}
                  </b>
                </div>
              </div>
            </div>
          )}

          {!!productData.releaseDate && (
            <div className="block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              تاریخ انتشار
              <b className="block font-semibold mt-2 text-xs">
                {dateDiplayFormat({
                  date: productData.releaseDate,
                  locale: "fa",
                  format: "dd mm yyyy"
                })}
              </b>
            </div>
          )}

        </div>

        <Select
          wrapperClassName="mb-5"
          buttonClassName="h-12"
          items={[{ label: "console a", value: "a" }, { label: "console b", value: "b" }, { label: "console c", value: "c" }]}
          onChange={e => { setConsoleType(e) }}
          value={consoleType}
          label="انتخاب کنسول مورد نظر"
          placeholder="نوع کنسول را انتخاب نمایید"
        />

        <Select
          buttonClassName="h-12"
          items={[{ label: "ظرفیت 2", value: "a" }, { label: "ظرفیت 4", value: "b" }, { label: "ظرفیت 10", value: "c" }]}
          onChange={e => { setCapacity(e) }}
          value={capacity}
          label="انتخاب ظرفیت"
          placeholder=""
        />

      </div>

      {!!productData.description && (
        <div className="px-5 inserted-content mt-7">
          {parse(productData.description)}
        </div>
      )}

      {!!productData.rating?.length && (
        <>
          <strong className="px-5 text-lg font-semibold mb-0 mt-8 text-[#ffefb2] block"> امتیاز در وبسایت های معتبر </strong>
          <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip py-3 pl-3">
            <div className="flex gap-3 pr-4">
              {productData.rating.map((rating, index) => <RatingItem key={rating.id} rating={rating} index={index} />)}
              <div className="h-2 w-1 shrink-0" />
            </div>
          </div>
        </>
      )}
      {!!productData.awards?.length && (
        <>
          <div className="px-5">
            <strong className="text-lg font-semibold mb-3 mt-8 text-[#ffefb2] block"> جوایز و دستاوردها </strong>
            {productData.awards.map(award => (
              <div className="flex items-center gap-2 mb-2 text-sm" key={award}>
                <Image src="/images/icons/award.svg" alt="award" className="w-7 h-7 " width={28} height={28} />
                {award}
              </div>
            ))}
          </div>
        </>
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