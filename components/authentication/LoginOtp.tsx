/* eslint-disable  @typescript-eslint/no-explicit-any */

import {Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import { sendOtp } from "@/actions/identity";
import Loading from "../icons/Loading";
import { setReduxError } from "@/redux/errorSlice";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import OtpVerification from "./OtpVerification";
import PhoneInput from "../shared/PhoneInput";

type Props = {
    toggleLoginType: () => void;
    onCloseLogin: () => void;
}

const LoginOtp: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const phoneInputRef = useRef<HTMLInputElement>(null);

    const [savedPhoneNumber, setSavedPhoneNumber] = useState<string>("");
    const [verificationMode, setverificationMode] = useState<boolean>(false);

    const [sendCodeMoment, setSendCodeMoment] = useState<number>();

    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        phoneInputRef.current?.focus();
    }, []);

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
            props.onCloseLogin();

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

        } else {
            dispatch(setReduxUser({
                isAuthenticated: false,
                user: {},
                getUserLoading: false
            }));
        }
    }

    const submitHandler = async (values: {
        phoneNumber: string;
    }) => {
        setSavedPhoneNumber(values.phoneNumber);
        sendOtpCode(values.phoneNumber, () => {
            setverificationMode(true);
        });
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
            />
        )
    }

    return (
        <>
            <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> ورود یا ثبت نام</h3>

            <Formik
                validate={() => { return {} }}
                initialValues={{ phoneNumber: "" }}
                onSubmit={submitHandler}
            >
                {({ errors, touched, values, setFieldValue }) => {
                    return (

                        <Form className='p-5 text-sm flex flex-col items-center justify-center gap-5 leading-6' autoComplete='off' >
                            <div className="self-stretch mb-5">
                                <PhoneInput
                                    placeholder="شماره موبایل را وارد نمایید"
                                    heightClass="h-14"
                                    label='شماره موبایل'
                                    defaultCountry={
                                        {
                                            countryCode: "ir",
                                            dialCode: "98",
                                            format: "... ... ...."
                                        }
                                    }
                                    onChange={(v: string) => {
                                        setFieldValue('phoneNumber', v)
                                    }}
                                    value={values.phoneNumber}
                                    name='phoneNumber'
                                    isTouched={touched.phoneNumber}
                                    errorText={errors.phoneNumber}
                                    className="mb-5"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex gap-4 items-center justify-center mb-5 h-14 w-full text-center bg-[#aa3aff] rounded-full text-sm"
                            >
                                تایید و دریافت کد

                                {loading ? (
                                    <Loading className="fill-current w-5 h-5 animate-spin" />
                                ) : (
                                    <ArrowTopLeft className="fill-current w-5 h-5" />
                                )}
                            </button>

                            <button
                                type="button"
                                className="text-[#2ac99f] font-semibold text-sm"
                                onClick={props.toggleLoginType}
                            >
                                ورود با کلمه عبور
                            </button>

                            <Link
                                href={"/forget-password"}
                                className="text-[#2ac99f] font-semibold text-sm"
                            >
                                فراموشی رمز عبور
                            </Link>

                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default LoginOtp;