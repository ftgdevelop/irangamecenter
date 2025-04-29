import { Headers, Identity, ServerAddress } from "@/enum/url";
import { UpdateUserParams } from "@/types/authentication";
import axios from "axios";

export const sendOtp = async (param: { emailOrPhoneNumber: string }, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
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

export const loginOTP = async (param: { emailOrPhoneNumber: string, code: string; }, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.LoginOTP}`,
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

export const registerOTP = async (param: { emailOrPhoneNumber: string, code: string;password: string; }, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.RegisterOTP}`,
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
        const response = await axios.get(
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

export const updateCurrentUserProfile = async (params :UpdateUserParams , token:string) => {

    try {
        const response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateCurrentUserProfile}`,
            params,
            {
                headers: {
                    ...Headers,
                    Authorization: `Bearer ${token}`
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


// export const updateNewsletterUserProfile = async (params: UpdateUserParams, token: string) => {

//     try {
//         let response = await axios.put(
//             `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateNewsletterUserProfile}`,
//             params,
//             {
//                 headers: {
//                     ...Headers,
//                     Authorization: `Bearer ${token}`
//                 },
//             },
//         )
//         return response
//     } catch (error) {
//         return error
//     }
// }

export const updateProfileEmail = async (emailAddress: string, token: string, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateProfileEmail}`,
            { emailAddress: emailAddress },
            {
                headers: {
                    ...Headers,
                    "Accept-Language":acceptLanguage,
                    Authorization: `Bearer ${token}`
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}



export const updateProfilePhoneNumber = async (phoneNumber: string, token: string) => {

    try {
        const response = await axios.put(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.UpdateProfilePhoneNumber}`,
            { phoneNumber: phoneNumber },
            {
                headers: {
                    ...Headers,
                    Authorization: `Bearer ${token}`
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const loginWithPassword = async (params: {emailOrPhoneNumber :string , password:string} , acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.LoginWithPassword}`,
            params,
            {
                headers: {
                    ...Headers,
                    "Accept-Language": acceptLanguage
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}



export const changePasswordByAuthorizedUser = async (param: { newPassword : string, token: string; }) => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.ChangePasswordByAuthorizedUser}`,
            { newPassword : param.newPassword },
            {
                headers: {
                    ...Headers,
                    Authorization: `Bearer ${param.token}`
                }
            },
        );

        return response
    } catch (error) {
        return error
    }
}

export const sendEmailActivation = async (emailAddress: string, token: string, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.SendEmailActivation}`,
            {
                emailAddress: emailAddress
            },
            {
                headers: {
                    ...Headers,
                    Authorization: `Bearer ${token}`,
                    "Accept-Language": acceptLanguage
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const changePassword = async (params: { currentPassword: string; newPassword: string; token: string }, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.ChangePassword}`,
            {
                currentPassword: params.currentPassword,
                newPassword: params.newPassword
            },
            {
                headers: {
                    ...Headers,
                    Authorization: `Bearer ${params.token}`,
                    "Accept-Language": acceptLanguage
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const forgetPassword = async (phoneNumber: string, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.ForgotPasswordByPhoneNumber}`,
            {
                phoneNumber: phoneNumber
            },
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


export const forgotPasswordVerification = async (params:{code: string; userId: number}, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.ForgotPasswordVerification}`,
            {
                code: params.code,
                userId: params.userId
            },
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


export const forgotPasswordResetPassword = async (params:{code: string; userId: number; password: string;}, acceptLanguage: string = 'fa-IR') => {

    try {
        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.ResetPassword}`,
            {
                code: params.code,
                password: params.password,
                userId: params.userId
            },
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