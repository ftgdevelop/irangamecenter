/* eslint-disable  @typescript-eslint/no-explicit-any */

import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Loading from "@/components/icons/Loading";
import PhoneInput from "@/components/shared/PhoneInput"
import { Form, Formik } from "formik"
import Link from "next/link";

type Props = {
    loading: boolean;
    toggleLoginType: () => void;
    submitHandler : (phoneNumber: string) => void
}

const OtpSendCode: React.FC<Props> = props => {

    return (
        <>
            <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> ورود یا ثبت نام</h3>

            <Formik
                validate={() => { return {} }}
                initialValues={{ phoneNumber: "" }}
                onSubmit={values => {
                    props.submitHandler(values.phoneNumber)
                }}
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

                                {props.loading ? (
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
                                ورود با کلمه عبور
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

export  default OtpSendCode;