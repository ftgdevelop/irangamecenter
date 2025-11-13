/* eslint-disable  @typescript-eslint/no-explicit-any */

import { sendOtp } from "@/actions/identity";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxError } from "@/redux/errorSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { ReactNode, useState } from "react";
import OtpSendCode from "./OtpSendCode";
import OtpVerification from "./OtpVerification";

type Props = {
    toggleLoginType: () => void;
    title?: ReactNode;
    onLoginSuccess?: () => void;
}

const Otp: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const [savedPhoneNumber, setSavedPhoneNumber] = useState<string>("");
    const [verificationMode, setverificationMode] = useState<boolean>(false);

    const [sendCodeMoment, setSendCodeMoment] = useState<number>();

    const [loading, setLoading] = useState<boolean>(false);

    const sendOtpCode = async (phoneNumber: string, callBack?: () => void) => {

        setLoading(true);
        try {

            const response: any = await sendOtp({ emailOrPhoneNumber: phoneNumber });
            if (response.message) {
                dispatch(setReduxError({
                    title: "خطا",
                    message: response.message,
                    isVisible: true
                }));
            }
            setLoading(false);

            if (response.status == 200) {
                if (callBack) {
                    callBack();
                }
                setTimeout(() => { setSendCodeMoment(new Date().getTime()) }, 200);
            }

            if (response.status == 500) {
                dispatch(setReduxError({
                    title: "خطا",
                    message: response?.response?.data?.error?.message,
                    isVisible: true
                }));
            }

        } catch (error: any) {
            setLoading(false);
            console.log(error);

            dispatch(setReduxError({
                title: "خطا",
                isVisible: true,
                message: error?.response?.data?.error?.message
            }))
        }
    }

    const onSuccessLogin = (response: any) => {
        if (response && response.status === 200) {

            const token = response.data?.result?.accessToken
            localStorage.setItem('Token', token);

            dispatch(setReduxUser({
                isAuthenticated: true,
                user: response.data?.result?.user,
                getUserLoading: false
            }));

            const userFirstName = response.data?.result?.user?.firstName || "کاربر";

            dispatch(setReduxNotification({
                status: 'success',
                message: userFirstName + '  عزیز،  خوش آمدید.',
                isVisible: true
            }));

            if (props.onLoginSuccess) {
                props.onLoginSuccess();
            }

        } else {
            dispatch(setReduxUser({
                isAuthenticated: false,
                user: {},
                getUserLoading: false
            }));
        }
    }

    if (verificationMode) {
        return (
            <OtpVerification
                loading={loading}
                sendOtpCode={sendOtpCode}
                savedPhoneNumber={savedPhoneNumber}
                editMobileNumber={() => {
                    setverificationMode(false);
                    setSavedPhoneNumber("");
                }}
                onSuccessLogin={onSuccessLogin}
                sendCodeMoment={sendCodeMoment}
                onLoginSuccess={props.onLoginSuccess}
            />
        )
    }

    return (
        <OtpSendCode 
            loading={loading}
            toggleLoginType={props.toggleLoginType}
            submitHandler={(phoneNumber:string) => {
                setSavedPhoneNumber(phoneNumber);
                sendOtpCode(phoneNumber, () => {
                    setverificationMode(true);
                });
            }}
            title={props.title}
        />
    )
}

export default Otp;