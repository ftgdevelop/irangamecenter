/* eslint-disable  @typescript-eslint/no-explicit-any */

import { registerOTP } from '@/actions/identity';
import InfoCircle from '@/components/icons/InfoCircle';
import Loading from '@/components/icons/Loading';
import FormikField from '@/components/shared/FormikField';
import { useAppDispatch } from '@/hooks/use-store';
import { setReduxNotification } from '@/redux/notificationSlice';
import { Form, Formik } from 'formik';
import { useState } from 'react';

type Props = {
  code: string;
  phoneNumber: string;
  onSuccessLogin: (response: any) => void;
  onLoginSuccess?: () => void;
};

const OtpRegister: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const initialValues = {
    newPassword: '',
    repeatPassword: '',
  };

  const submitHandler = async (parameters: {
    newPassword: string;
    repeatPassword: string;
  }) => {
    setSubmitLoading(true);

    dispatch(
      setReduxNotification({
        status: '',
        message: '',
        isVisible: false,
      })
    );

    const response: any = await registerOTP({
      code: props.code,
      emailOrPhoneNumber: props.phoneNumber,
      password: parameters.newPassword,
    });

    setSubmitLoading(false);

    if (response.data && response.data.success) {
      props.onSuccessLogin(response);
      if (props.onLoginSuccess) {
        props.onLoginSuccess();
      }
    } else {
      dispatch(
        setReduxNotification({
          status: 'error',
          message: 'ارسال اطلاعات ناموفق',
          isVisible: true,
        })
      );
    }
  };

  const validatePassword = (value: string, equalTo?: string) => {
    let error;
    if (!value) {
      error = 'کلمه عبور را وارد نمایید';
    } else if (value.length < 6) {
      error = 'کلمه عبور باید حداقل 6 حرف باشد';
    } else if (equalTo && value !== equalTo) {
      error = 'تکرار کلمه عبور با کلمه عبور مطابقت ندارد';
    }

    return error;
  };

  return (
    <div>
      <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-2">
        کلمه عبور انتخاب کنید
      </h3>
      <p className="text-xs mb-10 px-5 text-center max-w-96 mx-auto">
        برای حساب کاربری خود کلمه عبور انتخاب کنید، تا مجددا نیازی به کد موقت
        نداشته باشید.
      </p>

      <Formik
        validate={() => {
          return {};
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
                '.has-validation-error'
              );
              if (formFirstError) {
                formFirstError.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }
          return (
            <Form className="mx-3" autoComplete="off">
              <FormikField
                isPassword
                className="mb-5"
                setFieldValue={setFieldValue}
                errorText={errors.newPassword as string}
                id="newPassword"
                name="newPassword"
                isTouched={touched.newPassword}
                label={'کلمه عبور '}
                labelDescription={
                  <div className="pr-5 text-2xs mb-2 mt-1">
                    <InfoCircle className="ml-1 w-4 h-4 fill-current inline-block" />
                    رمز عبور باید حداقل شامل 6 حرف باشد
                  </div>
                }
                validateFunction={(value: string) => validatePassword(value)}
                value={values.newPassword!}
              />

              <FormikField
                isPassword
                className="mb-5"
                setFieldValue={setFieldValue}
                errorText={errors.repeatPassword as string}
                id="repeatPassword"
                name="repeatPassword"
                isTouched={touched.repeatPassword}
                label={'تکرار کلمه عبور '}
                validateFunction={(value: string) =>
                  validatePassword(value, values.newPassword)
                }
                value={values.repeatPassword!}
              />

              <button
                type="submit"
                className="h-11 text-sm px-8 rounded-full bg-[#aa3aff] text-white flex justify-center gap-2 items-center w-full mb-5"
                disabled={submitLoading}
              >
                ثبت کلمه عبور
                {submitLoading ? (
                  <Loading className="fill-current w-5 h-5 animate-spin" />
                ) : null}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default OtpRegister;
