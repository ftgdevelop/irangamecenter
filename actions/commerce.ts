/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Commerce, Headers, ServerAddress } from "@/enum/url";
import { GetAllProductsParams } from "@/types/commerce";
import axios from "axios";


export const getProducts = async (params: GetAllProductsParams, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {
    try {

        const response = await axios.post(
           `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAllProducts}`,
            params,
            {
                headers: {
                    ...Headers,
                    "Accept-Language": acceptLanguage,
                    currency: "IRR"
                },
            },
        )

        return (response)
    } catch (error: any) {
        return error
    }
}


export const getProductBySlug = async (slug: string, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetBySlug}?Slug=${slug}`,
            headers: {
                ...Headers,
                "Accept-Language": acceptLanguage,
                currency: "IRR"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export const getProductVariants = async (slug: string, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetProductVariants}?Slug=${slug}`,
            headers: {
                ...Headers,
                "Accept-Language": acceptLanguage,
                currency: "IRR"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getProductGallries = async (slug: string, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetProductGallries}?Slug=${slug}`,
            headers: {
                ...Headers,
                "Accept-Language": acceptLanguage,
                currency: "IRR"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}
export const getBrandBySlug = async (slug: string, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetBrandBySlug}?Slug=${slug}`,
            headers: {
                ...Headers,
                "Accept-Language": acceptLanguage,
                currency: "IRR"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export const getAllForSiteMap = async (
    params : {
        type: "Image" | "Video",
        SkipCount: number,
        MaxResultCount: number
    }
    , acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAllForSiteMap}?MediaType=${params.type}&SkipCount=${params.SkipCount}&MaxResultCount=${params.MaxResultCount}`,
            headers: {
                ...Headers,
                "Accept-Language": acceptLanguage
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getSimilarsBySlug = async (slug: string, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetSimilar}?Slug=${slug}`,
            headers: {
                ...Headers,
                "Accept-Language": acceptLanguage,
                currency: "IRR"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export type ProductSortKeywords = "Sale" | "Visitor" | "LowPrice" | "HighPrice";

export type ProductSortOption = {
    label: string;
    keywords: ProductSortKeywords;
}

export const getOrderById = async (params: { id: number; token?: string; currency?:string; }, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetOrderById}?Id=${params.id}`,
            headers: {
                ...Headers,
                Currency: params.currency || "IRR",
                Authorization: `Bearer ${params.token}`,
                "Accept-Language": acceptLanguage || "en-US"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export const approve = async ( params:{ 
    orderId: number;
    orderNumber:string;
    token: string
 }) => {
  try {
    const response = await axios.post(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.Approve}?orderId=${params.orderId}&orderNumber=${params.orderNumber}`,
      null,
      {
        headers: {
        ...Headers,
        Currency: "IRR",
        "Accept-Language": "fa-IR",
        Authorization: `Bearer ${params.token}`,          
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}


export const getAllVariants = async (params:{
    SkipCount:number;
    MaxResultCount: number;
}) => {
    try{
        const res : any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAllVariants}?SkipCount=${params.SkipCount}&MaxResultCount=${params.MaxResultCount}`,
            headers: {
                ...Headers,
                "Accept-Language": "fa-IR",
                currency: "IRR"
            }
        })
        return res

    } catch (error){
        return error
    }
}
