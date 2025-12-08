/* eslint-disable  @typescript-eslint/no-explicit-any */

import { toPersianDigits } from "@/helpers";
import { useEffect, useState } from "react";
import ArrowTopLeft from "../../../icons/ArrowTopLeft";
import { loginOTP } from "@/actions/identity";
import { useAppDispatch } from "@/hooks/use-store";
import Skeleton from "../../../shared/Skeleton";
import CountDown from "../../../shared/CountDown";
import Refresh from "../../../icons/Refresh";
import { PinInput } from "@mantine/core";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import Loading from "../../../icons/Loading";
import OtpRegister from "./OtpRegister";

type Props = {
    editMobileNumber: () => void;
    savedPhoneNumber: string;
    sendOtpCode: (phoneNumber: string, callBack?: () => void) => void;
    loading: boolean;
    onSuccessLogin: (response: any) => void;
    sendCodeMoment?: number;
    onLoginSuccess?: () => void;
}

const OtpVerification: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const [verificationCode, setVerificationCode] = useState<string>("");

    const [registerMode, setRegisterMode] = useState<boolean>(false);

    const [status, setStatus ] = useState<undefined | "success" | "error">(undefined);

    const [remaindSeconds, setRemaindSeconds] = useState<number>(80);

    interface OTPCredential extends Credential {
        code: string;
    }
    
    type OTPTransportType = 'sms';

    useEffect(() => {
        if ("OTPCredential" in window) {
            const ac = new AbortController();
    
            navigator.credentials
                .get({
                    otp: { transport: ["sms"] as OTPTransportType[] },
                    signal: ac.signal,
                } as CredentialRequestOptions)
                .then((otp: Credential | null) => {
                    if (otp && "code" in otp) {
                        const otpCredential = otp as OTPCredential;
                        
                        setStatus(undefined);
                        if (otpCredential.code.length === 6) {
                            setVerificationCode(otpCredential.code);
                            registerOtp(otpCredential.code);
                        }
                    }
                })
                .catch((err: Error) => {
                    console.error(err);
                });
    
            return () => {
                ac.abort();
            };
        }
    }, []);

    useEffect(() => {

        let countDownTimer: NodeJS.Timeout;

        if (props.sendCodeMoment) {

            countDownTimer = setInterval(() => {
                setRemaindSeconds((prevState) => {
                    if (prevState > 1) {
                        return (prevState - 1);
                    } else {
                        clearInterval(countDownTimer);
                        return 0
                    }
                })
            }, 1000);
        }

        return (() => { clearInterval(countDownTimer); })

    }, [props.sendCodeMoment]);


    const [registerLoading, setRegisterLoading] = useState<boolean>(false);

    const registerOtp = async (code: string) => {
        if (code && props.savedPhoneNumber && code.length === 6) {
            setRegisterLoading(true);

            dispatch(setReduxUser({
                isAuthenticated: false,
                user: {},
                getUserLoading: true
            }));

            const response: any = await loginOTP({ code: code, emailOrPhoneNumber: props.savedPhoneNumber });

            setRegisterLoading(false);

            if (response.status == 200) {
                props.onSuccessLogin(response);
                if (props.onLoginSuccess) {
                    props.onLoginSuccess();
                }
                setStatus("success");
            } else {
                const errorMessage = response?.response?.data?.error?.message;

                let message = "";
                if (errorMessage) {
                    message = response.response.data.error.message;
                }

                if(errorMessage === "UserNotFound"){
                    setRegisterMode(true);
                }else{

                    dispatch(setReduxNotification({
                        status: 'error',
                        message: message,
                        isVisible: true
                    }));
                    setStatus("error");
                    dispatch(setReduxUser({
                        isAuthenticated: false,
                        user: {},
                        getUserLoading: false
                    }));
                }
                
            }
        }
    }

    let codeIsEntered = false;
    if (verificationCode && verificationCode.length === 6) {
        codeIsEntered = true;
    }

    if(registerMode){
        return(
            <OtpRegister 
                onSuccessLogin={props.onSuccessLogin}
                code={verificationCode}
                phoneNumber={props.savedPhoneNumber}
                onLoginSuccess={props.onLoginSuccess}
            />
        )
    }

    return (
        <>
            <h3 className="font-semibold text-[#ca54ff] text-sm text-center mb-10"> کد تایید برای شماره موبایل شما ارسال گردید.</h3>

            <div className="flex justify-between px-4 text-xs mb-12">
                <div>
                    شماره موبایل دریافت کد
                    <div className="mt-2 text-lg font-semibold tracking-widest" dir="ltr"> {toPersianDigits(props.savedPhoneNumber.replace("+98","0"))} </div>
                </div>
                <button
                    type="button"
                    onClick={props.editMobileNumber}
                    className="text-[#2ac99f]"
                >
                    ویرایش شماره موبایل
                </button>
            </div>


            <div className="px-5 text-center">

                <PinInput
                    inputMode="numeric"
                    autoFocus
                    size="lg"
                    value={verificationCode}
                    length={6}
                    className={`otp-pin ${status === "error"?"has-error": status === "success" ? "has-sucess" : ""}`}
                    onChange={code => {
                        setStatus(undefined);
                        if (code.length === 6) {
                            setVerificationCode(code);
                            if (!verificationCode) {
                                registerOtp(code);
                            }
                        }
                    }
                    }
                />

                {props.savedPhoneNumber && remaindSeconds === 0 ? (
                    <button
                        type='button'
                        className='my-10 text-sm flex justify-center gap-2 items-center mx-auto'
                        onClick={() => {
                            props.sendOtpCode(props.savedPhoneNumber , () => {
                                setRemaindSeconds(80);
                            });
                        }}
                    >
                        <Refresh className={`fill-current w-5 h-5 ${props.loading ? "animate-spin-reverse" : ""}`} />
                        ارسال مجدد کد
                    </button>
                ) : props.loading ? (

                    <Skeleton className='w-24 text-center my-10' />

                ) : (
                    <div className='text-sm text-center my-10'>
                        <CountDown
                            seconds={remaindSeconds}
                            simple
                        />
                        <span className='rtl:mr-3 ltr:ml-3'> تا دریافت مجدد کد </span>
                    </div>
                )}

                <button
                    onClick={() => {
                        if (codeIsEntered && !registerLoading) {
                            registerOtp(verificationCode);
                        }
                    }}
                    disabled={!codeIsEntered || registerLoading}
                    type="button"
                    className={`flex gap-4 items-center justify-center mb-5 h-14 w-full text-center rounded-full text-sm  text-white ${codeIsEntered ? "bg-[#aa3aff]" : "bg-[#231c50]"}`}
                >
                    تایید

                    {registerLoading ? (
                        <Loading className="fill-current w-5 h-5 animate-spin" />
                    ) : (
                        <ArrowTopLeft className="fill-current w-3.5 h-3.5" />
                    )}
                    
                </button>
            </div>

        </>
    )


}

export default OtpVerification;