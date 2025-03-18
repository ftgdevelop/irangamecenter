/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PropsWithChildren, useEffect } from "react";
import Header from "./header/Index";
import Footer from "./footer/Index";
import { useRouter } from "next/router";
import Error from "../Error";
import Notification from "../Notification";
import { setReduxBalance, setReduxUser } from "@/redux/authenticationSlice";
import { getCurrentUserProfile } from "@/actions/identity";
import { useAppDispatch } from "@/hooks/use-store";
import FooterNavigation from "./footer/FooterNavigation";
import { getUserBalance } from "@/actions/payment";

type Props = {
    className?: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    let showHeader = true;
    let showFooter = true;
    let showFixedNav = true;

    if (router.pathname === "/login" || router.pathname ==="/profile/wallet/charge" || router.pathname === "/profile/edit" || router.pathname === "/profile/change-password" || router.pathname === "/profile/wallet" ){
        showFooter = false;
        showHeader = false;
        showFixedNav = false;
    }

    if (router.pathname === "/profile"){
        showHeader = false;
        showFooter = false;
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

            const fetchBalance = async () => {
                dispatch(setReduxBalance({ balance: undefined, loading: true }));
                const response: any = await getUserBalance(token);
                if (response.data?.result?.amount !== null) {
                    dispatch(setReduxBalance({ balance: response?.data?.result?.amount, loading: false }))
                } else {
                    dispatch(setReduxBalance({ balance: undefined, loading: false }));
                } 
            }
            fetchBalance();
        }
    }, []);



    useEffect(() => {
    }, []);






    return (
        <>
            <Error />
            <Notification />
            <div className="bg-[#011425] text-white max-w-lg mx-auto">
                {showHeader && <Header />}
                <main className={showFixedNav ? "min-h-screen-nav" : "min-h-screen"}>
                    {props.children}
                </main>
                {showFooter && <Footer />}
                {showFixedNav && <FooterNavigation />}
            </div>
        </>


    )
}
export default Layout;