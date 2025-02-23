import { Headers, Identity, ServerAddress } from "@/enum/url";
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