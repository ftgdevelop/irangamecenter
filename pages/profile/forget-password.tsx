/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState } from "react";
import SendRecoveryCode from "@/components/authentication/profile/ForgetPassword/SendRecoveryCode";
import VerifyForgetPassword from "@/components/authentication/profile/ForgetPassword/VerifyForgetPassword";
import SetNewPassword from "@/components/authentication/profile/ForgetPassword/SetNewPassword";
import ProfileSideBar from "@/components/authentication/profile/ProfileSideBar";
import { useIsDesktop } from "@/hooks/use-is-desktop";

export default function ForgetPassword() {
  const isDesktop = useIsDesktop();

  const [userId, setUserId] = useState<number>(0);
  const [pin, setPin] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <>
      <h3 className="font-semibold text-lg lg:text-xl text-[#ff7189] text-center my-6 lg:hidden">
        فراموشی کلمه عبور
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 relative max-w-[1000px] mx-auto px-3.5 lg:px-5">
        <div className="max-lg:hidden relative">
          <div className="lg:sticky lg:top-[100px] lg:mb-6">
            {isDesktop && <ProfileSideBar activeItem="change-password" />}
          </div>
        </div>
        <div className="lg:mt-4 lg:col-span-2 lg:sticky lg:top-5">
          <div className="max-lg:hidden font-semibold mt-1 text-sm mb-5 text-[#ff7189]">
            فراموشی کلمه عبور
          </div>
          <div className="lg:py-5 lg:mb-6 lg:border lg:border-neutral-300 dark:lg:border-white/15 lg:p-4 lg:rounded-xl">
            {pin ? (
              <SetNewPassword
                pin={pin}
                userId={userId}
                phoneNumber={phoneNumber}
              />
            ) : userId && phoneNumber ? (
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
          </div>
        </div>
      </div>
    </>
  );
}
