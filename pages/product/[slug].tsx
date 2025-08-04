/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import { useEffect, useState } from "react";
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
import Link from "next/link";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import ModalPortal from "@/components/shared/layout/ModalPortal";
import ProductDetail from "@/components/products/ProductDetail";


const DetailBlog: NextPage<any> = ({ productData }:
  { productData: ProductDetailData }) => {

  const [variant, setVariant] = useState<string>("");

  const [capacity, setCapacity] = useState<string>("");

  const [showMainContent, setShowMainContent] = useState<boolean>(false);


  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [slideInDetails, setSlideInDetails] = useState<boolean>(true);

  useEffect(() => {
    if (openDetails) {
      setSlideInDetails(true);
    }
  }, [openDetails]);

  useEffect(() => {
    if (!slideInDetails) {
      setTimeout(() => { setOpenDetails(false) }, 300)
    }
  }, [slideInDetails])


  useEffect(() => {
    if (variant) {
      setCapacity("");
    }
  }, [variant]);

  const selectedVariant = productData.variants?.find(item => item.slug === variant);
  const capacityOptions: {
    label: string;
    value: string;
  }[] = [];

  selectedVariant?.items?.forEach(item => {
    item.attributes?.forEach(attributes => {
      if (attributes.value) {
        capacityOptions.push({
          label: attributes.value,
          value: attributes.value
        })
      }
    })
  });

  selectedVariant?.items?.map(item => item.attributes?.map(attribute => ({
    label: attribute.value || "",
    value: attribute.value || ""
  }))
  );


  const breadcrumbsItems: {
    label: string;
    link?: string;
  }[] = [];

  if (productData.breadcrumbs?.length) {
    breadcrumbsItems.push(...productData.breadcrumbs.map(item => ({
      label: item.name || "",
      link: `/products?VariantSlug=${item.slug}`
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

      {productData.image?.url && (
        <div className="p-5">
          <Image
            src={productData.image?.url}
            alt={productData.name || ""}
            width={400}
            height={200}
            className="h-auto w-full block"
          />
        </div>
      )}


      <div className="px-5">

        <h2 className="text-2xl font-semibold mb-4"> {productData.name}</h2>

        <div className="flex justify-between items-top mb-5">
          <strong className="text-sm"> مشخصات بازی </strong>
          <button
            type="button"
            className="text-xs text-violet-500 font-semibold flex gap-2 items-center"
            onClick={() => { setOpenDetails(true) }}
          >
            مشاهده جزییات
            <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
          </button>

        </div>
      </div>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar pb-3 overflow-x-auto overflow-y-clip py-3 pl-3">
        <div className="flex gap-3 pr-4">
          {/* {!!productData.developer?.name && (
            <Link href={`/brand/${productData.developer.slug || "unknown"}`} className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              <div className="flex gap-2">
                {productData.developer.filePath && (
                  <Image
                    src={productData.developer.filePath}
                    alt={productData.developer.fileAltAttribute || productData.developer.fileTitleAttribute || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 text-4xs"
                  />
                )}
                <div>
                  شرکت سازنده
                  <b className="block font-semibold mt-2 text-xs">
                    {productData.developer.name}
                  </b>
                </div>
              </div>
            </Link>
          )}

          {!!productData.publisher?.name && (
            <Link href={`/brand/${productData.publisher.slug || "unknown"}`} className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              <div className="flex gap-2">
                {productData.publisher.filePath && (
                  <Image
                    src={productData.publisher.filePath}
                    alt={productData.publisher.fileAltAttribute || productData.publisher.fileTitleAttribute || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 text-4xs"
                  />
                )}
                <div>
                  شرکت انتشار دهنده
                  <b className="block font-semibold mt-2 text-xs">
                    {productData.publisher.name}
                  </b>
                </div>
              </div>
            </Link>
          )} */}

          {!!productData.genres?.[0]?.name && (
            <div className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              سبک بازی
              <b className="block font-semibold mt-2 text-xs">
                {productData.genres.map(item => item.name).join("، ")}
              </b>
            </div>
          )}

          {!!productData.gameplay?.length && (
            <div className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              حالت بازی
              <b className="block font-semibold mt-2 text-xs">
                {productData.gameplay.map(item => item.name).join("، ")}
              </b>
            </div>
          )}
          {!!productData.playerPerspective?.length && (
            <div className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              زاویه دید
              <b className="block font-semibold mt-2 text-xs">
                {productData.playerPerspective.map(item => item.name).join("، ")}
              </b>
            </div>
          )}


          {!!productData.theme?.length && (
            <div className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
              تم بازی
              <b className="block font-semibold mt-2 text-xs">
                {productData.theme.map(item => item.name).join("، ")}
              </b>
            </div>
          )}

          {!!productData.releaseDate && (
            <div className="shrink-0 block border border-white/15 p-3 rounded-xl text-xs max-w-56" >
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

          <div className="w-1 shrink-0" />
        </div>
      </div>

      {!!productData.shortDescription && (
        <div className="mt-7 px-5">
          <h3 className="text-lg font-semibold mb-4"> {productData.name}</h3>
          <div className="inserted-content">
            {parse(productData.shortDescription)}

            {(!showMainContent) && !!productData.description && <button
              type="button"
              className="text-violet-500 inline-block text-sm"
              onClick={() => { setShowMainContent(true) }}
            >
              بیشتر
            </button>}

            {!!(showMainContent && productData.description) && (
              <>
                <br />
                {parse(productData.description)}
              </>
            )}

          </div>
        </div>
      )}

      <div className="px-5">

        <div className={`mt-6 bg-[#192a39] p-2.5 rounded-xl ${(productData.developer?.name && productData.publisher?.name) ? "grid grid-cols-2 gap-2.5" : ""}`}>
          {!!productData.developer?.name && (
            <Link href={`/brand/${productData.developer.slug || "unknown"}`} className=" block border border-white/15 p-3 bg-[#011425] rounded-xl text-xs" >
              <div className="flex gap-2">
                {productData.developer.filePath && (
                  <Image
                    src={productData.developer.filePath}
                    alt={productData.developer.fileAltAttribute || productData.developer.fileTitleAttribute || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 text-4xs"
                  />
                )}
                <div>
                  توسعه دهنده
                  <b className="block font-semibold mt-2 text-xs">
                    {productData.developer.name}
                  </b>
                </div>
              </div>
            </Link>
          )}

          {!!productData.publisher?.name && (
            <Link href={`/brand/${productData.publisher.slug || "unknown"}`} className="block border border-white/15 p-3 bg-[#011425] rounded-xl text-xs" >
              <div className="flex gap-2">
                {productData.publisher.filePath && (
                  <Image
                    src={productData.publisher.filePath}
                    alt={productData.publisher.fileAltAttribute || productData.publisher.fileTitleAttribute || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 text-4xs"
                  />
                )}
                <div>
                  انتشار دهنده
                  <b className="block font-semibold mt-2 text-xs">
                    {productData.publisher.name}
                  </b>
                </div>
              </div>
            </Link>
          )}

        </div>


        {!!productData.pegi && (
          <div className="block border border-white/15 p-3 rounded-xl text-xs mt-5" >
            <div className="flex gap-2 justify-center">
              {productData?.pegi?.image && (
                <Image
                  src={productData.pegi.image}
                  alt={productData.pegi.title || productData.pegi.name || ""}
                  width={48}
                  height={48}
                  className="w-12 h-12 text-4xs"
                />
              )}
              <div className="w-40">
                رده سنی اروپا (PEGI)
                <b className="block font-semibold mt-2 text-xs">
                  {productData.pegi.name}
                </b>
              </div>
            </div>
          </div>
        )}

        {!!productData.esrb && (
          <div className="block border border-white/15 p-3 rounded-xl text-xs mt-5" >
            <div className="flex gap-2 justify-center">
              {productData?.esrb?.image && (
                <Image
                  src={productData.esrb.image}
                  alt={productData.esrb.title || productData.esrb.name || ""}
                  width={48}
                  height={48}
                  className="w-12 h-12 text-4xs"
                />
              )}
              <div className="w-40">
                رده سنی آمریکا (ESRB)
                <b className="block font-semibold mt-2 text-xs">
                  {productData.esrb.name}
                </b>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="px-5 mt-5">

        {/* <div className="flex gap-3 flex-wrap items-start mb-5">
        </div> */}



        {/* 
        {!!productData.description && (
          <div className="px-5 inserted-content mt-7">
            {parse(productData.description)}
          </div>
        )} */}

        <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip py-3 pl-3">
          <div className="flex gap-3 pr-4">

            {productData.variants?.map(variantItem => (
              <button
                key={variantItem.id}
                type="button"
                className={`shrink-0 rounded-xl px-5 py-3 ${variant === variantItem.slug ? "bg-gradient-green" : "bg-[#192a39]"}`}
                disabled={!variantItem.slug}
                onClick={() => { setVariant(variantItem.slug || "") }}
              >
                {variantItem.value}
              </button>
            ))}
          </div>
        </div>


        {!!productData.variants?.length && (<Select
          wrapperClassName="mb-5"
          buttonClassName="h-12"
          items={productData.variants.map(item => ({
            label: item.value || "",
            value: item.slug || ""
          }))}
          onChange={setVariant}
          value={variant}
          label="انتخاب کنسول مورد نظر"
          placeholder="نوع کنسول را انتخاب نمایید"
        />)}

        <Select
          buttonClassName="h-12"
          items={capacityOptions}
          onChange={setCapacity}
          value={capacity}
          label="انتخاب ظرفیت"
          placeholder="ظرفیت را انتخاب کنید"
        />

      </div>


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

      <ModalPortal
        show={openDetails}
        selector='modal_portal'
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

          <div className="relative w-full lg:max-w-lg lg:mx-auto h-screen">

            <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setSlideInDetails(false) }} />

            <div className={`bg-[#192a39] text-white rounded-2xl max-h-screen overflow-y-auto absolute transition-all left-5 right-5 ${slideInDetails ? "bottom-5" : "-bottom-[80vh]"}`}>

              <ProductDetail productData={productData} close={() => { setSlideInDetails(false) }} />

            </div>

          </div>

        </div>
      </ModalPortal>

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