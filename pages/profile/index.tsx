import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/use-store";
import LoadingFull from "@/components/shared/LoadingFull";
import ProfileSideBar from "@/components/authentication/profile/ProfileSideBar";

export default function Profile() {

  const router = useRouter();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const userInfo = useAppSelector(state => state.authentication.user);
  const userLoading = useAppSelector(state => state.authentication.getUserLoading);

  useEffect(() => {
    let redirectTimout: undefined | NodeJS.Timeout;
    if (!isAuthenticated && !userLoading) {
      redirectTimout = setTimeout(() => {
        router.push("/login");
      }, 500);
    }

    return (() => {
      clearTimeout(redirectTimout);
    })

  }, [isAuthenticated, userLoading, router]);

  if (!userInfo && !userLoading) {
    return null;
  }

  if (userLoading && !isAuthenticated) {
    return (
      <LoadingFull />
    )
  }

  return (    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 relative max-w-[1000px] mx-auto px-3.5 lg:px-5">
      <div>
        <ProfileSideBar />
      </div>
      <div className="max-lg:hidden lg:p-4 lg:col-span-2">
        <div>
          
        </div>
      </div>
    </div>
  );
}
