/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Commerce, ServerAddress } from "@/enum/url";
import axios from "axios";

const apikey = "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB"

interface GetAllProductsParams {
    SkipCount: number;
    MaxResultCount: number;
}

export const getProducts = async (params: GetAllProductsParams , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAll}`,
            params:params,
            headers: {
                "Accept-Language": acceptLanguage,
                apikey:apikey,
                currency:"IRR"
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export const getProductBySlug = async (slug: string , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetBySlug}?Slug=${slug}`,
            headers: {
                "Accept-Language": acceptLanguage,
                apikey:apikey,
                currency:"IRR",
                tenantid:7
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}