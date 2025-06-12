/* eslint-disable  @typescript-eslint/no-explicit-any */

import { ServerAddress, Strapi } from '@/enum/url';
import axios from 'axios';

const strapiToken = process.env.PROJECT_SERVER_STRAPI_TOKEN;

export const getStrapiPages = async (query: string , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
               url: `${ServerAddress.Type}${ServerAddress.Strapi}${Strapi.Pages}?${query}`,
            headers: {
                "Accept-Language": acceptLanguage,
                Authorization: `bearer ${strapiToken}`
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}
export const getStrapiHighlight = async (query: string , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
               url: `${ServerAddress.Type}${ServerAddress.Strapi}${Strapi.Highlights}?${query}`,
            headers: {
                "Accept-Language": acceptLanguage,
                Authorization: `bearer ${strapiToken}`
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getStrapiContact = async (query: string , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
               url: `${ServerAddress.Type}${ServerAddress.Strapi}${Strapi.Contact}?${query}`,
            headers: {
                "Accept-Language": acceptLanguage,
                Authorization: `bearer ${strapiToken}`
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}
