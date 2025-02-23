import Image from "next/image";
import ArrowRight from "@/components/icons/ArrowRight";
import LoginOtp from "@/components/authentication/LoginOtp";
import { useState } from "react";
import { useRouter } from "next/router";


export default function login() {

  const [loginType, setLoginType] = useState<"otp" | "password">("otp");

  const router = useRouter();

  const closeLoginHandle = () => {
    router.push("/");  
  }

  return (
    <>
      <header className="relative p-4 mb-1">
        <button
          type="button"
          className="absolute right-7 w-6 h-6 top-1/2 -mt-3"
          onClick={closeLoginHandle}
        >
          <ArrowRight />
        </button>

        <Image src="/logo.svg" alt="irangamecenter" width={50} height={50} className="block mx-auto" />
      </header>

      {loginType === "otp" ? (
        <LoginOtp 
          toggleLoginType={() =>{setLoginType("password")}}
          onCloseLogin={closeLoginHandle}
        />
      ) : (
        <div>
          login with password
        </div>
      )}

    </>
  );
}
