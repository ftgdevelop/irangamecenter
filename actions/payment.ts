import { Headers, Payment, ServerAddress } from "@/enum/url";
import { GetTransactionParams } from "@/types/payment";
import axios from "axios";

export const getUserBalance = async (token: string) => {

  try {
    let response = await axios.get(
      `${ServerAddress.Type}${ServerAddress.Payment}${Payment.GetBalance}`,
      {
        headers: {
          ...Headers,
          Currency: "IRR",
          Authorization: `Bearer ${token}`
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const getDepositBankGateway = async (token: string) => {
  try {
    const response = await axios.get(
      `${ServerAddress.Type}${ServerAddress.Payment}${Payment.GetDepositBankGateway}?CurrencyType=IRR`,
      {
        headers: {

          ...Headers,
          Currency: "IRR",
          Authorization: `Bearer ${token}`,
          "Accept-Language": "fa-IR",
          Accept: 'application/json;charset=UTF-8'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const makeDepositToken = async (params: { gatewayId: number; callBackUrl: string; amount: number; currencyType: string; ipAddress: number }, token: string) => {
  try {
    const response = await axios.post(
      `${ServerAddress.Type}${ServerAddress.Payment}${Payment.MakeDepositToken}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}


export const getTransactionDeposit = async (params:GetTransactionParams, token:string, acceptLanguage: string = 'fa-IR') => {
  try {
    const response = await axios.get(
      `${ServerAddress.Type}${ServerAddress.Payment}${Payment.GetTransactionDeposit}`,
      {
        params:params,
        headers: {
          ...Headers,
          Currency: "IRR",
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en-US"
        }
      }
    )
    return response
  } catch (error) {
    return error
  }
}

export const getBanksGateways = async (params: {token:string; reserveId: number; username: string;currency?: string;}, acceptLanguage: string = 'fa-IR') => {
  try {
    const response = await axios.get(
      `${ServerAddress.Type}${ServerAddress.Payment}${Payment.GetBankGateways}?ReserveId=${params.reserveId}&Username=${params.username}`,
      {
        headers: {
          ...Headers,
          Currency: params.currency || "IRR",
          Authorization: `Bearer ${params.token}`,
          "Accept-Language": acceptLanguage || "en-US"
        }
      }
    )
    return response
  } catch (error) {
    return error
  }
}
