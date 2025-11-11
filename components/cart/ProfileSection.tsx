/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getCurrentUserProfile, sendEmailActivation, updateCurrentUserProfile } from "@/actions/identity";
import Loading from "@/components/icons/Loading";
import FormikField from "@/components/shared/FormikField";
import { validateEmail, validateRequiedPersianAndEnglish } from "@/helpers/formik-validation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { Form, Formik } from "formik"
import { useRouter } from "next/router";
import {  useState } from "react";
import PhoneInput from "../shared/PhoneInput";
import Image from "next/image";

const ProfileSection = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => state.authentication.isAuthenticated,
    );
    const userInfo = useAppSelector((state) => state.authentication.user);


    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [sendActivationLoading, setSendActivationLoading] = useState<boolean>(false);


    const [requestStatus, setRequestStatus] = useState<undefined | "activation-success" | "activation-error" | "change-success" | "change-error">();

    const submitHandler = async (parameters: {
        firstname?: string;
        lastname?: string;
        emailAddress?: string;
        phoneNumber?: string
    }) => {

        const token = localStorage.getItem('Token');
        if (!token) return;

        setSubmitLoading(true);

        dispatch(setReduxNotification({
            status: '',
            message: "",
            isVisible: false
        }));


        const response: any = await updateCurrentUserProfile(parameters, token);

        setSubmitLoading(false);

        if (response.data && response.data.success) {

            dispatch(setReduxNotification({
                status: 'success',
                message: "اطلاعات با موفقیت ارسال شد",
                isVisible: true
            }));

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
            dispatch(setReduxNotification({
                status: 'error',
                message: "ارسال اطلاعات ناموفق",
                isVisible: true
            }));

        }
    }

    let initialValues = {
        emailAddress:'',
        firstname: '',
        lastname: '',
        phoneNumber:''
    }

    if (isAuthenticated && userInfo) {
        initialValues = {
            firstname: userInfo?.firstName || '',
            lastname: userInfo?.lastName || '',
            emailAddress: userInfo?.emailAddress || '',
            phoneNumber: userInfo?.phoneNumber || ''
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
                    <Form className="mx-3 pb-1 pt-5" autoComplete="off">


                        <FormikField
                            showConfirmedBadge={!validateRequiedPersianAndEnglish(
                                values.firstname,
                                "requiredMessage",
                                "inValidMessage"
                            )}
                            className='mb-6'
                            setFieldValue={setFieldValue}
                            errorText={errors.firstname as string}
                            id="firstname"
                            name="firstname"
                            isTouched={touched.firstname}
                            label="نام"
                            validateFunction={(value: string) =>
                                validateRequiedPersianAndEnglish(
                                    value,
                                    'لطفا نام خود را وارد کنید!',
                                    'فقط حروف فارسی و انگلیسی مجاز است!',
                                )
                            }
                            onChange={(value: string) => {
                                setFieldValue('firstname', value, true)
                            }}
                            value={values.firstname}
                            fieldClassName="h-auto text-xl leading-[29px] py-[22px]"
                            placeholder=" نام را وارد کنید "
                        />

                        <FormikField
                            showConfirmedBadge={!validateRequiedPersianAndEnglish(
                                values.lastname,
                                "requiredMessage",
                                "inValidMessage"
                            )}
                            className='mb-6'
                            setFieldValue={setFieldValue}
                            errorText={errors.lastname as string}
                            id="lastname"
                            name="lastname"
                            isTouched={touched.lastname}
                            label="نام خانوادگی"
                            validateFunction={(value: string) =>
                                validateRequiedPersianAndEnglish(
                                    value,
                                    'لطفا نام خود را وارد کنید!',
                                    'فقط حروف فارسی و انگلیسی مجاز است!',
                                )
                            }
                            onChange={(value: string) => {
                                setFieldValue('lastname', value, true)
                            }}
                            value={values.lastname}
                            fieldClassName="h-auto text-xl leading-[29px] py-[22px]"
                            placeholder="نام خانوادگی  را وارد کنید"
                        />
                        <div className="self-stretch ">
                            <PhoneInput
                                placeholder="شماره موبایل را وارد نمایید"
                                heightClass="h-14 h-auto text-xl leading-[29px] py-[22px]"
                                label={
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex gap-3 items-center">
                                            <span>موبایل</span>
                                            <Image src={'/images/icons/check-gradient-green.svg'} width={28} height={28} alt="verified-mobile"/>
                                        </div>
                                        <p className="bg-gradient-to-b from-[#00B59C] to-[#9CFFAC] bg-clip-text text-transparent">
                                            تایید شده
                                        </p>
                                    </div>
                                }
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
                                disabled
                                className="mb-5 "
                                initialValue={initialValues.phoneNumber}
                            
                            />
    
                        </div>
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
                                showConfirmedText={!!(userInfo?.emailAddress && userInfo.isEmailConfirmed)}
                                className='mb-5'
                                setFieldValue={setFieldValue}
                                errorText={errors.emailAddress as string}
                                id="emailAddress"
                                name="emailAddress"
                                isTouched={touched.emailAddress}
                                label="ایمیل (اختیاری)"
                                validateFunction={(value: string) => validateEmail({ value: value, invalidMessage: "ایمیل وارد شده معتبر نیست" })}
                                onChange={(value: string) => {
                                    setFieldValue('emailAddress', value, true)
                                }}
                            value={values.emailAddress}
                            fieldClassName="h-auto text-xl leading-[29px] py-[22px] mb-5"
                            placeholder="ایمیل را وارد نمایید"

                            />

                        <button
                            type="submit"
                            className="h-auto text-xl leading-[29px] py-[22px] px-8 rounded-full bg-[#aa3aff] text-white flex justify-center gap-2 items-center w-full mb-5"
                            disabled={submitLoading}
                        >
                            ذخیره تغییرات
                            {submitLoading ? <Loading className="fill-current w-5 h-5 animate-spin" /> : null}
                        </button>

                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProfileSection