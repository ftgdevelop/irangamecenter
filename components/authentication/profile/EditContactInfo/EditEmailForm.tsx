/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getCurrentUserProfile, sendEmailActivation, updateProfileEmail } from "@/actions/identity";
import Loading from "@/components/icons/Loading";
import FormikField from "@/components/shared/FormikField";
import ModalPortal from "@/components/shared/layout/ModalPortal";
import { validateEmail } from "@/helpers/formik-validation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { Form, Formik } from "formik"
import Image from "next/image";
import { useState } from "react";

const EditEmailForm = () => {

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => state.authentication.isAuthenticated,
    );
    const userInfo = useAppSelector((state) => state.authentication.user);

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [sendActivationLoading, setSendActivationLoading] = useState<boolean>(false);

    const [requestStatus, setRequestStatus] = useState<undefined | "activation-success" | "activation-error" | "change-success" | "change-error">();

    const submitHandler = async (parameters: {
        emailAddress?: string;
    }) => {

        const token = localStorage.getItem('Token');
        if (!token) return;

        setSubmitLoading(true);

        const response: any = await updateProfileEmail(parameters.emailAddress || "", token);

        setSubmitLoading(false);

        if (response.data.success) {

            setRequestStatus("change-success");

            const response: any = await getCurrentUserProfile(token);

            if (response && response.status === 200) {
                dispatch(setReduxUser({
                    isAuthenticated: true,
                    user: response.data?.result,
                    getUserLoading: false
                }));
            } else {
                dispatch(setReduxUser({
                    isAuthenticated: false,
                    user: {},
                    getUserLoading: false
                }));
            }


        } else {

            setRequestStatus("change-error");

        }
    }

    let initialValues = {
        emailAddress: ''
    }

    if (isAuthenticated && userInfo) {
        initialValues = {
            emailAddress: userInfo?.emailAddress || ''
        }
    }

    const emailActivationLink = async (emailAddress: string) => {

        const token = localStorage.getItem('Token');
        if (!token || sendActivationLoading) return;

        setSendActivationLoading(true);

        const response: any = await sendEmailActivation(emailAddress, token);

        setSendActivationLoading(false);

        if (response.data && response.data.success) {
            setRequestStatus("activation-success");
        } else {
            setRequestStatus("activation-error");
        }
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
                        <Form className="mx-3 pb-1" autoComplete="off">

                            <FormikField
                                labelLeft={values.emailAddress && !userInfo?.isEmailConfirmed ? (
                                    <button
                                        type="button"
                                        className="rtl:mr-3 ltr:ml-3 text-2xs text-[#aa3aff] cursor-pointer font-semibold outline-none"
                                        onClick={() => { emailActivationLink(values.emailAddress) }}
                                    >
                                        ارسال مجدد لینک تایید {sendActivationLoading && <Loading className="w-5 h-5 animate-spin fill-[#aa3aff] inline-block align-middle rtl:mr-1 ltr:ml-1" />}
                                    </button>
                                ) : null}
                                inputWarningIcon={!!(userInfo?.emailAddress && !userInfo.isEmailConfirmed)}
                                showConfirmedBadge={!validateEmail({
                                    value: values.emailAddress,
                                    invalidMessage: "invalidMessage",
                                    reqiredMessage: "reqiredMessage"
                                })}
                                className='mb-5'
                                setFieldValue={setFieldValue}
                                errorText={errors.emailAddress as string}
                                id="emailAddress"
                                name="emailAddress"
                                isTouched={touched.emailAddress}
                                label="ایمیل"
                                validateFunction={(value: string) => validateEmail({ value: value, invalidMessage: "ایمیل وارد شده معتبر نیست" })}
                                onChange={(value: string) => {
                                    setFieldValue('emailAddress', value, true)
                                }}
                                value={values.emailAddress}
                            />

                            <button
                                type="submit"
                                className="h-11 text-sm px-8 rounded-full bg-[#aa3aff] text-white flex justify-center gap-2 items-center w-full mb-5"
                                disabled={submitLoading}
                            >
                                ذخیره تغییرات
                                {submitLoading ? <Loading className="fill-current w-5 h-5 animate-spin" /> : null}
                            </button>

                        </Form>
                    )
                }}
            </Formik>

            <ModalPortal
                show={!!requestStatus}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50 flex flex-col justify-end items-center">

                    <div className="bg-[#192A39] text-white rounded-xl px-5 pt-10 pb-12 w-5/6 max-w-md text-center mb-5">


                        <Image
                            src={requestStatus === "activation-success" || requestStatus === "change-success" ? "/images/icons/send.svg" : "/images/icons/error.svg"}
                            alt="error"
                            className="w-20 h-20 mx-auto mb-6"
                            width={60}
                            height={60}
                        />


                        <div className="mb-6 md:mb-10 leading-7 text-center text-sm">
                            {requestStatus === "activation-success" ? (
                                <>
                                    لینک تأیید ایمیل با موفقیت برای شما ارسال شد.
                                    <br />
                                    لطفاً صندوق ورودی خود را بررسی کنید.
                                </>
                            ) : requestStatus === "change-success" ? (
                                "تغییر آدرس ایمیل شما با موفقیت ثبت شد"
                            ) : (
                                "ارسال اطلاعات با خطا روبرو شد، لطفا دوباره تلاش کنید"
                            )}

                        </div>

                        <button
                            type="button"
                            className="h-14 text-sm px-8 rounded-full bg-[#aa3aff] text-white items-center w-full mb-5"
                            onClick={() => { setRequestStatus(undefined) }}
                        >
                            ادامه
                        </button>

                    </div>

                </div>
            </ModalPortal>

        </>
    )
}

export default EditEmailForm;