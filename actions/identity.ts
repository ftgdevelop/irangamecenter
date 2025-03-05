import { Headers, Identity, ServerAddress } from "@/enum/url";
import { UpdateUserParams } from "@/types/authentication";
import axios from "axios";

export const sendOtp = async (param: { emailOrPhoneNumber: string }, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.SendOTP}`,
            param,
            {
                headers: {
                    ...Headers,
                    "Accept-Language": acceptLanguage
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const registerOrLogin = async (param: { emailOrPhoneNumber: string, code: string; }, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.RegisterOrLogin}`,
            param,
            {
                headers: {
                    ...Headers,
                    "Accept-Language": acceptLanguage
                }
            },
        );

        return response
    } catch (error) {
        return error
    }
}

export const getCurrentUserProfile = async (token: string) => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.GetCurrentUserProfileForEdit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const updateCurrentUserProfile = async (params: UpdateUserParams, token: string) => {

    try {
        let response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateCurrentUserProfile}`,
            params,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const updateNewsletterUserProfile = async (params: UpdateUserParams, token: string) => {

    try {
        let response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateNewsletterUserProfile}`,
            params,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const updateProfileEmail = async (emailAddress: string, token: string, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateProfileEmail}`,
            { emailAddress: emailAddress },
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}



export const updateProfilePhoneNumber = async (phoneNumber: string, token: string, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateProfilePhoneNumber}`,
            { phoneNumber: phoneNumber },
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}
