import Image from 'next/image'
import ArrowRight from '@/components/icons/ArrowRight'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoginWithPassword from '@/components/authentication/LoginWithPassword'
import { useAppSelector } from '@/hooks/use-store'
import Otp from '@/components/authentication/profile/OTP'

export default function Login() {
  const [loginType, setLoginType] = useState<'otp' | 'password'>('otp')

  const router = useRouter()

  const backToHome = () => {
    router.push('/')
  }

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
        <button
          type="button"
          className="absolute right-7 w-6 h-6 top-1/2 -mt-3"
          onClick={backToHome}
        >
          <ArrowRight />
        </button>

        <Image
          src="/logo.svg"
          alt="irangamecenter"
          width={50}
          height={50}
          className="block mx-auto"
        />
      </header>

      {loginType === 'otp' ? (
        <Otp
          toggleLoginType={() => {
            setLoginType('password')
          }}
        />
      ) : (
        <LoginWithPassword
          toggleLoginType={() => {
            setLoginType('otp')
          }}
        />
      )}
    </>
  )
}
