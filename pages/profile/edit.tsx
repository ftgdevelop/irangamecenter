import Image from "next/image";
import ArrowRight from "@/components/icons/ArrowRight";
import LoginOtp from "@/components/authentication/LoginOtp";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginWithPassword from "@/components/authentication/LoginWithPassword";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import Skeleton from "@/components/shared/Skeleton";
import { dateFormat, goBackYears, toPersianDigits } from "@/helpers";
import Link from "next/link";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Logout from "@/components/authentication/Logout";
import { Field, Form, Formik } from "formik";
import { setReduxNotification } from "@/redux/notificationSlice";
import { updateCurrentUserProfile, updateNewsletterUserProfile } from "@/actions/identity";
import FormikField from "@/components/shared/FormikField";
import { validateNationalId, validateRequiedPersianAndEnglish } from "@/helpers/formik-validation";


export default function ProfileEdit() {

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const userInfo = useAppSelector(state => state.authentication.user);
  const userLoading = useAppSelector(state => state.authentication.getUserLoading);

  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, userLoading]);

  const [loginType, setLoginType] = useState<"otp" | "password">("otp");

  const closeLoginHandle = () => {
    router.push("/");
  }



  if (!userInfo && !userLoading) {
    return null;
  }

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState<boolean>(false);

  let initialValues = {
    gender: true,
    firstname: "",
    lastname: "",
    timezone: "",
    nationalId: "",
    birthDay: "",
    nationalityId: "",
    isNewsLetter: false
  }

  if (isAuthenticated && userInfo) {
    initialValues = {
      gender: userInfo.gender === false ? false : true,
      firstname: userInfo?.firstName || "",
      lastname: userInfo?.lastName || "",
      timezone: "",
      nationalId: userInfo?.nationalId || "",
      birthDay: userInfo?.birthDay ? dateFormat(new Date(userInfo.birthDay)) : "",
      nationalityId: userInfo?.nationalityId || "",
      isNewsLetter: userInfo?.isNewsletter || false,
    }
  }

  const submitHandler = async (parameters: any) => {

    const token = localStorage.getItem('Token');
    if (!token) return;

    const params = {
      ...parameters,
      birthDay: new Date(parameters.birthDay)
    }
    setSubmitLoading(true);

    dispatch(setReduxNotification({
      status: '',
      message: "",
      isVisible: false
    }));

    const updateResponse: any = await updateCurrentUserProfile(params, token);
    setSubmitLoading(false);

    if (updateResponse.data && updateResponse.data.success) {

      dispatch(setReduxNotification({
        status: 'success',
        message: "اطلاعات با موفقیت ارسال شد",
        isVisible: true
      }));

    } else {
      dispatch(setReduxNotification({
        status: 'error',
        message: "ارسال اطلاعات ناموفق",
        isVisible: true
      }));

    }
  }

  const subscribeNewsLetter = async (active: boolean) => {

    const token = localStorage.getItem('Token');
    if (!token) return;

    const params = {
      isNewsLetter: active
    }
    setSubscriptionLoading(true);

    dispatch(setReduxNotification({
      status: '',
      message: "",
      isVisible: false
    }));

    const updateResponse: any = await updateNewsletterUserProfile(params, token);
    setSubscriptionLoading(false);

    if (updateResponse.data && updateResponse.data.success) {

      dispatch(setReduxNotification({
        status: 'success',
        message: "اطلاعات با موفقیت ارسال شد",
        isVisible: true
      }));

    } else {
      dispatch(setReduxNotification({
        status: 'error',
        message: "ارسال اطلاعات ناموفق",
        isVisible: true
      }));

    }
  }

  const maximumBirthDate = dateFormat(goBackYears(new Date(), 12));
  const minimumBirthDate = dateFormat(goBackYears(new Date(), 100));


  return (
    <>
      <header className="flex gap-5 p-4 mb-1">
        <Link
          href="/profile"
          className="w-6 h-6"
          onClick={closeLoginHandle}
        >
          <ArrowRight />
        </Link>
        اطلاعات کاربری
      </header>


      {!!isAuthenticated && <Formik
        validate={() => { return {} }}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
          if (isSubmitting && !isValid) {
            setTimeout(() => {
              const formFirstError = document.querySelector(".has-validation-error");
              if (formFirstError) {
                formFirstError.scrollIntoView({ behavior: "smooth" });
              }
            }, 100)
          }
          return (
            <Form autoComplete='off' >

              <div role="group" className="mb-4" >
                <label className='block text-xs mb-1' > جنسیت </label>
                <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
                  <Field
                    type="radio"
                    className="text-xs"
                    onChange={(e: any) => {
                      const val = e.target.checked;
                      setFieldValue('gender', val);
                    }}
                    checked={values.gender}
                  />
                  مرد
                </label>
                <label className='inline-flex items-center gap-1'>
                  <Field
                    type="radio"
                    className="text-xs"
                    onChange={(e: any) => {
                      const val = !e.target.checked;
                      setFieldValue('gender', val);
                    }}
                    checked={!values.gender}
                  />
                  زن
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">

                <FormikField
                  labelIsSimple
                  showRequiredStar
                  setFieldValue={setFieldValue}
                  errorText={errors.firstname as string}
                  id='firstname'
                  name='firstname'
                  isTouched={touched.firstname}
                  label="نام"
                  validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, "لطفا نام خود را وارد کنید!", "فقط حروف فارسی و انگلیسی مجاز است!")}
                  onChange={(value: string) => { setFieldValue('firstname', value, true) }}
                  value={values.firstname}
                />

                <FormikField
                  labelIsSimple
                  showRequiredStar
                  setFieldValue={setFieldValue}
                  errorText={errors.lastname as string}
                  id='lastname'
                  name='lastname'
                  isTouched={touched.lastname}
                  label="نام خانوادگی"
                  validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, "لطفا نام خود را وارد کنید!", "فقط حروف فارسی و انگلیسی مجاز است!")}
                  onChange={(value: string) => { setFieldValue('lastname', value, true) }}
                  value={values.lastname}
                />

                <FormikField
                  labelIsSimple
                  setFieldValue={setFieldValue}
                  errorText={errors.nationalId as string}
                  id='nationalId'
                  name='nationalId'
                  isTouched={touched.nationalId}
                  label="کد ملی"
                  maxLength={10}
                  validateFunction={(value: string) => validateNationalId({ value: value, invalidMessage: "کد ملی معتبر نیست" })}
                  value={values.nationalId}
                  onChange={(value: string) => { setFieldValue('nationalId', value, true) }}
                />
              </div>

              <button
                type="submit"
                className="h-10 px-8 rounded"
              >
                ذخیره
              </button>

            </Form>
          )
        }}
      </Formik>}


      <hr className="my-5" />

      <h5 className='text-base mb-5'>
        اطلاعات تماس
      </h5>

    </>
  );
}
