/* eslint-disable  @typescript-eslint/no-explicit-any */

import ArrowRight from '@/components/icons/ArrowRight';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';

import Link from 'next/link';

import { Form, Formik } from 'formik';
import FormikField from '@/components/shared/FormikField';
import { validateEmail, validateRequiedPersianAndEnglish } from '@/helpers/formik-validation';
import Male from '@/components/icons/Male';
import Female from '@/components/icons/Female';
import Image from 'next/image';
import PhoneInput from '@/components/shared/PhoneInput';
import { setReduxNotification } from '@/redux/notificationSlice';
import { updateCurrentUserProfile, updateProfileEmail } from '@/actions/identity';
import Loading from '@/components/icons/Loading';

export default function ProfileEdit() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  );
  const userInfo = useAppSelector((state) => state.authentication.user);

  const userInfoGender = userInfo?.gender;
  const [gender, setGender] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setGender(userInfoGender);
  }, [userInfoGender]);

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
  }, [isAuthenticated, userLoading]);

  const closeLoginHandle = () => {
    router.push('/')
  }

  if (!userInfo && !userLoading) {
    return null
  }

  let initialValues = {
    gender: true,
    firstname: '',
    lastname: '',
    mobileNumber: '',
    emailAddress: ''
  }

  if (isAuthenticated && userInfo) {
    initialValues = {
      gender: userInfo.gender === false ? false : true,
      firstname: userInfo?.firstName || '',
      lastname: userInfo?.lastName || '',
      mobileNumber: userInfo?.phoneNumber || '',
      emailAddress: userInfo?.emailAddress || ''
    }
  }

  const submitHandler = async (parameters: {
    gender: boolean;
    firstname?: string;
    lastname?: string;
    mobileNumber?: string;
    emailAddress?: string;
  }) => {

    const token = localStorage.getItem('Token');
    if (!token) return;

    setSubmitLoading(true);

    dispatch(setReduxNotification({
      status: '',
      message: "",
      isVisible: false
    }));

    const [updateResponse, updateEmailResponse] = await Promise.all<any>([
      updateCurrentUserProfile(parameters, token),
      updateProfileEmail(parameters.emailAddress || "", token)
    ]);

    console.log("updateEmailResponse", updateEmailResponse);

    setSubmitLoading(false);

    if (updateResponse.data && updateResponse.data.success) {

      dispatch(setReduxNotification({
        status: 'success',
        message: "اطلاعات با موفقیت ارسال شد",
        isVisible: true
      }));
      router.push("/profile");

    } else {
      dispatch(setReduxNotification({
        status: 'error',
        message: "ارسال اطلاعات ناموفق",
        isVisible: true
      }));

    }
  }

  return (
    <>
      <header className="flex gap-5 p-4 mb-1">
        <Link href="/profile" className="w-6 h-6" onClick={closeLoginHandle}>
          <ArrowRight />
        </Link>
        اطلاعات کاربری
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

                <div className="flex gap-2 mb-5 text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setGender(true);
                      setFieldValue("gender", true);
                    }}
                    className={`h-11 gap-2 flex grow justify-center items-center rounded-full ${gender
                      ? 'bg-gradient-to-t from-[#03b69d] to-[#99feac] text-[#222222]'
                      : 'bg-[#192a39] text-white'
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
                      ? 'bg-gradient-to-t from-[#03b69d] to-[#99feac] text-[#222222]'
                      : 'bg-[#192a39] text-white'
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
                  className='mb-5'
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
                  className='mb-5'
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

                <FormikField
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
      )}
    </>
  )
}
