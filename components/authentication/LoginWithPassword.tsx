import { toPersianDigits } from "@/helpers";
import { validateMobileNumberId, validateRequired } from "@/helpers/formik-validation"
import { Field, Form, Formik } from "formik"
import { useState } from "react";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import Loading from "../icons/Loading";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import Visibility from "../icons/Visibility";
import VisibilityOff from "../icons/Visibility-Off";

/* eslint-disable  @typescript-eslint/no-explicit-any */

type Props = {
    toggleLoginType: () => void;
    onCloseLogin: () => void;
}

const LoginWithPassword: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const [typedPhoneNumber, setTypedPhoneNumber] = useState<string>("");

    const [isPassword, setIsPassword] = useState<boolean>(true);

    const [loading, setLoading] = useState<boolean>(false);


    function isNumeric(input: string) {
        const regex = /^[\u0660-\u0669\u06F0-\u06F9\u0030-\u0039]+$/;
        return regex.test(input);
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
        password: string;
    }) => {
        const formatedPhoneNumber = "+98" + values.phoneNumber.substring(1);

        // login(formatedPhoneNumber, values.password , () => {
        //     setverificationMode(true);
        // });

    }

    return (
        <>
            <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> ورود یا ثبت نام</h3>

            <Formik
                validate={() => { return {} }}
                initialValues={{ phoneNumber: "", password: "" }}
                onSubmit={submitHandler}
            >
                {({ errors, touched, setFieldValue }) => {
                    return (

                        <Form className='p-5 text-sm flex flex-col items-center justify-center gap-5 leading-6' autoComplete='off' >


                            <div className="self-stretch">
                                <label className="px-5 mb-3 block font-semibold">
                                    شماره موبایل
                                </label>

                                <p className="px-5 text-sm mb-3">  مثلا:  {toPersianDigits("09123456789")} </p>

                                <Field
                                    name="phoneNumber"
                                    validate={(value: string) => validateMobileNumberId({
                                        expectedLength: 11,
                                        invalidMessage: "شماره موبایل وارد شده معتبر نیست",
                                        reqiredMessage: "شماره موبایل خود را وارد کنید",
                                        value: value
                                    })}
                                    type='hidden'
                                />

                                <input
                                    type='text'
                                    autoComplete="off"
                                    onChange={(e: any) => {
                                        if ((!["0", "۰", "٠"].includes(e.target.value[0]) || !isNumeric(e.target.value)) && e.target.value) return;
                                        setTypedPhoneNumber(e.target.value);
                                        setFieldValue('phoneNumber', e.target.value)
                                    }}
                                    value={typedPhoneNumber}
                                    maxLength={11}
                                    placeholder="شماره موبایل را وارد نمایید"
                                    className="block rounded-full h-14 w-full px-5 bg-[#192b39] mb-3 border-none outline-none tracking-widest placeholder:tracking-normal placeholder:text-right "
                                    dir="ltr"
                                />

                                {errors.phoneNumber && touched.phoneNumber && <div className='text-red-400 text-xs px-5 mb-4 relative'>{errors.phoneNumber}</div>}

                            </div>

                            <div className="self-stretch">
                                <label className="px-5 mb-3 block font-semibold">
                                    کلمه عبور
                                </label>


                                <div className="relative">
                                    <Field
                                        type={isPassword ? "password" : "text"}
                                        errorText={errors.password}
                                        isTouched={touched.password}
                                        id='password'
                                        name='pass'
                                        className="block rounded-full h-14 w-full px-5 input-bg-color bg-[#192b39] mb-3 border-none outline-none tracking-widest placeholder:tracking-normal placeholder:text-right "
                                        validateFunction={(value: string) => validateRequired(value, 'کلمه عبور را وارد نمایید!')}
                                        placeholder="کلمه عبور را وارد نمایید"
                                    />

                                    <button
                                        type='button'
                                        className='absolute top-1/2 left-3 -translate-y-1/2 outline-none'
                                        tabIndex={-1}
                                        onClick={() => { setIsPassword(prevState => !prevState) }}
                                    >
                                        {isPassword ? (
                                            <VisibilityOff className='w-5 h-5 fill-neutral-500' />
                                        ) : (
                                            <Visibility className='w-5 h-5 fill-neutral-500' />
                                        )}
                                    </button>


                                </div>

                                {errors.phoneNumber && touched.phoneNumber && <div className='text-red-400 text-xs px-5 mb-4 relative'>{errors.phoneNumber}</div>}

                            </div>

                            <button
                                type="submit"
                                className="flex gap-4 items-center justify-center mb-5 h-14 w-full text-center bg-[#aa3aff] rounded-full text-sm"
                            >
                                ورود

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
                                ورود با رمز یک بار مصرف
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

export default LoginWithPassword;