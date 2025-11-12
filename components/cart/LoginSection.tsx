import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoginWithPassword from "../authentication/LoginWithPassword";
import Otp from "../authentication/profile/OTP";

type LoginSectionProps = {
  onLoginSuccess?: () => void;
}

const LoginSection = ({ onLoginSuccess }: LoginSectionProps) => {

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
    <>


      {loginType === 'otp' ? (
        <Otp
          toggleLoginType={() => {
            setLoginType('password')
          }}
          title={<h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> برای ادامه فرآیند خرید،<br /> ورود یا ثبت‌نام در حساب کاربری لازم است.</h3>}
          onLoginSuccess={onLoginSuccess}
          />
      ) : (
        <LoginWithPassword
          initialPhoneNumber={phoneNumber?("+98"+phoneNumber) : undefined}
          toggleLoginType={() => {
            setLoginType('otp')
          }}
         title={<h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> برای ادامه فرآیند خرید،<br /> ورود یا ثبت‌نام در حساب کاربری لازم است.</h3>}
         onLoginSuccess={onLoginSuccess}
        />
      )}
      </>
  )
}

export  default LoginSection;