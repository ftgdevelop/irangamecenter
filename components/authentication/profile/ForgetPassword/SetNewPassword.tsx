/* eslint-disable  @typescript-eslint/no-explicit-any */

import { forgotPasswordResetPassword } from "@/actions/identity";
import InfoCircle from "@/components/icons/InfoCircle";
import Loading from "@/components/icons/Loading";
import FormikField from "@/components/shared/FormikField";
import ModalPortal from "@/components/shared/layout/ModalPortal";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
    pin: string;
    userId: number;
    phoneNumber: string;
}

const SetNewPassword: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const firstInputRef = useRef<HTMLInputElement>(null);

    const [submitLoading, setSubmitLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | "">("");

    const initialValues = {
        newPassword: "",
        repeatPassword: ""
    }

    useEffect(()=>{
        firstInputRef?.current?.focus()
    },[]);

    const submitHandler = async (parameters: {
        newPassword: string;
        repeatPassword: string;
    }) => {

        setSubmitLoading(true);

        dispatch(setReduxNotification({
            status: '',
            message: "",
            isVisible: false
        }));

        const response: any = await forgotPasswordResetPassword({
            code: props.pin,
            userId: props.userId,
            password: parameters.newPassword,
        })

        setSubmitLoading(false);

        if (response.data && response.data.success) {
            setStatus("success");
        } else {

            const errorMessage = response?.response?.data?.error?.message;

            dispatch(setReduxError({
                status: 'error',
                message: errorMessage || "ارسال اطلاعات ناموفق",
                isVisible: true
            }));

        }
    }

    const validatePassword = (value: string, equalTo?: string) => {
        let error;
        if (!value) {
            error = "کلمه عبور را وارد نمایید";
        } else if (value.length < 6) {
            error = "کلمه عبور باید حداقل 6 حرف باشد";
        } else if (equalTo && value !== equalTo) {
            error = "تکرار کلمه عبور با کلمه عبور مطابقت ندارد";
        }

        return error;
    }

    return (
        <>

            <Formik
                validate={() => {
                    return {}
                }}
                initialValues={initialValues}
                onSubmit={submitHandler}
            >
                {({
                    errors,
                    touched,
                    isValid,
                    isSubmitting,
                    setFieldValue,
                    values,
                }) => {
                    if (isSubmitting && !isValid) {
                        setTimeout(() => {
                            const formFirstError = document.querySelector(
                                '.has-validation-error',
                            )
                            if (formFirstError) {
                                formFirstError.scrollIntoView({ behavior: 'smooth' })
                            }
                        }, 100)
                    }
                    return (
                        <Form className="mx-3" autoComplete="off">

                            <FormikField
                                ref={firstInputRef}
                                isPassword
                                className="mb-5"
                                setFieldValue={setFieldValue}
                                errorText={errors.newPassword as string}
                                id='newPassword'
                                name='newPassword'
                                isTouched={touched.newPassword}
                                label={"کلمه عبور جدید"}
                                labelDescription={<div className='pr-5 text-2xs mb-2 mt-1'> <InfoCircle className='ml-1 w-4 h-4 fill-current inline-block' />  رمز عبور باید حداقل شامل 6 حرف باشد </div>}
                                validateFunction={(value: string) => validatePassword(value)}
                                value={values.newPassword!}
                            />

                            <FormikField
                                isPassword
                                className="mb-5"
                                setFieldValue={setFieldValue}
                                errorText={errors.repeatPassword as string}
                                id='repeatPassword'
                                name='repeatPassword'
                                isTouched={touched.repeatPassword}
                                label={"تکرار کلمه عبور جدید"}
                                validateFunction={(value: string) => validatePassword(value, values.newPassword)}
                                value={values.repeatPassword!}
                            />


                            <button
                                type="submit"
                                className="h-11 text-sm px-8 rounded-full bg-[#aa3aff] text-white flex justify-center gap-2 items-center w-full mb-5"
                                disabled={submitLoading}
                            >
                                تغییر کلمه عبور
                                {submitLoading ? <Loading className="fill-current w-5 h-5 animate-spin" /> : null}
                            </button>

                        </Form>
                    )
                }}
            </Formik>

            <ModalPortal
                show={status === "success"}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50 flex flex-col justify-end items-center">

                    <div className="bg-[#192A39] text-white rounded-xl px-5 pt-10 pb-12 w-5/6 max-w-md text-center mb-5">

                        <div className="bg-[#011425] w-18 h-18 flex justify-center items-center rounded-full mx-auto mb-6">
                            <Image
                                src="/images/icons/purple-check-polygon.svg"
                                alt="success"
                                className="w-12 h-12 mx-auto"
                                width={48}
                                height={48}
                            />
                        </div>

                        <p className="text-sm mb-10"> رمز عبور شما با موفقیت تغییر یافت. </p>


                        <Link
                            href={`/login?mode=password&phoneNumber=${props.phoneNumber.replace("+98","")}`}
                            className="h-11 text-sm px-8 rounded-full bg-[#aa3aff] text-white flex justify-center gap-2 items-center w-full"
                        >
                            ادامه
                        </Link>

                    </div>

                </div>
            </ModalPortal>

        </>
    )
}

export default SetNewPassword;