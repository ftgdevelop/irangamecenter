import Image from 'next/image'
import ArrowRight from '@/components/icons/ArrowRight'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoginWithPassword from '@/components/authentication/LoginWithPassword'
import { useAppSelector } from '@/hooks/use-store'
import Otp from '@/components/authentication/profile/OTP'
import { useSearchParams } from "next/navigation";
import Link from 'next/link'

export default function Login() {

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
      <header className="relative p-4 mb-1">
        <Link
          href={"/"}
          className='block absolute right-7 top-1/2 -mt-3 w-6 h-6'
        >
          <button
            type="button"
            className="w-6 h-6"
          >
            <ArrowRight />
          </button>
        </Link>
        <Link
          href={"/"}
          className='block mx-auto w-12 h-12'
        >
          <Image
            src="/logo.svg"
            alt="irangamecenter"
            width={48}
            height={48}
            className="block w-12 h-12"
          />
        </Link>
      </header>

      {loginType === 'otp' ? (
        <Otp
          toggleLoginType={() => {
            setLoginType('password')
          }}
        />
      ) : (
        <LoginWithPassword
          initialPhoneNumber={phoneNumber?("+98"+phoneNumber) : undefined}
          toggleLoginType={() => {
            setLoginType('otp')
          }}
        />
      )}
    </>
  )
}
