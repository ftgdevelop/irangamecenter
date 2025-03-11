import Image from 'next/image'
import ArrowRight from '@/components/icons/ArrowRight'
import LoginOtp from '@/components/authentication/LoginOtp'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoginWithPassword from '@/components/authentication/LoginWithPassword'
import { useAppSelector } from '@/hooks/use-store'

export default function Login() {
  const [loginType, setLoginType] = useState<'otp' | 'password'>('otp')

  const router = useRouter()

  const closeLoginHandle = () => {
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
          onClick={closeLoginHandle}
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
        <LoginOtp
          toggleLoginType={() => {
            setLoginType('password')
          }}
          onCloseLogin={closeLoginHandle}
        />
      ) : (
        <LoginWithPassword
          toggleLoginType={() => {
            setLoginType('otp')
          }}
          onCloseLogin={closeLoginHandle}
        />
      )}
    </>
  )
}
