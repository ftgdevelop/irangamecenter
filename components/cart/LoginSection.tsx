import { useAppSelector } from "@/hooks/use-store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginWithPassword from "../authentication/LoginWithPassword";
import Otp from "../authentication/profile/OTP";


const LoginSection = () => {

 const searchParams = useSearchParams();
  
  const phoneNumber = searchParams.get('phoneNumber');
  const mode = searchParams.get('mode');
  const [loginType, setLoginType] = useState<'otp' | 'password'>('otp');

  useEffect(()=>{
    if(mode === "password"){
      setLoginType("password");
    }
  },[mode])

  const router = useRouter()


  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  )

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile')
    }
  }, [isAuthenticated, router])

  return (
    <>


      {loginType === 'otp' ? (
        <Otp
          toggleLoginType={() => {
            setLoginType('password')
                  }}
                  title={<h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> برای ادامه فرآیند خرید،<br /> ورود یا ثبت‌نام در حساب کاربری لازم است.</h3>}
              />
      ) : (
        <LoginWithPassword
          initialPhoneNumber={phoneNumber?("+98"+phoneNumber) : undefined}
          toggleLoginType={() => {
            setLoginType('otp')
          }}
                                        title={<h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> برای ادامه فرآیند خرید،<br /> ورود یا ثبت‌نام در حساب کاربری لازم است.</h3>}
        />
      )}
      </>
  )
}

export  default LoginSection;