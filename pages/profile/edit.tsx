/* eslint-disable  @typescript-eslint/no-explicit-any */

import ArrowRight from '@/components/icons/ArrowRight'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/hooks/use-store'

import { dateFormat } from '@/helpers'
import Link from 'next/link'

import { Form, Formik } from 'formik'
import FormikField from '@/components/shared/FormikField'
import {  validateRequiedPersianAndEnglish } from '@/helpers/formik-validation'
import Male from '@/components/icons/Male'
import Female from '@/components/icons/Female'
import Image from 'next/image'
import PhoneInput from '@/components/shared/PhoneInput'

export default function ProfileEdit() {
  const router = useRouter()

  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  )
  const userInfo = useAppSelector((state) => state.authentication.user)

  let initialGender: boolean | undefined = undefined
  if (userInfo && userInfo.gender === false) {
    initialGender = false
  }
  if (userInfo?.gender) {
    initialGender = true
  }

  const [gender, setGender] = useState<boolean | undefined>(initialGender)

  const userLoading = useAppSelector(
    (state) => state.authentication.getUserLoading,
  )

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
  }, [isAuthenticated, userLoading])

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
    timezone: '',
    nationalId: '',
    birthDay: '',
    nationalityId: '',
    isNewsLetter: false,
  }

  if (isAuthenticated && userInfo) {
    initialValues = {
      gender: userInfo.gender === false ? false : true,
      firstname: userInfo?.firstName || '',
      lastname: userInfo?.lastName || '',
      timezone: '',
      nationalId: userInfo?.nationalId || '',
      birthDay: userInfo?.birthDay
        ? dateFormat(new Date(userInfo.birthDay))
        : '',
      nationalityId: userInfo?.nationalityId || '',
      isNewsLetter: userInfo?.isNewsletter || false,
    }
  }

  const submitHandler = async (parameters: unknown) => {
    console.log(parameters)

    // const token = localStorage.getItem('Token');
    // if (!token) return;

    // const params = {
    //   ...parameters,
    //   birthDay: new Date(parameters.birthDay)
    // }
    // setSubmitLoading(true);

    // dispatch(setReduxNotification({
    //   status: '',
    //   message: "",
    //   isVisible: false
    // }));

    // const updateResponse: any = await updateCurrentUserProfile(params, token);
    // setSubmitLoading(false);

    // if (updateResponse.data && updateResponse.data.success) {

    //   dispatch(setReduxNotification({
    //     status: 'success',
    //     message: "اطلاعات با موفقیت ارسال شد",
    //     isVisible: true
    //   }));

    // } else {
    //   dispatch(setReduxNotification({
    //     status: 'error',
    //     message: "ارسال اطلاعات ناموفق",
    //     isVisible: true
    //   }));

    // }
  }

  // const subscribeNewsLetter = async (active: boolean) => {

  //   const token = localStorage.getItem('Token');
  //   if (!token) return;

  //   const params = {
  //     isNewsLetter: active
  //   }
  //   setSubscriptionLoading(true);

  //   dispatch(setReduxNotification({
  //     status: '',
  //     message: "",
  //     isVisible: false
  //   }));

  //   const updateResponse: any = await updateNewsletterUserProfile(params, token);
  //   setSubscriptionLoading(false);

  //   if (updateResponse.data && updateResponse.data.success) {

  //     dispatch(setReduxNotification({
  //       status: 'success',
  //       message: "اطلاعات با موفقیت ارسال شد",
  //       isVisible: true
  //     }));

  //   } else {
  //     dispatch(setReduxNotification({
  //       status: 'error',
  //       message: "ارسال اطلاعات ناموفق",
  //       isVisible: true
  //     }));

  //   }
  // }

  // const maximumBirthDate = dateFormat(goBackYears(new Date(), 12));
  // const minimumBirthDate = dateFormat(goBackYears(new Date(), 100));

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
                  {gender === true || gender === false ? (
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
                      setGender(true)
                    }}
                    className={`h-11 gap-2 flex grow justify-center items-center rounded-full ${
                      gender
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
                      setGender(false)
                    }}
                    className={`h-11 gap-2 flex grow justify-center items-center rounded-full ${
                      gender === false
                        ? 'bg-gradient-to-t from-[#03b69d] to-[#99feac] text-[#222222]'
                        : 'bg-[#192a39] text-white'
                    }`}
                  >
                    <Female className="w-5 h-5 fill-current" />
                    زن
                  </button>
                </div>

                <FormikField
                  showConfirmedBadge = {!validateRequiedPersianAndEnglish(
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
                  showConfirmedBadge = {!validateRequiedPersianAndEnglish(
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
                  label='موبایل'
                  onChange={() =>{}}
                  defaultCountry={{
                    countryCode:"ir",
                    dialCode:"98",
                    format:"... ... ...."
                  }}
                />

{/* 
                <FormikField
                  setFieldValue={setFieldValue}
                  errorText={errors.nationalId as string}
                  id="nationalId"
                  name="nationalId"
                  isTouched={touched.nationalId}
                  label="کد ملی"
                  maxLength={10}
                  validateFunction={(value: string) =>
                    validateNationalId({
                      value: value,
                      invalidMessage: 'کد ملی معتبر نیست',
                    })
                  }
                  value={values.nationalId}
                  onChange={(value: string) => {
                    setFieldValue('nationalId', value, true)
                  }}
                /> */}

                <button type="submit" className="h-10 px-8 rounded">
                  ذخیره
                </button>
              </Form>
            )
          }}
        </Formik>
      )}
    </>
  )
}
