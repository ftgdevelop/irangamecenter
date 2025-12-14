/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getCurrentUserProfile, updateCurrentUserProfile } from "@/actions/identity";
import Female from "@/components/icons/Female";
import Loading from "@/components/icons/Loading";
import Male from "@/components/icons/Male";
import FormikField from "@/components/shared/FormikField";
import { validateRequiedPersianAndEnglish } from "@/helpers/formik-validation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { Form, Formik } from "formik"
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EdiPersonalInfo = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => state.authentication.isAuthenticated,
    );
    const userInfo = useAppSelector((state) => state.authentication.user);

    const userInfoGender = userInfo?.gender;


    useEffect(() => {
        setGender(userInfoGender);
    }, [userInfoGender]);

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const [gender, setGender] = useState<boolean | undefined>(undefined);


    const submitHandler = async (parameters: {
        gender: boolean;
        firstname?: string;
        lastname?: string;
        mobileNumber?: string;
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

            router.push("/profile");

        } else {
            dispatch(setReduxNotification({
                status: 'error',
                message: "ارسال اطلاعات ناموفق",
                isVisible: true
            }));

        }
    }

    let initialValues = {
        gender: true,
        firstname: '',
        lastname: ''
    }

    if (isAuthenticated && userInfo) {
        initialValues = {
            gender: userInfo.gender === false ? false : true,
            firstname: userInfo?.firstName || '',
            lastname: userInfo?.lastName || ''
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
                        <label className="flex gap-2 items-center text-sm mb-3 px-5">
                            جنسیت
                            {(gender === true || gender === false) ? (
                                <Image
                                    src="/images/icons/greenCircleCheck.svg"
                                    alt="check icon"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 inline-block margin-right"
                                />
                            ) : null}
                        </label>

                        <div className="flex gap-2 mb-6 text-sm">
                            <button
                                type="button"
                                onClick={() => {
                                    setGender(true);
                                    setFieldValue("gender", true);
                                }}
                                className={`h-11 gap-2 flex grow justify-center items-center rounded-full ${gender
                                    ? 'bg-gradient-green text-[#222222]'
                                    : 'bg-neutral-300 dark:bg-[#192a39] dark:text-white'
                                    }`}
                            >
                                <Male className="w-5 h-5 fill-current" />
                                مرد
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setGender(false);
                                    setFieldValue("gender", false);
                                }}
                                className={`h-11 gap-2 flex grow justify-center items-center rounded-full ${gender === false
                                    ? 'bg-gradient-green text-[#222222]'
                                    : 'bg-neutral-300 dark:bg-[#192a39] dark:text-white'
                                    }`}
                            >
                                <Female className="w-5 h-5 fill-current" />
                                زن
                            </button>
                        </div>

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
    )
}

export default EdiPersonalInfo