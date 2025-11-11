/* eslint-disable  @typescript-eslint/no-explicit-any */

import { validateRequired } from "@/helpers/formik-validation"
import { Form, Formik } from "formik"
import { ReactNode, useEffect, useRef, useState } from "react";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import Loading from "../icons/Loading";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import PhoneInput from "../shared/PhoneInput";
import FormikField from "../shared/FormikField";
import { loginWithPassword } from "@/actions/identity";
import { setReduxError } from "@/redux/errorSlice";

type Props = {
    toggleLoginType: () => void;
    initialPhoneNumber?: string;
    title?: ReactNode;
}

const LoginWithPassword: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const passwordRef  = useRef<HTMLElement>(null);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(props.initialPhoneNumber){
            passwordRef.current?.focus();
        }
    },[props.initialPhoneNumber]);

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
        password: string;
    }) => {

        if (!values.phoneNumber) return;

        setLoading(true);

        dispatch(setReduxUser({
            isAuthenticated: false,
            user: {},
            getUserLoading: true
        }));

        const response: any = await loginWithPassword({
            password: values.password,
            emailOrPhoneNumber: values.phoneNumber
        });
        setLoading(false);

        if (response.status == 200) {

            onSuccessLogin(response);

        } else {

            dispatch(setReduxUser({
                isAuthenticated: false,
                user: {},
                getUserLoading: false
            }));

            if (response?.response?.data?.error?.message) {
                dispatch(setReduxError({
                    title: "خطا",
                    message: response.response.data.error.message,
                    isVisible: true
                }))
            }
        }
    }

    return (
        <>
            {
                props.title ? props.title : <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> ورود یا ثبت نام</h3>

            }

            <Formik
                validate={() => { return {} }}
                initialValues={{ phoneNumber: props.initialPhoneNumber || "", password: "" }}
                onSubmit={submitHandler}
            >
                {({ errors, touched, values, setFieldValue }) => {
                    return (

                        <Form className='p-5 text-sm flex flex-col items-center justify-center gap-5 leading-6' autoComplete='off' >


                            <div className="self-stretch">
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
                                    initialValue={values.phoneNumber}
                                    name='phoneNumber'
                                    isTouched={touched.phoneNumber}
                                    errorText={errors.phoneNumber}
                                    className="mb-5"
                                />
                            </div>

                            <div className="self-stretch">

                                <FormikField
                                    ref={passwordRef}
                                    heightClassName="h-14"
                                    isPassword
                                    className="mb-8"
                                    fieldClassName="pl-12 placeholder:text-right ltr"
                                    setFieldValue={setFieldValue}
                                    //onChange={()=>{setError(false);}}
                                    errorText={errors.password}
                                    id='password'
                                    name='password'
                                    isTouched={touched.password}
                                    label="کلمه عبور"
                                    maxLength={15}
                                    placeholder="کلمه عبور را وارد کنید"
                                    validateFunction={(value: string) => validateRequired(value, 'کلمه عبور را وارد کنید')}
                                    value={values.password}
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex gap-4 items-center justify-center mb-5 h-14 w-full text-center bg-[#aa3aff] rounded-full text-sm"
                            >
                                ورود

                                {loading ? (
                                    <Loading className="fill-current w-5 h-5 animate-spin" />
                                ) : (
                                    <ArrowTopLeft className="fill-current w-3.5 h-3.5" />
                                )}

                            </button>

                            <button
                                type="button"
                                className="text-[#2ac99f] font-semibold text-sm"
                                onClick={props.toggleLoginType}
                            >
                                ورود با رمز یک بار مصرف
                            </button>

                            <Link
                                href={"/profile/forget-password"}
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

export default LoginWithPassword;