/* eslint-disable  @typescript-eslint/no-explicit-any */

import ArrowRight from '@/components/icons/ArrowRight';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SendRecoveryCode from '@/components/authentication/profile/ForgetPassword/SendRecoveryCode';
import VerifyForgetPassword from '@/components/authentication/profile/ForgetPassword/VerifyForgetPassword';
import SetNewPassword from '@/components/authentication/profile/ForgetPassword/SetNewPassword';

export default function ForgetPassword() {

    const [userId, setUserId] = useState<number>(0);
    const [pin, setPin] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    return (
        <>

            <header className="relative p-4 mb-1">
                <Link
                    href="/"
                    className="absolute right-7 w-6 h-6 top-1/2 -mt-3"
                >
                    <ArrowRight />
                </Link>

                <Image
                    src="/logo.svg"
                    alt="irangamecenter"
                    width={50}
                    height={50}
                    className="block mx-auto"
                />
            </header>

            <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center mb-10"> فراموشی  کلمه عبور</h3>

            {pin ? (
                <SetNewPassword
                    pin={pin}
                    userId={userId}
                    phoneNumber={phoneNumber}
                />
            ) : (userId && phoneNumber) ? (
                <VerifyForgetPassword
                    userId={userId}
                    phoneNumber={phoneNumber}
                    editMobileNumber={() => {
                        setUserId(0);
                        setPhoneNumber("");
                    }}
                    setPin={setPin}
                />
            ) : (
                <SendRecoveryCode
                    onSetUserId={setUserId}
                    onSetPhonNumber={setPhoneNumber}
                />
            )}

        </>
    )
}
