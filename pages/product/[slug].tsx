/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from 'next';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { getProductBySlug, getProductGallries, getProductVariants } from '@/actions/commerce';
import { ProductDetailData, ProductGalleryItem, ProductVariant } from '@/types/commerce';
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
import Head from 'next/head';
import ProductGalleryCarousel from '@/components/products/ProductGalleryCarousel';
import ProductTabs from '@/components/products/ProductTabs';
import Star from '@/components/icons/Star';
import SimilarProducts from '@/components/products/SimilarProducts';

const DetailProduct: NextPage<any> = ({
  productData,
  slug
}: {
  productData: ProductDetailData;
  slug?: string;
}) => {
  const [detailActiveTab, setDetailActiveTab] = useState<string>('');

  const breadcrumbsItems: {
    label: string;
    link?: string;
  }[] = [];

  const [galleryData, setGalleryData] = useState<ProductGalleryItem[] | undefined>();
  const [galleryLoading, setGalleryLoading] = useState<boolean>(true);
  const [variantsData, setVariantsData] = useState<ProductVariant[] | undefined>();

  useEffect(()=>{

    const fetchGalleryData = async (s:string) => {
      setGalleryLoading(true);
      const response: any = await getProductGallries(s);
      if(response.data?.result){
        setGalleryData(response.data.result)
      }
      setGalleryLoading(false);
    }

    const fetchVariants = async (s:string) => {
      const response: any = await getProductVariants(s);
      if(response.data?.result){
        setVariantsData(response.data.result)
      }
    }

    if(slug){
      fetchGalleryData(slug);
      fetchVariants(slug);
    }

  },[slug]);

  const sortedGalleryItems = useMemo(() => {
    if (!galleryData) return [];
    return [...galleryData].sort((a, b) => {
      if (a.mediaType === 'Image' && b.mediaType === 'Video') return 1;
      return -1;
    });
  }, [galleryData?.[0]?.filePath]);

  const parsedShortDescription = useMemo(() => {
    if (!productData?.shortDescription) return null;
    return parse(productData.shortDescription);
  }, [productData?.shortDescription]);


  if (productData?.breadcrumbs?.length) {
    breadcrumbsItems.push(
      ...productData.breadcrumbs.map((item) => ({
        label: item.name || '',
        link: item.url
      }))
    );
  }

  const metas: { property: string; content: string }[] = [];

  for (const m in productData?.page?.metas) {
    metas.push({
      property: m,
      content: productData.page?.metas[m],
    });
  }

  let firstRatingTag: ReactNode = null;
  if (productData?.rating?.length) {
    firstRatingTag = (
      <div className='text-xs flex items-center gap-2'>
        <Star className='fill-[#ff9800] w-6 h-6' />
        {productData.rating[0].value} از {productData.rating[0].total} <b className='font-semibold'> ({productData.rating[0].type}) </b>
      </div>
    )
  }

  let brandTag: ReactNode = null;
  if (productData.publisher?.name) {
    brandTag = (
      <Link prefetch={false} className='block text-xs text-[#228be6] dark:text-[#68cedb] mt-1.5' href={`/brand/${productData.publisher.slug}`}> {productData.publisher.name} </Link>
    )
  } else if (productData.developer?.name) {
    brandTag = (
      <Link prefetch={false} className='block text-xs text-[#228be6] dark:text-[#68cedb] mt-1.5' href={`/brand/${productData.developer.slug}`}> {productData.developer.name} </Link>
    )
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
          wrapperClassName="bg-[#e8ecf0] dark:bg-[#192a39] px-4 py-3 mb-4"
          textColorClass="text-neutral-800 dark:text-neutral-300"
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
        <div>
          <h2 className="text-lg font-semibold block pt-3">
            {productData?.name}
          </h2>
          {firstRatingTag}
          {brandTag}
        </div>
      </div>

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

      <div className="mb-5 max-lg:hidden-scrollbar lg:styled-scrollbar pb-3 overflow-x-auto overflow-y-clip py-3 pl-3">
        <div className="flex gap-3 pr-4">
          {!!productData?.genres?.[0]?.name && (
            <button
              type="button"
              onClick={() => {
                setDetailActiveTab('details');
              }}
              className="shrink-0 text-right block border border-neutral-300 dark:border-white/15 p-3 rounded-xl text-xs max-w-56"
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
              className="shrink-0 text-right block border border-neutral-300 dark:border-white/15 p-3 rounded-xl text-xs max-w-56"
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
              className="shrink-0 text-right block border border-neutral-300 dark:border-white/15 p-3 rounded-xl text-xs max-w-56"
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
              className="shrink-0 text-right block border border-neutral-300 dark:border-white/15 p-3 rounded-xl text-xs max-w-56"
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
              className="shrink-0 text-right block border border-neutral-300 dark:border-white/15 p-3 rounded-xl text-xs max-w-56"
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

      {!!galleryData?.length && sortedGalleryItems && (
        <ProductGalleryCarousel galleries={sortedGalleryItems} galleryLoading={galleryLoading} />
      )}

      {!!productData?.shortDescription && (
        <div id="description" className="pt-2 px-4">
          <h3 className="text-lg font-semibold mb-4"> {productData.name}</h3>
          <div className="inserted-content">
            {parsedShortDescription}

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
          className={`mt-6 bg-[#dddddd] dark:bg-[#192a39] p-2.5 rounded-xl ${
            productData?.developer?.name && productData?.publisher?.name
              ? 'grid grid-cols-2 gap-2.5'
              : ''
          }`}
        >
          {!!productData?.developer?.name && (
            <Link
              prefetch={false}
              href={`/brand/${productData.developer.slug || 'unknown'}`}
              className=" block p-3 bg-[#fafafa] dark:bg-[#011425] rounded-xl text-xs"
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
              prefetch={false}
              href={`/brand/${productData.publisher.slug || 'unknown'}`}
              className="block p-3 bg-[#fafafa] dark:bg-[#011425] rounded-xl text-xs"
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

      {!!variantsData?.length && <VariantSection productId={productData.id} productVariants={variantsData} />}

      {!!productData?.rating?.length && (
        <section id="ratings" className='pt-8'>
          <strong  className="px-4 text-lg font-semibold mb-0 text-[#fd7e14] dark:text-[#ffefb2] block">
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
            <strong className="text-lg font-semibold mb-3  text-[#fd7e14] dark:text-[#ffefb2] block">
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

          <h5  className="px-4 text-lg font-semibold mb-4 mt-8 text-[#fd7e14] dark:text-[#ffefb2]">
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

      {!!slug && <SimilarProducts productSlug={slug} />}

      <Contacts />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const response: any = await getProductBySlug(context?.query?.slug);

  return {
    props: {
      productData: response.data?.result || null,
      slug: context?.query?.slug || null
    },
  };
}

export default DetailProduct;
