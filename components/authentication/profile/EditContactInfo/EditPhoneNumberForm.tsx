import { getCurrentUserProfile, updateProfilePhoneNumber } from "@/actions/identity";
import Loading from "@/components/icons/Loading";
import PhoneInput from "@/components/shared/PhoneInput";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setReduxUser } from "@/redux/authenticationSlice";
import { setReduxNotification } from "@/redux/notificationSlice";
import { Form, Formik } from "formik";
import { useState } from "react";

const EditPhoneNumberForm = () => {

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => state.authentication.isAuthenticated,
    );
    const userInfo = useAppSelector((state) => state.authentication.user);

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const submitHandler = async (parameters: {
        mobileNumber?: string;
    }) => {
        const token = localStorage.getItem('Token');
        if (!token || !parameters.mobileNumber) return;

        setSubmitLoading(true);

        dispatch(setReduxNotification({
            status: '',
            message: "",
            isVisible: false
        }));

        const response: any = await updateProfilePhoneNumber(parameters.mobileNumber!, token);

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
                message: "خطا ارسال اطلاعات",
                isVisible: true
            }));
        }
    }

    let initialValues = {
        mobileNumber: ''
    }

    if (isAuthenticated && userInfo) {
        initialValues = {
            mobileNumber: userInfo?.phoneNumber || ''
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
                    <Form className="mx-3 pb-1" autoComplete="off">

                        <PhoneInput
                            showConfirmedBadge
                            showConfirmedText={!!userInfo?.isPhoneNumberConfirmed}
                            initialValue={userInfo?.phoneNumber || ""}
                            label='موبایل'
                            defaultCountry={
                                {
                                    countryCode: "ir",
                                    dialCode: "98",
                                    format: "... ... ...."
                                }
                            }
                            onChange={(v: string) => {
                                setFieldValue('mobileNumber', v)
                            }}
                            value={values.mobileNumber}
                            name='mobileNumber'
                            isTouched={touched.mobileNumber}
                            errorText={errors.mobileNumber}
                            className="mb-5"
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

export default EditPhoneNumberForm;