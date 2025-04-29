/* eslint-disable  @typescript-eslint/no-explicit-any */

import { forgetPassword } from "@/actions/identity";
import Loading from "@/components/icons/Loading";
import PhoneInput from "@/components/shared/PhoneInput";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { Form, Formik } from "formik"
import { useState } from "react";

type Props = {
    onSetUserId: (id: number) => void;
    onSetPhonNumber: (phone: string) => void;
}
const SendRecoveryCode: React.FC<Props> = props => {
    const dispatch = useAppDispatch();

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const submitHandler = async (parameters: {
        phoneNumber: string;
    }) => {

        setSubmitLoading(true);

        dispatch(setReduxNotification({
            status: '',
            message: "",
            isVisible: false
        }));

        const response: any = await forgetPassword(parameters.phoneNumber);

        setSubmitLoading(false);
        if (response.data?.result?.userId) {

            props.onSetPhonNumber(parameters.phoneNumber);
            props.onSetUserId(response.data.result.userId);

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

    return (
        <Formik
            validate={() => { return {} }}
            initialValues={{ phoneNumber: "" }}
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
                    <Form className="p-5" autoComplete="off">


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

                        <button
                            type="submit"
                            className="h-14 text-sm px-8 rounded-full bg-[#aa3aff] text-white flex justify-center gap-2 items-center w-full mb-5"
                            disabled={submitLoading}
                        >
                            ارسال کد بازیابی
                            {submitLoading ? <Loading className="fill-current w-5 h-5 animate-spin" /> : null}
                        </button>

                    </Form>
                )
            }}
        </Formik>
    )
}

export default SendRecoveryCode;