/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Commerce, ServerAddress } from "@/enum/url";
import { GetAllProductsParams } from "@/types/commerce";
import axios from "axios";

const apikey = "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB"

export const getProducts = async (params: GetAllProductsParams, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {
    try {

        const response = await axios.post(
           `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAllProducts}`,
            params,
            {
                headers: {
                    "Accept-Language": acceptLanguage,
                    apikey: apikey,
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
                "Accept-Language": acceptLanguage,
                apikey: apikey,
                currency: "IRR",
                tenantid: 7
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
                "Accept-Language": acceptLanguage,
                apikey: apikey,
                currency: "IRR",
                tenantid: 7
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
                "Accept-Language": acceptLanguage,
                apikey: apikey
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

