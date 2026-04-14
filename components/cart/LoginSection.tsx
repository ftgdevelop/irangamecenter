import { useSearchParams } from "next/navigation";
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



  return (
    <div className="p-4 pt-10 max-w-[1000px] mx-auto lg:rounded-2xl lg:bg-gradient-to-t lg:from-[#eaeaea] lg:dark:from-[#182a38] lg:to-transparent lg:mb-10">
      <div className="lg:max-w-[500px] lg:mx-auto">
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
      </div>
    </div>
  )
}

export  default LoginSection;