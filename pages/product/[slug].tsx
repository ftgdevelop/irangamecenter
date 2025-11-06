/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from 'next';
import { useState } from 'react';
import { getProductBySlug } from '@/actions/commerce';
import { ProductDetailData } from '@/types/commerce';
import BreadCrumpt from '@/components/shared/BreadCrumpt';
import FAQ from '@/components/shared/FAQ';
import Contacts from '@/components/shared/Contacts';
import parse from 'html-react-parser';
import Image from 'next/image';
import RatingItem from '@/components/products/RatingItem';
import { dateDiplayFormat } from '@/helpers';
import Link from 'next/link';
import ProductDetail from '@/components/products/ProductDetail';
import AgeRatingDetail from '@/components/products/AgeRatingDetail';
import ArrowTopLeft from '@/components/icons/ArrowTopLeft';
import VariantSection from '@/components/products/VariantSection';
import SimilarProductsCarousel from '@/components/products/SimilarProductsCarousel';
import Head from 'next/head';
import ProductGalleryCarousel from '@/components/products/ProductGalleryCarousel';
import ProductTabs from '@/components/products/ProductTabs';

const DetailProduct: NextPage<any> = ({
  productData,
}: {
  productData: ProductDetailData;
}) => {
  const [detailActiveTab, setDetailActiveTab] = useState<string>('');

  const breadcrumbsItems: {
    label: string;
    link?: string;
  }[] = [];

  if (productData?.breadcrumbs?.length) {
    breadcrumbsItems.push(
      ...productData.breadcrumbs.map((item) => ({
        label: item.name || '',
        link: `/products/VariantSlug=${item.slug}`,
      }))
    );
  }
  if (productData?.name) {
    breadcrumbsItems.push({
      label: productData.name,
      link: '',
    });
  }

  const metas: { property: string; content: string }[] = [];

  for (const m in productData?.page?.metas) {
    metas.push({
      property: m,
      content: productData.page?.metas[m],
    });
  }

  return (
    <>
      <Head>
        {productData?.page?.title && <title> {productData.page.title} </title>}

        {metas?.map((meta, index) => (
          <meta key={index} property={meta.property} content={meta.content} />
        ))}

        {productData?.page?.richSnippet && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(JSON.parse(productData.page.richSnippet)),
            }}
          />
        )}
      </Head>
      <ProductTabs
      tabs={[
        { id: 'specs', label: 'مشخصات', isActive: !!productData },
        { id: 'description', label: 'توضیحات', isActive: !!productData?.shortDescription },
        { id: 'ratings', label: 'امتیازها', isActive: !!productData?.rating?.length },
        { id: 'awards', label: 'جوایز', isActive: !!productData?.awards?.length },
        { id: 'faq', label: 'سوالات متداول', isActive: !!productData?.faqs?.length },
        { id: 'similar', label: 'محصولات مشابه', isActive: !!productData?.similar?.length },
      ]}
    />

      {!!breadcrumbsItems.length && (
        <BreadCrumpt
          items={breadcrumbsItems}
          wrapperClassName="bg-[#192a39] mt-[84px] px-4 py-3"
          textColorClass="text-neutral-300"
        />
      )}

      <div className="flex gap-4 p-4">
        {productData?.filePath && (
          <Image
            src={productData.filePath}
            alt={productData.fileAltAttribute || productData.name || ''}
            width={400}
            height={200}
            className="h-auto w-24 block rounded-xl"
            title={productData.fileTitleAttribute || productData.name}
          />
        )}

        <h2 className="text-lg font-semibold block pt-3">
          {productData?.name}
        </h2>
      </div>
      {productData?.galleries && (
        <ProductGalleryCarousel galleries={productData.galleries} />
      )}
      <div id="specs" className="px-4">
        <div className="flex justify-between items-top mb-5">
          <strong className="text-sm"> مشخصات بازی </strong>
          <ProductDetail
            productData={productData}
            activeTab={detailActiveTab}
            changeActiveTab={(key) => {
              setDetailActiveTab(key.toString());
            }}
          />
        </div>
      </div>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar pb-3 overflow-x-auto overflow-y-clip py-3 pl-3">
        <div className="flex gap-3 pr-4">
          {!!productData?.genres?.[0]?.name && (
            <button
              type="button"
              onClick={() => {
                setDetailActiveTab('details');
              }}
              className="shrink-0 text-right block border border-white/15 p-3 rounded-xl text-xs max-w-56"
            >
              <div className="flex gap-2 items-center">
                سبک بازی
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
              </div>
              <b className="block font-semibold mt-2 text-xs h-8 overflow-hidden">
                {productData.genres.map((item) => item.name).join('، ')}
              </b>
            </button>
          )}

          {!!productData?.gameplay?.length && (
            <button
              type="button"
              onClick={() => {
                setDetailActiveTab('details');
              }}
              className="shrink-0 text-right block border border-white/15 p-3 rounded-xl text-xs max-w-56"
            >
              <div className="flex gap-2 items-center">
                حالت بازی
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
              </div>
              <b className="block font-semibold mt-2 text-xs h-8 overflow-hidden">
                {productData.gameplay.map((item) => item.name).join('، ')}
              </b>
            </button>
          )}

          {!!productData?.playerPerspective?.length && (
            <button
              type="button"
              onClick={() => {
                setDetailActiveTab('details');
              }}
              className="shrink-0 text-right block border border-white/15 p-3 rounded-xl text-xs max-w-56"
            >
              <div className="flex gap-2 items-center">
                زاویه دید
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
              </div>
              <b className="block font-semibold mt-2 text-xs h-8 overflow-hidden">
                {productData.playerPerspective
                  .map((item) => item.name)
                  .join('، ')}
              </b>
            </button>
          )}

          {!!productData?.theme?.length && (
            <button
              type="button"
              onClick={() => {
                setDetailActiveTab('details');
              }}
              className="shrink-0 text-right block border border-white/15 p-3 rounded-xl text-xs max-w-56"
            >
              <div className="flex gap-2 items-center">
                تم بازی
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
              </div>
              <b className="block font-semibold mt-2 text-xs h-8 overflow-hidden">
                {productData.theme.map((item) => item.name).join('، ')}
              </b>
            </button>
          )}

          {!!productData?.releaseDate && (
            <button
              type="button"
              onClick={() => {
                setDetailActiveTab('details');
              }}
              className="shrink-0 text-right block border border-white/15 p-3 rounded-xl text-xs max-w-56"
            >
              <div className="flex gap-2 items-center">
                تاریخ انتشار
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
              </div>
              <b className="block font-semibold mt-2 text-xs h-8 overflow-hidden">
                {dateDiplayFormat({
                  date: productData.releaseDate,
                  locale: 'fa',
                  format: 'dd mm yyyy',
                })}
              </b>
            </button>
          )}

          <div className="w-1 shrink-0" />
        </div>
      </div>

      {!!productData?.shortDescription && (
        <div id="description" className="pt-7 px-4">
          <h3 className="text-lg font-semibold mb-4"> {productData.name}</h3>
          <div className="inserted-content">
            {parse(productData.shortDescription)}

            {!!productData.description && (
              <button
                type="button"
                className="text-violet-500 inline-block text-sm font-semibold"
                onClick={() => {
                  setDetailActiveTab('descriptions');
                }}
              >
                بیشتر
              </button>
            )}
          </div>
        </div>
      )}

      <div className="px-4">
        <div
          className={`mt-6 bg-[#192a39] p-2.5 rounded-xl ${
            productData?.developer?.name && productData?.publisher?.name
              ? 'grid grid-cols-2 gap-2.5'
              : ''
          }`}
        >
          {!!productData?.developer?.name && (
            <Link
              href={`/brand/${productData.developer.slug || 'unknown'}`}
              className=" block p-3 bg-[#011425] rounded-xl text-xs"
            >
              <div className="flex gap-2">
                {productData.developer.filePath && (
                  <Image
                    src={productData.developer.filePath}
                    alt={
                      productData.developer.fileAltAttribute ||
                      productData.developer.fileTitleAttribute ||
                      ''
                    }
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

          {!!productData?.publisher?.name && (
            <Link
              href={`/brand/${productData.publisher.slug || 'unknown'}`}
              className="block p-3 bg-[#011425] rounded-xl text-xs"
            >
              <div className="flex gap-2">
                {productData.publisher.filePath && (
                  <Image
                    src={productData.publisher.filePath}
                    alt={
                      productData.publisher.fileAltAttribute ||
                      productData.publisher.fileTitleAttribute ||
                      ''
                    }
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

        <AgeRatingDetail productData={productData} />
      </div>

      <VariantSection productData={productData} />

      {/* <hr/><hr/><hr/><hr/><hr/><hr/><hr/>

      <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
        انتخاب کنسول مورد نظر
      </label>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">

        <div className="flex pr-4">
          {productData.variants?.map(variantItem => (
            <div key={variantItem.id} className="pl-3 last:pl-4">
              <button
                type="button"
                className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 ${variant === variantItem.slug ? "bg-gradient-green text-neutral-800" : "bg-[#192a39]"}`}
                disabled={!variantItem.slug}
                onClick={() => { setVariant(variantItem.slug || "") }}
              >
                {variantItem.value}
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
        انتخاب ظرفیت بازی
      </label>

      <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">
        <div className="flex pr-5">
          {capacityOptions?.map((capacityItem, index) => (
            <div key={index} className="pl-3 last:pl-5">
              <button
                type="button"
                className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 ${capacity === capacityItem.value ? "bg-gradient-green text-neutral-800" : "bg-[#192a39]"}`}
                disabled={!capacityItem.value}
                onClick={() => { setCapacity(capacityItem.value || "") }}
              >
                {capacityItem.label}
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {!!productData?.rating?.length && (
        <section id="ratings" className='pt-8'>
          <strong  className="px-4 text-lg font-semibold mb-0 text-[#ffefb2] block">
            امتیاز در وبسایت های معتبر
          </strong>
          <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip py-3 pl-3">
            <div className="flex gap-3 pr-4">
              {productData.rating.map((rating, index) => (
                <RatingItem key={rating.id} rating={rating} index={index} />
              ))}
              <div className="h-2 w-1 shrink-0" />
            </div>
          </div>
        </section>
      )}
      {!!productData?.awards?.length && (
        <section id="awards" className="px-4 pt-8">
            <strong className="text-lg font-semibold mb-3  text-[#ffefb2] block">
              جوایز و دستاوردها
            </strong>
            {productData.awards.map((award) => (
              <div className="flex items-center gap-2 mb-2 text-sm" key={award}>
                <Image
                  src="/images/icons/award.svg"
                  alt="award"
                  className="w-7 h-7 "
                  width={28}
                  height={28}
                />
                {award}
              </div>
            ))}
        </section>
      )}

      {!!productData?.faqs?.length && (
          <section id="faq">

          <h5  className="px-4 text-lg font-semibold mb-4 mt-8 text-[#ffefb2]">
            سوالات متداول درباره {productData.name}
          </h5>
          <FAQ
            answerParse="parse"
            items={productData.faqs.map((faq) => ({
              id: faq.id,
              Answer: faq.answer,
              Question: faq.questions,
            }))}
          />
        </section>
      )}

      {!!productData?.similar?.length && (
          <section id="similar">
            <SimilarProductsCarousel products={productData.similar} />
          </section>      )}

      <Contacts />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const response: any = await getProductBySlug(context?.query?.slug);

  return {
    props: {
      productData: response.data?.result || null,
    },
  };
}

export default DetailProduct;
