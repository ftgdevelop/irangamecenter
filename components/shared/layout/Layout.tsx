import { PropsWithChildren, useEffect } from "react";
import Header from "./header/Index";
import Footer from "./footer/Index";
import { useRouter } from "next/router";
import Error from "../Error";
import Notification from "../Notification";
import { setReduxUser } from "@/redux/authenticationSlice";
import { getCurrentUserProfile } from "@/actions/identity";
import { useAppDispatch } from "@/hooks/use-store";

type Props = {
    className?: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    let showHeader = true;
    let showFooter = true;

    if (router.pathname === "/login") {
        showFooter = false;
        showHeader = false;
    }

    useEffect(() => {
        const token = localStorage?.getItem('Token');
        if (token) {
            const getUserData = async () => {
                dispatch(setReduxUser({
                    isAuthenticated: false,
                    user: {},
                    getUserLoading: true
                }));

                const response: any = await getCurrentUserProfile(token);

                if (response && response.status === 200) {
                    dispatch(setReduxUser({
                        isAuthenticated: true,
                        user: response.data?.result,
                        getUserLoading: false
                    }));
                } else {
                    dispatch(setReduxUser({
                        isAuthenticated: false,
                        user: {},
                        getUserLoading: false
                    }));
                }

            }

            getUserData();
        }
    }, []);

    return (
        <>
            <Error />
            <Notification />
            <div className="bg-[#011425] text-white max-w-lg mx-auto">
                {showHeader && <Header />}
                <main className="min-h-screen">
                    {props.children}
                </main>
                {showFooter && <Footer />}
            </div>
        </>


    )
}
export default Layout;