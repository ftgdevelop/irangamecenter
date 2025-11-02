import axios, { AxiosError } from "axios";
import { Cart, ServerAddress } from "@/enum/url";
import { GetCartByProductIdResponseType, GetCurrentProductResponseType, ProductDetailData } from "@/types/commerce";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
    result?:{
      deviceId?: string,
      id : string
      items: ProductDetailData[],
      payableAmount: number,
      profitAmount : number,
      totalItemsPrice : number,
      totalQuantity: number
    };

}

export interface ApiError {
  message: string;
  statusCode?: number;
  data?: {
      result?: {
      deviceId?: string,
      id : string
      items: ProductDetailData[],
      payableAmount: number,
      profitAmount : number,
      totalItemsPrice : number,
      totalQuantity: number
    }
  }
}

export const getCart = async (deviceId?: string): Promise<GetCurrentProductResponseType> => {
  try {
    const res = await axios.get<GetCurrentProductResponseType>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCurrentCart}`,{
        headers: {
          "X-Device-Id": deviceId,
        },
      }
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("getCart error:", err);
    throw err; 
  }
};

export const getCartByProductId = async (deviceId : string, productId:number): Promise<GetCartByProductIdResponseType> => {
  try {
    const res = await axios.get<GetCartByProductIdResponseType>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.GetCartByProductId}?ProductId=${productId}`,{
        headers: {
          "X-Device-Id": deviceId,
        },
      }
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    console.error("getCart error:", err);
    throw err; 
  }
};

export const addItem = async (
  params: { variantId: number; quantity: number }, deviceId?: string
): Promise<CartResponse> => {
  try {
    console.log({params, deviceId});
    
    const res = await axios.post<CartResponse>(`${ServerAddress.Type}${ServerAddress.Commerce}${Cart.AddItem}`, params, {
      headers: {
        "X-Device-Id": deviceId,
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err
  }
};

export const removeItem = async (
  params: { Id: number },
  deviceId?: string
): Promise<CartResponse> => {
  try {
    const res = await axios.delete<CartResponse>(
      `${ServerAddress.Type}${ServerAddress.Commerce}${Cart.RemoveItem}`
      , {
      headers: {
        "X-Device-Id": deviceId,
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err
  }
};

export const clearCart = async (deviceId : string): Promise<CartResponse> => {
  try {
    const res = await axios.post<CartResponse>(`${ServerAddress.Type}${ServerAddress.Commerce}${Cart.ClearCart}`, {}, {
      headers: {
        "X-Device-Id": deviceId,
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err

  }
};