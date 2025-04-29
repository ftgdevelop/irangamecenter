/* eslint-disable  @typescript-eslint/no-explicit-any */

import ArrowRight from '@/components/icons/ArrowRight';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';

import Link from 'next/link';

import { Form, Formik } from 'formik';
import FormikField from '@/components/shared/FormikField';

import { setReduxNotification } from '@/redux/notificationSlice';
import { changePassword } from '@/actions/identity';
import Loading from '@/components/icons/Loading';
import InfoCircle from '@/components/icons/InfoCircle';
import { setReduxError } from '@/redux/errorSlice';

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  );

  const userLoading = useAppSelector(
    (state) => state.authentication.getUserLoading,
  );

  useEffect(() => {
    let redirectTimout: undefined | NodeJS.Timeout

    if (!isAuthenticated && !userLoading) {
      redirectTimout = setTimeout(() => {
        router.push('/login')
      }, 1000)
    }

    return () => {
      clearTimeout(redirectTimout)
    }
  }, [isAuthenticated, userLoading, router]);


  if (!isAuthenticated && !userLoading) {
    return null
  }

  const initialValues = {
    currentPassword:"",
    newPassword: "",
    repeatPassword: ""
  }

  const submitHandler = async (parameters: {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
  }) => {

    const token = localStorage.getItem('Token');
    if (!token) return;

    setSubmitLoading(true);

    dispatch(setReduxNotification({
      status: '',
      message: "",
      isVisible: false
    }));

    const response: any = await changePassword({
      currentPassword: parameters.currentPassword,
      newPassword: parameters.newPassword,
      token: token
    })

    setSubmitLoading(false);

    if (response.data && response.data.success) {

      dispatch(setReduxNotification({
        status: 'success',
        message: "تغییر کلمه عبور با موفقیت ثبت شد",
        isVisible: true
      }));
      router.push("/profile");

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
      <header className="flex items-center gap-5 p-4 mb-5 text-xs">
        <Link href="/profile" className="w-6 h-6">
          <ArrowRight />
        </Link>
        مدیریت کلمه عبور
      </header>

      {!!isAuthenticated && (
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
                  isPassword
                  className="mb-5"
                  setFieldValue={setFieldValue}
                  errorText={errors.currentPassword as string}
                  id='currentPassword'
                  name='currentPassword'
                  isTouched={touched.currentPassword}
                  label={"کلمه عبور فعلی"}
                  validateFunction={(value: string) => validatePassword(value)}
                  value={values.currentPassword!}
                />

                

                <FormikField
                  isPassword
                  className="mb-5"
                  setFieldValue={setFieldValue}
                  errorText={errors.newPassword as string}
                  id='newPassword'
                  name='newPassword'
                  isTouched={touched.newPassword}
                  label={"کلمه عبور جدید"}
                  labelDescription= {<div className='pr-5 text-2xs mb-2 mt-1'> <InfoCircle className='ml-1 w-4 h-4 fill-current inline-block' />  رمز عبور باید حداقل شامل 6 حرف باشد </div>}
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
      )}
    </>
  )
}
