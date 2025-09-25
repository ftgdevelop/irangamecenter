/* eslint-disable  @typescript-eslint/no-explicit-any */

import { forgetPassword, forgotPasswordVerification } from "@/actions/identity";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Loading from "@/components/icons/Loading";
import Refresh from "@/components/icons/Refresh";
import CountDown from "@/components/shared/CountDown";
import Skeleton from "@/components/shared/Skeleton";
import { toPersianDigits } from "@/helpers";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { PinInput } from "@mantine/core";
import { useEffect, useState } from "react";

type Props = {
    userId: number;
    phoneNumber: string;
    editMobileNumber: () => void;
    setPin: (p: string) => void;
}

const VerifyForgetPassword: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const [sendCodeMoment, setsendCodeMoment] = useState<string>();

    const [status, setStatus] = useState<undefined | "success" | "error">(undefined);

    const [remaindSeconds, setRemaindSeconds] = useState<number>(80);

    const [verificationCode, setVerificationCode] = useState<string>("");

    const [sendCodeLoading, setSendCodeLoading] = useState(false);
    const [verificationLoading, setVerificationLoading] = useState(false);

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
                            verifyCode(otpCredential.code);
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

        if (sendCodeMoment) {

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

    }, [sendCodeMoment]);

    useEffect(()=>{
        setsendCodeMoment(new Date().toString());
    },[]);


    const sendCodeAgain = async () => {
        setSendCodeLoading(true);

        dispatch(setReduxNotification({
            status: '',
            message: "",
            isVisible: false
        }));

        const response: any = await forgetPassword(props.phoneNumber);

        setSendCodeLoading(false);
        if (response.data?.result?.userId) {
            setsendCodeMoment(new Date().toString());
            setRemaindSeconds(80);

            dispatch(setReduxNotification({
                status: 'success',
                message: "کد بازیابی برای شماره موبایل شما ارسال گردید.",
                isVisible: true
            }));

        } else {

            const errorMessage = response?.response?.data?.error?.message;

            dispatch(setReduxError({
                status: 'error',
                message: errorMessage || "ارسال اطلاعات ناموفق",
                isVisible: true
            }));

        }
    }

    const verifyCode = async (code: string) => {

        setVerificationLoading(true);

        if (code && props.userId && code.length === 6) {
            setVerificationLoading(true);

            const response: any = await forgotPasswordVerification({
                code: code,
                userId: props.userId
            });

            setVerificationLoading(false);

            if (response.status == 200) {
                props.setPin(code);
            } else {
                const errorMessage = response?.response?.data?.error?.message;
                let message = "";
                if (errorMessage) {
                    message = response.response.data.error.message;
                }

                dispatch(setReduxNotification({
                    status: 'error',
                    message: message,
                    isVisible: true
                }));
                setStatus("error");

            }
        }

    }

    let codeIsEntered = false;
    if (verificationCode && verificationCode.length === 6) {
        codeIsEntered = true;
    }


    return (
        <>
            <h3 className="font-semibold text-[#ca54ff] text-sm text-center mb-10"> کد تایید برای شماره موبایل شما ارسال گردید.</h3>

            <div className="flex justify-between px-4 text-xs mb-12">
                <div>
                    شماره موبایل دریافت کد
                    <div className="mt-2 text-lg font-semibold tracking-widest" dir="ltr"> {toPersianDigits(props.phoneNumber.replace("+98", "0"))} </div>
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
                    length={6}
                    className={`otp-pin ${status === "error" ? "has-error" : status === "success" ? "has-sucess" : ""}`}
                    onChange={code => {
                        setStatus(undefined);
                        if (code.length === 6) {
                            setVerificationCode(prevState => {
                                if (!prevState) {
                                    verifyCode(code);
                                }
                                return (code)
                            });
                        }
                    }
                    }
                />

                {props.phoneNumber && remaindSeconds === 0 ? (
                    <button
                        type='button'
                        className='my-10 text-sm flex justify-center gap-2 items-center mx-auto'
                        onClick={sendCodeAgain}
                    >
                        <Refresh className={`fill-current w-5 h-5 ${sendCodeLoading ? "animate-spin-reverse" : ""}`} />
                        ارسال مجدد کد
                    </button>
                ) : sendCodeLoading ? (

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
                        if (codeIsEntered && !verificationLoading) {
                            verifyCode(verificationCode);
                        }
                    }}
                    disabled={!codeIsEntered || verificationLoading}
                    type="button"
                    className={`flex gap-4 items-center justify-center mb-5 h-14 w-full text-center rounded-full text-sm ${codeIsEntered ? "bg-[#aa3aff]" : "bg-[#231c50]"}`}
                >
                    تایید

                    {verificationLoading ? (
                        <Loading className="fill-current w-5 h-5 animate-spin" />
                    ) : (
                        <ArrowTopLeft className="fill-current w-3.5 h-3.5" />
                    )}

                </button>
            </div>

        </>
    )
}

export default VerifyForgetPassword;