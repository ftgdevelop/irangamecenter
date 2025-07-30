/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Commerce, ServerAddress } from "@/enum/url";
import { GetAllProductsParams } from "@/types/commerce";
import axios from "axios";

const apikey = "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB"

export const getProducts = async (params: GetAllProductsParams, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    let queryParams = `?MaxResultCount=${params.MaxResultCount}&SkipCount=${params.SkipCount}`

    if (params.Brands?.length) {
        params.Brands.forEach(brand => {
            queryParams += `&Brands=${brand}`
        })
    }
    switch (params.sort) {
        case "HighPrice":
            queryParams += `&OrderBy=Price&SortBy=asc`;
            break;
        case "LowPrice":
            queryParams += `&OrderBy=Price&SortBy=desc`;
            break;
        case "Sale":
            queryParams += `&OrderBy=Sale&SortBy=asc`;
            break;
        case "Visitor":
            queryParams += `&OrderBy=Visitor&SortBy=asc`;
            break;
        default:
            break;
    }

    if(params.VariantSlug){
          queryParams += `&VariantSlug=${params.VariantSlug}`;
    }

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAll}${queryParams}`,
            headers: {
                "Accept-Language": acceptLanguage,
                apikey: apikey,
                currency: "IRR"
            }
        });
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

export type ProductSortKeywords = "Sale" | "Visitor" | "LowPrice" | "HighPrice";

export type ProductSortOption = {
    label: string;
    keywords: ProductSortKeywords;
}

