import ArrowRight from '@/components/icons/ArrowRight';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/use-store';

import Link from 'next/link';
import EdiPersonalInfo from '@/components/authentication/profile/EdiPersonalInfo';
import Tab from '@/components/shared/Tab';
import EditContactInfo from '@/components/authentication/profile/EditContactInfo';

export default function ProfileEdit() {
  const router = useRouter();

  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  );
  const userInfo = useAppSelector((state) => state.authentication.user);

  const userLoading = useAppSelector(
    (state) => state.authentication.getUserLoading,
  );

  useEffect(() => {
    let redirectTimout: undefined | NodeJS.Timeout

    if (!isAuthenticated && !userLoading) {
      redirectTimout = setTimeout(() => {
        router.push('/login')
      }, 1000)
    }

    return () => {
      clearTimeout(redirectTimout)
    }
  }, [isAuthenticated, userLoading, router]);

  if (!userInfo && !userLoading) {
    return null
  }

  return (
    <>
      <header className="flex items-center gap-5 p-4 mb-1 text-xs">
        <Link href="/profile" className="w-6 h-6">
          <ArrowRight />
        </Link>
        اطلاعات کاربری
      </header>

      {!!isAuthenticated && (
        <div>
          <Tab
            items={[
              { key: 1, children: <EdiPersonalInfo />, label: "اطلاعات شخصی" },
              { key: 2, children: <EditContactInfo />, label: "اطلاعات تماس" }
            ]}
            style="3"
          />
        </div>
      )}
    </>
  )
}
