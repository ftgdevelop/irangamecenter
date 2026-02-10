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


export const getProductBySlug = async (params : {slug: string; platform?: string; variantId?: number; acceptLanguage: "fa-IR" | "en-US" | "ar-AE"}) => {

    let queryParams = `Slug=${params.slug}`;

    if(params.platform){
        queryParams += `&Platform=${params.platform}`;
    }

    if(params.variantId){
        queryParams += `&VariantId=${params.variantId}`;
    }

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetBySlug}?${queryParams}`,
            headers: {
                ...Headers,
                "Accept-Language": params.acceptLanguage,
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

export const getVariantById = async (id: number, acceptLanguage: "fa-IR" | "en-US" | "ar-AE" = "fa-IR") => {

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetVariantById}?Id=${id}`,
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

export const getSimilarsBySlug = async (params : {slug: string; platform?: string; variantId?: number; acceptLanguage: "fa-IR" | "en-US" | "ar-AE"}) => {

    let queryParams = `Slug=${params.slug}`;

    if(params.platform){
        queryParams += `&Platform=${params.platform}`;
    }

    if(params.variantId){
        queryParams += `&VariantId=${params.variantId}`;
    }

    try {
        const response: any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetSimilar}?${queryParams}`,
            headers: {
                ...Headers,
                "Accept-Language": params.acceptLanguage,
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
      `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.Approve}`,
      {
        orderId: params.orderId,
        orderNumber: params.orderNumber
      },
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

export const getAllOrders = async (
  params: {
    SkipCount: number;
    MaxResultCount: number;
    status?: string;
    search?: string;
  },
  token: string,
  signal?: AbortSignal // اضافه کردن signal
) => {
  try {
    const query = [`SkipCount=${params.SkipCount}&MaxResultCount=${params.MaxResultCount}`];

    if (params.status) {
      const statusQueries = `Statuses=${params.status}`;
      query.push(statusQueries);
    }
    if (params.search) {
      query.push(`IdOrTitle=${params.search}`);
    }

    const res: any = await axios({
      method: "get",
      url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAllOrders}?${query.join("&")}`,
      headers: {
        ...Headers,
        "Accept-Language": "fa-IR",
        currency: "IRR",
        Authorization: `Bearer ${token}`,
      },
      signal, // ارسال signal به axios
    });

    return res;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    }
    return error;
  }
};



export const getOrdersStatistics = async (token: string) => {
    try{
        const res : any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetOrdersStatistics}`,
            headers: {
                ...Headers,
                "Accept-Language": "fa-IR",
                currency: "IRR",
                Authorization: `Bearer ${token}`
            }
        })
        return res

    } catch (error){
        return error
    }
}
export const getOrderDetailItem = async (params: {id: number; token: string;}) => {
    try{
        const res : any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetOrderDetailItem}?Id=${params.id}`,
            headers: {
                ...Headers,
                "Accept-Language": "fa-IR",
                currency: "IRR",
                Authorization: `Bearer ${params.token}`
            }
        })
        return res

    } catch (error){
        return error
    }
}


export const submitOrderForm = async ( params:{ 
    orderItemId: number;
    loginProviderId: number;
    fields:{
        fieldKey: string;
        value: string | boolean;
    }[];
 }, token: string) => {
  try {
    const response = await axios.post(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.SubmitOrderForm}`,
      params,
      {
        headers: {
        ...Headers,
        Currency: "IRR",
        "Accept-Language": "fa-IR",
        Authorization: `Bearer ${token}`,          
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const getCategoryBySlug = async (params: {slug: string; token: string;}) => {
    try{
        const res : any = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetCategoryBySlug}?Slug=${params.slug}`,
            headers: {
                ...Headers,
                "Accept-Language": "fa-IR",
                currency: "IRR",
                Authorization: `Bearer ${params.token}`
            }
        })
        return res

    } catch (error){
        return error
    }
}

export const addToWishlist = async ( params:{ 
    productId: number;
    token: string
}) => {
  try {
    const response = await axios.post(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.AddToWishlist}`,
      params,
      {
        headers: {
        ...Headers,
        Authorization: `Bearer ${params.token}`,          
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const existInWishlist = async ( params:{ 
    productId: number;
    token: string
}) => {
  try {
    const response = await axios.post(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.ExistInWishlist}`,
      null,
      {
        headers: {
        ...Headers,
        Authorization: `Bearer ${params.token}`,          
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
