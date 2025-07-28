/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { getBrandBySlug, getProducts } from "@/actions/commerce";
import {ProductItem } from "@/types/commerce";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import Contacts from "@/components/shared/Contacts";
import Image from "next/image";
import ProductListItem from "@/components/products/ProductListItem";
import Skeleton from "@/components/shared/Skeleton";
import Add from "@/components/icons/Add";


type Props = {
  brandData?: {
    fileAltAttribute?: string;
    filePath?: string;
    fileTitleAttribute?: string;
    fileUniqKey?: any;
    isDefault?: boolean;
    name?: string;
    slug?: string;
  };
  slug?: string;
  productsData: {
    totalCount: number;
    items: ProductItem[];
  };
}

const Brand: NextPage<Props> = props => {

  const { brandData, slug, productsData } = props;


  const [products, setProducts] = useState<ProductItem[]>(productsData?.items || []);
  const [fetchMode, setFetchMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);


  const loadMoreWrapper = useRef<HTMLButtonElement>(null);

  const removeListener = () => {
    document.removeEventListener('scroll', checkIsInView);
    window.removeEventListener("resize", checkIsInView);
  }

  useEffect(() => {
    if (fetchMode) {
      if (products.length < 30) {
        addItems();
      } else {
        removeListener();
      }
    }
  }, [fetchMode, products.length]);

  const addItems = async () => {

    const page = Math.ceil(products.length / 10) + 1;

    if (productsData?.totalCount && products.length >= productsData?.totalCount) {
      removeListener();
      return;
    }
    setLoading(true);

    const productsResponse: any = await getProducts({
      MaxResultCount: 10,
      SkipCount: (page - 1) * 10,
      Brands:slug? [slug] : undefined
    });
    if (productsResponse?.data?.result?.items) {
      setProducts(prevProducts => [...prevProducts, ...productsResponse.data.result.items]);
    } else {
      removeListener();
    }
    setLoading(false);
    setFetchMode(false);
  }

  const checkIsInView = () => {
    const targetTop = loadMoreWrapper.current?.getBoundingClientRect().top;
    const screenHeight = screen.height;
    if (targetTop && targetTop < (3 * screenHeight / 5) && !fetchMode) {
      setFetchMode(true);
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', checkIsInView);
    window.addEventListener("resize", checkIsInView);

    return (() => {
      document.removeEventListener('scroll', checkIsInView);
      window.removeEventListener("resize", checkIsInView);
    });
  }, []);

  return (
    <>

      <BreadCrumpt
        items={[
          { label: brandData?.name || "نامشخص", link: "" }
        ]}
        wrapperClassName="bg-[#192a39] px-4 py-3"
        textColorClass="text-neutral-300"
      />


      {brandData?.filePath && <Image
        src={brandData.filePath}
        alt={brandData.fileAltAttribute || brandData.fileTitleAttribute || brandData.name || ""}
        width={400}
        height={200}
        className="h-24 w-24 block mt-8 mx-auto"
      />}
      {brandData?.name && <h2 className="px-5 text-lg font-semibold mb-10 mt-3 text-[#ffefb2] text-center"> {brandData?.name} </h2>}


      <div className="px-4 mb-12">

        {products?.map(item => <ProductListItem product={item} key={item.id} />)}

        {!!loading && [1, 2, 3, 4, 5].map(item => (
          <div className="grid grid grid-cols-4 gap-3 mb-4" key={item}>
            <Skeleton
              type="image"
              className="aspect-square rounded-large"
            />
            <div className="col-span-3">
              <Skeleton className="h-4 w-full mt-5 mb-4" />
              <Skeleton className="w-1/2" />
            </div>
          </div>
        ))}

        {!!(productsData?.totalCount && products.length < productsData.totalCount) && <button
          ref={loadMoreWrapper}
          type="button"
          className="text-sm text-[#ca54ff] bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3"
          onClick={addItems}
        >
          <Add />
          مطالب بیشتر
        </button>}

      </div>

      <Contacts />


    </>
  )
}

export async function getServerSideProps(context: any) {

  const [brandResponse, productsResponse] = await Promise.all<any>([
    getBrandBySlug(context?.query?.slug),
    context?.query?.slug ? getProducts({
      MaxResultCount: 10,
      SkipCount: 0,
      Brands: [context.query.slug]
    }) : null
  ]);

  return (
    {
      props: {
        brandData: brandResponse.data?.result || null,
        productsData: productsResponse.data?.result || null,
        slug: context?.query?.slug || null
      }
    }
  )
}


export default Brand;