import axios, { AxiosError } from "axios";
import { Cart, ServerAddress } from "@/enum/url";
import {
  GetCartByProductIdResponseType,
  GetCurrentProductResponseType,
  ProductDetailData,
} from "@/types/commerce";
import { useAppSelector } from "@/hooks/use-store";

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
    const headers: Record<string, string> = {};

    if (currency) headers["Currency"] = currency;
    if (deviceId) headers["X-Device-Id"] = deviceId;

    return headers;
  };

  const handleError = (error: unknown, label: string) => {
    const err = error as AxiosError<ApiError>;
    console.error(`${label} error:`, err.response?.data || err.message);
    throw err;
  };

  const getCart = async (): Promise<GetCurrentProductResponseType> => {
    try {
      const res = await axios.get<GetCurrentProductResponseType>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCurrentCart}`,
        { headers: getHeaders() }
      );
      return res.data;
    } catch (error) {
      handleError(error, "getCart");
      throw error;
    }
  };

  const getCartByProductId = async (
    productId: number
  ): Promise<GetCartByProductIdResponseType> => {
    try {
      const res = await axios.get<GetCartByProductIdResponseType>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCartByProductId}?ProductId=${productId}`,
        { headers: getHeaders() }
      );
      return res.data;
    } catch (error) {
      handleError(error, "getCartByProductId");
      throw error;
    }
  };

  const addItem = async (
    params: { variantId: number; quantity: number }
  ): Promise<CartResponse> => {
    try {
      const res = await axios.post<CartResponse>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.AddItem}`,
        params,
        { headers: getHeaders() }
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

  return {
    getCart,
    getCartByProductId,
    addItem,
    removeItem,
    clearCart,
  };
};