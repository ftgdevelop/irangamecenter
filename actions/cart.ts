/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Cart, ServerAddress } from "@/enum/url";
import { useAppSelector } from "@/hooks/use-store";
import { UpdateUserParams } from "@/types/authentication";
import {
  CreateOrderResponseType,
  GetCartByProductIdResponseType,
  GetCurrentProductResponseType,
  ProductDetailData,
} from "@/types/commerce";
import axios, { AxiosError } from "axios";

export interface CartResponse {
  result?: {
    deviceId?: string;
    id: string;
    items: ProductDetailData[];
    payableAmount: number;
    profitAmount: number;
    totalItemsPrice: number;
    totalQuantity: number;
  };
}

export interface ApiError {
  message: string;
  statusCode?: number;
  data?: unknown;
}

export const useCartApi = () => {
  const deviceId = useAppSelector((state) => state.cart.deviceId);
  const currency = useAppSelector((state) => state.cart.currency);

  const getHeaders = (): Record<string, string> => {

    const token = localStorage.getItem("Token");

    const headers: Record<string, string> = {};
    headers['tenantid'] = '1040';
    headers['apikey'] = "e8fad1497a1244f29f15cde4a242baf0";
    headers["Currency"] = currency || "IRR";
    if (deviceId) headers["X-Device-Id"] = deviceId;
    if(token) headers["Authorization"] =  `Bearer ${token}`;

    return headers
  };

  const handleError = (error: unknown, label: string) => {
    const err = error as AxiosError<ApiError>;
    console.error(`${label} error:`, err.response?.data || err.message);
    throw err;
  };

  const getCart = async () => {
    try {
      const res = await axios.get<GetCurrentProductResponseType>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCurrentCart}`,
        { headers: getHeaders() }
      );
      return res.data;
    } catch (error) {
      handleError(error, "getCart");
    }
  };

const getCartByProductId = async (
  params:{
    productId: number;
    deviceId?: string;
    userToken?: string;
  }
): Promise<GetCartByProductIdResponseType> => {
  try {

    const Header = getHeaders();
    if (params.deviceId) Header["X-Device-Id"] = params.deviceId;
    if(params.userToken) Header["Authorization"] =  `Bearer ${params.userToken}`;

    const res = await axios.get<GetCartByProductIdResponseType>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCartByProductId}?ProductId=${params.productId}`,
      { headers: Header }
    );
    return res.data;
  } catch (error) {
    handleError(error, "getCartByProductId");
    throw error;
  }
};

  const addItem = async (
    params: { variantId: number;}
  ): Promise<CartResponse> => {
    try {
      const res = await axios.post<CartResponse>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.AddItem}`,
        {
          variantId: params.variantId,
          quantity:1
         },
        { headers: getHeaders()}
      );
      return res.data;
    } catch (error) {
      handleError(error, "addItem");
      throw error;
    }
  };

  const removeItem = async (params: { Id: number }): Promise<CartResponse> => {
    try {
      const res = await axios.delete<CartResponse>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.RemoveItem}?Id=${params.Id}`,
        { headers: getHeaders() }
      );
      return res.data;
    } catch (error) {
      handleError(error, "removeItem");
      throw error;
    }
  };

  const clearCart = async (): Promise<CartResponse> => {
    try {
      const res = await axios.post<CartResponse>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.ClearCart}`,
        {},
        { headers: getHeaders() }
      );
      return res.data;
    } catch (error) {
      handleError(error, "clearCart");
      throw error;
    }
  };

  const createOrder = async ( params?: UpdateUserParams ) => {
    try {
      const res = await axios.post<CreateOrderResponseType>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.CreateOrder}`,
        params || {},
        { headers: getHeaders()}
      );
   
      return res;
    } catch (error) {
      handleError(error, "createOrder");
      return error
    }
  };

  return {
    getCart,
    getCartByProductId,
    addItem,
    removeItem,
    clearCart,
    createOrder
  };
};