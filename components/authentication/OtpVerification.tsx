import { toPersianDigits } from "@/helpers";
import { useEffect, useState } from "react";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import { registerOrLogin } from "@/actions/identity";
import { useAppDispatch } from "@/hooks/use-store";
import Skeleton from "../shared/Skeleton";
import CountDown from "../shared/CountDown";
import Refresh from "../icons/Refresh";
import { PinInput } from "@mantine/core";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import Loading from "../icons/Loading";

/* eslint-disable  @typescript-eslint/no-explicit-any */

type Props = {
    editMobileNumber: () => void;
    savedPhoneNumber: string;
    sendOtpCode: (phoneNumber: string, callBack?: () => void) => void;
    loading: boolean;
    onSuccessLogin: (response: any) => void;
    sendCodeMoment?: number;
}

const OtpVerification: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const [verificationCode, setVerificationCode] = useState<string>("");

    const [status, setStatus ] = useState<undefined | "success" | "error">(undefined);

    const [remaindSeconds, setRemaindSeconds] = useState<number>(80);

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

            const response: any = await registerOrLogin({ code: code, emailOrPhoneNumber: props.savedPhoneNumber });

            setRegisterLoading(false);
            if (response.status == 200) {
                props.onSuccessLogin(response);
                setStatus("success");
            } else {
                let message = "";
                if (response?.response?.data?.error?.message) {
                    message = response.response.data.error.message;
                }
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
                            props.sendOtpCode("+98" + (props.savedPhoneNumber.slice(1)) , () => {
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
                    className={`flex gap-4 items-center justify-center mb-5 h-14 w-full text-center rounded-full text-sm ${codeIsEntered ? "bg-[#aa3aff]" : "bg-[#231c50]"}`}
                >
                    تایید

                    {registerLoading ? (
                        <Loading className="fill-current w-5 h-5 animate-spin" />
                    ) : (
                        <ArrowTopLeft className="fill-current w-5 h-5" />
                    )}
                    
                </button>
            </div>

        </>
    )


}

export default OtpVerification;