import axios, { AxiosResponse, AxiosError } from "axios";
import { Cart, ServerAddress } from "@/enum/url";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  data?: unknown;
}

export const getCart = async (): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.get<CartResponse>(`${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCurrentCart}`);
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("getCart error:", err);
    return {
      message: err.message,
      statusCode: err.response?.status,
      data: err.response?.data,
    };
  }
};

export const addItem = async (
  params: { productId: string; quantity: number }
): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.post<CartResponse>(Cart.AddItem, params);
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("addItem error:", err);
    return {
      message: err.message,
      statusCode: err.response?.status,
      data: err.response?.data,
    };
  }
};

export const removeItem = async (
  params: { productId: string }
): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.delete<CartResponse>(Cart.RemoveItem, { data: params });
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("removeItem error:", err);
    return {
      message: err.message,
      statusCode: err.response?.status,
      data: err.response?.data,
    };
  }
};

export const clearCart = async (): Promise<AxiosResponse<CartResponse> | ApiError> => {
  try {
    const res = await axios.post<CartResponse>(Cart.ClearCart);
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("clearCart error:", err);
    return {
      message: err.message,
      statusCode: err.response?.status,
      data: err.response?.data,
    };
  }
};