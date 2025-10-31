import axios, { AxiosResponse, AxiosError } from "axios";
import { Cart, ServerAddress } from "@/enum/url";
import { ProductDetailData } from "@/types/commerce";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  result: {
    deviceId: string,
    id : string
    items: ProductDetailData[],
    payableAmount: number,
    profitAmount : number,
    totalItemsPrice : number,
    totalQuantity : number
  }

}

export interface ApiError {
  message: string;
  statusCode?: number;
  data?: unknown;
}

export const getCart = async (): Promise<AxiosResponse<CartResponse>> => {
  try {
    const res = await axios.get<CartResponse>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCurrentCart}`
    );
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("getCart error:", err);
    throw err; 
  }
};

export const addItem = async (
  params: { variantId: number; quantity: number }
): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.post<CartResponse>(`${ServerAddress.Type}${ServerAddress.Commerce}${Cart.AddItem}`, params);
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err
  }
};

export const removeItem = async (
  params: { Id: number }
): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.delete<CartResponse>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.RemoveItem}`
, { data: params });
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err
  }
};

export const clearCart = async (): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.post<CartResponse>(`${ServerAddress.Type}${ServerAddress.Commerce}${Cart.ClearCart}`);
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err

  }
};