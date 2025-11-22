import { Cart, ServerAddress } from "@/enum/url";
import {  useAppSelector } from "@/hooks/use-store";
import { UpdateUserParams } from "@/types/authentication";
import {
  CreateOrderResponseType,
  GetCartByProductIdResponseType,
  GetCurrentProductResponseType,
  ProductDetailData,
} from "@/types/commerce";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};
    
    headers['apikey'] = "e8fad1497a1244f29f15cde4a242baf0";

    if (currency) headers["Currency"] = currency;
    if (deviceId) headers["X-Device-Id"] = deviceId;

    return headers
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
  productId: number,
  token?: string | null
): Promise<GetCartByProductIdResponseType> => {
  try {
    const headers = { ...getHeaders() };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await axios.get<GetCartByProductIdResponseType>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCartByProductId}?ProductId=${productId}`,
      { headers }
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

  const createOrder = async (
    token: string,
    params?: UpdateUserParams
  ): Promise<CreateOrderResponseType> => {
    try {
      const res = await axios.post<CreateOrderResponseType>(
        `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.CreateOrder}`,
        params || {},
        { headers: { ...getHeaders(), Authorization: `Bearer ${token}` } }
      );
      if (res.data?.result?.orderNumber) {
        router.push(`/cart/payment?orderNumber=${res.data?.result?.orderNumber}`);

      }     
      return res.data;
    } catch (error) {
      handleError(error, "createOrder");
      throw error;
    }
  };

  return {
    getCart,
    getCartByProductId,
    addItem,
    removeItem,
    clearCart,
    createOrder,
  };
};